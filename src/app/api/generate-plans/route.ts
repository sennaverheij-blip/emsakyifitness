import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { callClaude, PROMPTS } from '@/lib/ai'

// Allow up to 60 seconds for AI generation (requires Vercel Pro)
export const maxDuration = 60
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { clientId, week, phase, coachNotes, type } = await req.json()

    if (!clientId) {
      return NextResponse.json({ error: 'clientId is required' }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not set' }, { status: 500 })
    }

    const client = await prisma.user.findUnique({
      where: { id: clientId },
      include: { onboarding: true },
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const profile = client.onboarding?.extractedSummary || client.onboarding?.responsesJson || '{}'
    const w = week || 1
    const p = phase || 1
    const coachContext = coachNotes ? `\n\nCOACH NOTES (important — follow these instructions carefully):\n${coachNotes}` : ''

    const generateType = type || 'both'

    if (generateType === 'workout' || generateType === 'both') {
      const workoutRaw = await callClaude(
        PROMPTS.workoutPlan,
        `Client profile: ${profile}${coachContext}\n\nGenerate workout plan for Week ${w}, Phase ${p}.`
      )

      await prisma.workoutPlan.create({
        data: {
          clientId,
          week: w,
          phase: p,
          planJson: workoutRaw,
          createdBy: 'ai',
          publishedAt: new Date(),
        },
      })
    }

    if (generateType === 'nutrition' || generateType === 'both') {
      const nutritionRaw = await callClaude(
        PROMPTS.nutritionPlan,
        `Client profile: ${profile}\nCountry: ${client.country || 'unknown'}${coachContext}\n\nGenerate 7-day meal plan for Week ${w}.`
      )

      let groceryList = '{}'
      try {
        const parsed = JSON.parse(nutritionRaw)
        if (parsed.grocery_list) groceryList = JSON.stringify(parsed.grocery_list)
      } catch {}

      await prisma.nutritionPlan.create({
        data: {
          clientId,
          week: w,
          planJson: nutritionRaw,
          groceryListJson: groceryList,
          publishedAt: new Date(),
        },
      })
    }

    return NextResponse.json({ success: true, message: `${generateType} plan(s) generated for Week ${w} Phase ${p}` })
  } catch (error: any) {
    console.error('[GENERATE-PLANS ERROR]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { callClaude, PROMPTS } from '@/lib/ai'

export async function POST(req: Request) {
  try {
    const { clientId, week, phase } = await req.json()

    if (!clientId) {
      return NextResponse.json({ error: 'clientId is required' }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not set. Add it to Vercel environment variables.' }, { status: 500 })
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

    // Generate workout plan
    const workoutRaw = await callClaude(
      PROMPTS.workoutPlan,
      `Client profile: ${profile}\n\nGenerate workout plan for Week ${w}, Phase ${p}.`
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

    // Generate nutrition plan
    const nutritionRaw = await callClaude(
      PROMPTS.nutritionPlan,
      `Client profile: ${profile}\nCountry: ${client.country || 'unknown'}\n\nGenerate 7-day meal plan for Week ${w}.`
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

    return NextResponse.json({ success: true, message: `Week ${w} Phase ${p} plans generated` })
  } catch (error: any) {
    console.error('[GENERATE-PLANS ERROR]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

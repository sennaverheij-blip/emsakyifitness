import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { responses } = await req.json()

    const client = await prisma.user.findUnique({
      where: { id: params.id },
      include: { onboarding: true },
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const responsesJson = JSON.stringify(responses)

    if (client.onboarding) {
      await prisma.onboarding.update({
        where: { id: client.onboarding.id },
        data: {
          responsesJson,
          status: 'completed',
          submittedAt: new Date(),
        },
      })
    } else {
      await prisma.onboarding.create({
        data: {
          clientId: client.id,
          responsesJson,
          status: 'completed',
          submittedAt: new Date(),
        },
      })
    }

    // Update client country from onboarding if provided
    if (responses.country) {
      await prisma.user.update({
        where: { id: client.id },
        data: { country: responses.country },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await prisma.user.findUnique({
      where: { id: params.id },
      include: { onboarding: true },
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    // Create or update onboarding record
    if (client.onboarding) {
      await prisma.onboarding.update({
        where: { id: client.onboarding.id },
        data: { status: 'sent' },
      })
    } else {
      await prisma.onboarding.create({
        data: {
          clientId: client.id,
          responsesJson: '{}',
          status: 'sent',
        },
      })
    }

    // In production, send email here via Resend/Postmark/etc.
    // For now, log and return success
    const onboardingUrl = `${process.env.NEXTAUTH_URL || 'https://emsakyifitness.vercel.app'}/client/onboarding?token=${client.id}`

    console.log(`[EMAIL] Onboarding form sent to ${client.email}`)
    console.log(`[EMAIL] Onboarding URL: ${onboardingUrl}`)

    return NextResponse.json({
      success: true,
      message: `Onboarding form sent to ${client.email}`,
      onboardingUrl,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

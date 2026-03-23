import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// GET all clients (with coach info)
export async function GET() {
  try {
    const clients = await prisma.user.findMany({
      where: { role: 'client' },
      include: {
        clientCoach: {
          include: { coach: { select: { id: true, name: true, email: true } } },
        },
        checkIns: { orderBy: { date: 'desc' }, take: 7 },
        onboarding: { select: { status: true, submittedAt: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const formatted = clients.map((c) => {
      const assignment = c.clientCoach[0]
      const recentCheckIns = c.checkIns
      const lastCheckIn = recentCheckIns[0]
      const compliance = recentCheckIns.length > 0
        ? Math.round((recentCheckIns.filter((ci) => ci.trained).length / recentCheckIns.length) * 100)
        : 0
      const avgMood = recentCheckIns.length > 0
        ? +(recentCheckIns.filter((ci) => ci.mood).reduce((a, ci) => a + (ci.mood || 0), 0) / recentCheckIns.filter((ci) => ci.mood).length).toFixed(1)
        : null

      const daysSinceCheckIn = lastCheckIn
        ? Math.floor((Date.now() - new Date(lastCheckIn.date).getTime()) / (1000 * 60 * 60 * 24))
        : null

      let status = 'INACTIVE'
      if (daysSinceCheckIn === null) status = 'NEW'
      else if (daysSinceCheckIn <= 1) status = 'ON TRACK'
      else if (daysSinceCheckIn <= 3) status = 'ON TRACK'
      else if (daysSinceCheckIn <= 7) status = 'NEEDS ATTENTION'

      return {
        id: c.id,
        name: c.name,
        email: c.email,
        country: c.country,
        createdAt: c.createdAt,
        coach: assignment?.coach || null,
        tier: assignment?.tier || 'unassigned',
        compliance,
        avgMood,
        lastCheckIn: lastCheckIn?.date || null,
        daysSinceCheckIn,
        status,
        onboardingStatus: c.onboarding?.status || 'not sent',
      }
    })

    return NextResponse.json(formatted)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST create new client
export async function POST(req: Request) {
  try {
    const { name, email, country, coachId, tier } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } })
    if (existing) {
      return NextResponse.json({ error: 'A user with this email already exists' }, { status: 409 })
    }

    const tempPassword = await bcrypt.hash('welcome123', 10)

    const client = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        hashedPassword: tempPassword,
        role: 'client',
        country: country || null,
      },
    })

    // Assign to coach if provided
    if (coachId) {
      await prisma.coachClient.create({
        data: {
          coachId,
          clientId: client.id,
          tier: tier || 'elite',
        },
      })
    }

    return NextResponse.json({ success: true, client })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

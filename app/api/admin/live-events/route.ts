import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/firebase'

export async function GET() {
  try {
    const snapshot = await db.collection('liveEvents').orderBy('startTime', 'desc').get()
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ events })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      teamA,
      teamB,
      logoA,
      logoB,
      matchLocation,
      category,
      country,
      liveStreamUrl,
      status,
      featured,
      startTime
    } = await request.json()

    const eventData = {
      teamA,
      teamB,
      logoA,
      logoB,
      matchLocation,
      category,
      country,
      liveStreamUrl,
      status: status || 'upcoming',
      featured: featured || false,
      startTime: new Date(startTime),
      createdAt: new Date()
    }

    const docRef = await db.collection('liveEvents').add(eventData)
    return NextResponse.json({ id: docRef.id, ...eventData })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Event ID required' }, { status: 400 })
  }

  try {
    const eventData = await request.json()
    await db.collection('liveEvents').doc(id).update(eventData)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Event ID required' }, { status: 400 })
  }

  try {
    await db.collection('liveEvents').doc(id).delete()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

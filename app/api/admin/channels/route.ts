import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/firebase'

export async function GET() {
  try {
    const snapshot = await db.collection('channels').orderBy('createdAt', 'desc').get()
    const channels = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ channels })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, poster, description, country, category, language, m3u8Url, embedUrl, featured, trending, forcePlayer, active } = await request.json()

    const channelData = {
      name,
      poster,
      description,
      country,
      category      category,
      language,
      m3u8Url,
      embedUrl,
      featured: featured || false,
      trending: trending || false,
      forcePlayer: forcePlayer || '',
      active: active || true,
      createdAt: new Date()
    }

    const docRef = await db.collection('channels').add(channelData)
    return NextResponse.json({ id: docRef.id, ...channelData })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Channel ID required' }, { status: 400 })
  }

  try {
    const channelData = await request.json()
    await db.collection('channels').doc(id).update(channelData)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Channel ID required' }, { status: 400 })
  }

  try {
    await db.collection('channels').doc(id).delete()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

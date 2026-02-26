import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/firebase'

export async function GET() {
  try {
    const settingsRef = db.collection('settings').doc('appSettings')
    const settingsDoc = await settingsRef.get()

    if (!settingsDoc.exists) {
      return NextResponse.json({ error: 'Settings not found' }, { status: 404 })
    }

    return NextResponse.json(settingsDoc.data())
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const settingsData = await request.json()
    const settingsRef = db.collection('settings').doc('appSettings')
    await settingsRef.set(settingsData, { merge: true })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

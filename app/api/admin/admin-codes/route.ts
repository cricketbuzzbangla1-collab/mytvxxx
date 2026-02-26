import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/firebase'

export async function GET() {
  try {
    const snapshot = await db.collection('adminCodes').orderBy('code').get()
    const adminCodes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ adminCodes })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code, role, active } = await request.json()

    const adminCodeData = {
      code,
      role,
      active: active || true
    }

    const docRef = await db.collection('adminCodes').add(adminCodeData)
    return NextResponse.json({ id: docRef.id, ...adminCodeData })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Admin Code ID required' }, { status: 400 })
  }

  try {
    const adminCodeData = await request.json()
    await db.collection('adminCodes').doc(id).update(adminCodeData)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Admin Code ID required' }, { status: 400 })
  }

  try {
    await db.collection('adminCodes').doc(id).delete()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

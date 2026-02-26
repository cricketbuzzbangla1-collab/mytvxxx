import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/firebase'

export async function GET() {
  try {
    const snapshot = await db.collection('countries').orderBy('name').get()
    const countries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ countries })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, code, flag, isDefault } = await request.json()

    const countryData = {
      name,
      code,
      flag,
      isDefault: isDefault || false
    }

    const docRef = await db.collection('countries').add(countryData)
    return NextResponse.json({ id: docRef.id, ...countryData })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Country ID required' }, { status: 400 })
  }

  try {
    const countryData = await request.json()
    await db.collection('countries').doc(id).update(countryData)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Country ID required' }, { status: 400 })
  }

  try {
    await db.collection('countries').doc(id).delete()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

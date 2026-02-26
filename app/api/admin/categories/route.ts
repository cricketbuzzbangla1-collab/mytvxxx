import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/firebase'

export async function GET() {
  try {
    const snapshot = await db.collection('categories').orderBy('order').get()
    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ categories })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, icon, order } = await request.json()

    const categoryData = {
      name,
      icon,
      order: order || 0
    }

    const docRef = await db.collection('categories').add(categoryData)
    return NextResponse.json({ id: docRef.id, ...categoryData })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Category ID required' }, { status: 400 })
  }

  try {
    const categoryData = await request.json()
    await db.collection('categories').doc(id).update(categoryData)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Category ID required' }, { status: 400 })
  }

  try {
    await db.collection('categories').doc(id).delete()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

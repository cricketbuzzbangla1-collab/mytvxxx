import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/firebase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'Code required' }, { status: 400 })
  }

  try {
    const adminCodeRef = db.collection('adminCodes').doc(code)
    const adminCodeDoc = await adminCodeRef.get()

    if (!adminCodeDoc.exists) {
      return NextResponse.json({ error: 'Invalid admin code' }, { status: 404 })
    }

    const adminCode = adminCodeDoc.data()
    if (!adminCode.active) {
      return NextResponse.json({ error: 'Admin code disabled' }, { status: 403 })
    }

    return NextResponse.json({ success: true, role: adminCode.role })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

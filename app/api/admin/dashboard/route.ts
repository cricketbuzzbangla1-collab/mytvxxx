import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/firebase'

export async function GET() {
  try {
    const [
      channelsSnapshot,
      liveEventsSnapshot,
      categoriesSnapshot,
      countriesSnapshot,
      adminCodesSnapshot
    ] = await Promise.all([
      db.collection('channels').get(),
      db.collection('liveEvents').get(),
      db.collection('categories').get(),
      db.collection('countries').get(),
      db.collection('adminCodes').get()
    ])

    const dashboardStats = {
      totalChannels: channelsSnapshot.size,
      totalLiveEvents: liveEventsSnapshot.size,
      totalCategories: categoriesSnapshot.size,
      totalCountries: countriesSnapshot.size,
      totalAdminCodes: adminCodesSnapshot.size,
      activeChannels: channelsSnapshot.docs.filter(doc => doc.data().active).length,
      activeAdminCodes: adminCodesSnapshot.docs.filter(doc => doc.data().active).length
    }

    return NextResponse.json(dashboardStats)
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { senderName, senderEmail, subject, message, track } = body

    if (!senderName || !senderEmail || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 },
      )
    }

    const payload = await getPayloadClient()
    const doc = await payload.create({
      collection: 'contact-messages',
      data: { senderName, senderEmail, subject, message, track },
    })

    return NextResponse.json({ success: true, id: doc.id }, { status: 201 })
  } catch (err) {
    console.error('[contact route]', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

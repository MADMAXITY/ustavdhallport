import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validatedData = contactFormSchema.parse(body)

    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${validatedData.name} (${validatedData.email})</p>
      ${validatedData.subject ? `<p><strong>Subject:</strong> ${validatedData.subject}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
    `

    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'portfoliocontact@resend.dev',
      to: process.env.RESEND_TO_EMAIL || 'utsdhall@gmail.com',
      subject: validatedData.subject || `Portfolio Contact from ${validatedData.name}`,
      html: emailContent,
      replyTo: validatedData.email,
    })

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Email send error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

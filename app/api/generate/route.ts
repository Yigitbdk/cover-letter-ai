import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { extractText } from 'unpdf'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: credits } = await supabase
      .from('credits')
      .select('amount')
      .eq('user_id', user.id)
      .single()

    if (!credits || credits.amount <= 0) {
      return NextResponse.json({ error: 'No credits left' }, { status: 402 })
    }

    const formData = await request.formData()
    const cvFile = formData.get('cv') as File
    const jobDescription = formData.get('jobDescription') as string

    if (!cvFile || !jobDescription) {
      return NextResponse.json({ error: 'Missing CV or job description' }, { status: 400 })
    }

    const cvBuffer = Buffer.from(await cvFile.arrayBuffer())
    const { text: cvText } = await extractText(new Uint8Array(cvBuffer), { mergePages: true })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are a professional career coach and expert cover letter writer. 
Always respond with a valid JSON object only, no markdown, no extra text.`
        },
        {
          role: 'user',
          content: `Write a compelling, personalized cover letter based on this CV and job description.

Requirements:
- Professional but conversational tone
- 3-4 paragraphs
- Highlight relevant skills from the CV that match the job
- Show genuine enthusiasm for the role
- Do NOT use cliché phrases like "I am writing to express my interest"
- Extract the company name and job title from the job description
- End with a strong call to action

Return ONLY this JSON format:
{
  "company_name": "Company name here",
  "job_title": "Job title here",
  "cover_letter": "Full cover letter text here"
}

CV:
${cvText}

Job Description:
${jobDescription}`
        }
      ],
      response_format: { type: 'json_object' },
    })

    const parsed = JSON.parse(completion.choices[0].message.content!)

    const { data: application, error } = await supabase
      .from('applications')
      .insert({
        user_id: user.id,
        job_title: parsed.job_title,
        company_name: parsed.company_name,
        job_description: jobDescription,
        cv_text: cvText,
        cover_letter: parsed.cover_letter,
      })
      .select()
      .single()

    if (error) throw error

    await supabase
      .from('credits')
      .update({ amount: credits.amount - 1 })
      .eq('user_id', user.id)

    return NextResponse.json({ id: application.id })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
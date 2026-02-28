import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { extractText } from 'unpdf'
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Kredi kontrolü
    const { data: credits } = await supabase
      .from('credits')
      .select('amount')
      .eq('user_id', user.id)
      .single()
    if (!credits || credits.amount <= 0) {
      return NextResponse.json({ error: 'No credits left' }, { status: 402 })
    }

    // Form data'yı al
    const formData = await request.formData()
    const cvFile = formData.get('cv') as File
    const jobDescription = formData.get('jobDescription') as string

    if (!cvFile || !jobDescription) {
      return NextResponse.json({ error: 'Missing CV or job description' }, { status: 400 })
    }

    // PDF'i metne çevir
const cvBuffer = Buffer.from(await cvFile.arrayBuffer())
const { text: cvText } = await extractText(new Uint8Array(cvBuffer), { mergePages: true })

    // Gemini ile cover letter üret
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' })

    const prompt = `You are a professional career coach and expert cover letter writer.

Based on the CV and job description below, write a compelling, personalized cover letter.

Requirements:
- Professional but conversational tone
- 3-4 paragraphs
- Highlight relevant skills from the CV that match the job
- Show genuine enthusiasm for the role
- Do NOT use cliché phrases like "I am writing to express my interest"
- Extract the company name and job title from the job description
- End with a strong call to action

Return ONLY a valid JSON object in this exact format:
{
  "company_name": "Company name here",
  "job_title": "Job title here",
  "cover_letter": "Full cover letter text here"
}

CV:
${cvText}

Job Description:
${jobDescription}`

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()

    // JSON parse
    const cleanJson = responseText.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleanJson)

    // Veritabanına kaydet
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

    // Krediyi azalt
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
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CopyButton from '@/components/shared/CopyButton'

export default async function HistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: application } = await supabase
    .from('applications')
    .select('*')
    .eq('id', id)
    .single()

  if (!application) notFound()

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm transition-all duration-200 hover:opacity-70"
            style={{ color: '#9c8880' }}
          >
            ← Back
          </Link>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: '#f97316' }}
            >
              {application.company_name?.[0]?.toUpperCase() ?? '?'}
            </div>
            <div>
              <h1 className="text-xl font-semibold" style={{ color: '#1a1614' }}>
                {application.job_title ?? 'Untitled Position'}
              </h1>
              <p className="text-sm" style={{ color: '#6b5c52' }}>
                {application.company_name ?? 'Unknown Company'} · {new Date(application.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
        <CopyButton text={application.cover_letter} />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Job Description */}
        <div>
          <div className="mb-3">
            <h2 className="text-xs font-medium uppercase tracking-wide" style={{ color: '#9c8880' }}>
              Job Description
            </h2>
          </div>
          <div
            className="rounded-xl p-5 text-sm leading-relaxed overflow-y-auto"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e0d4c8',
              color: '#1a1614',
              height: 'calc(100vh - 280px)',
              minHeight: '400px'
            }}
          >
            <p style={{ whiteSpace: 'pre-wrap' }}>{application.job_description}</p>
          </div>
        </div>

        {/* Cover Letter */}
        <div>
          <div className="mb-3">
            <h2 className="text-xs font-medium uppercase tracking-wide" style={{ color: '#9c8880' }}>
              Cover Letter
            </h2>
          </div>
          <div
            className="rounded-xl p-5 text-sm leading-relaxed overflow-y-auto"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #f97316',
              color: '#1a1614',
              height: 'calc(100vh - 280px)',
              minHeight: '400px'
            }}
          >
            <p style={{ whiteSpace: 'pre-wrap' }}>{application.cover_letter}</p>
          </div>
        </div>

      </div>
    </div>
  )
}
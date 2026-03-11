import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
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
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: '#f97316' }}
          >
            {application.company_name?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div>
            <h1 className="text-2xl font-semibold" style={{ color: '#1a1614' }}>
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

      <div className="grid grid-cols-2 gap-6">
        {/* Job Description */}
        <div>
          <h2 className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: '#9c8880' }}>
            Job Description
          </h2>
          <div
            className="rounded-xl p-5 text-sm leading-relaxed h-96 overflow-y-auto"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e0d4c8', color: '#1a1614' }}
          >
            <p style={{ whiteSpace: 'pre-wrap' }}>{application.job_description}</p>
          </div>
        </div>

        {/* Cover Letter */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-medium uppercase tracking-wide" style={{ color: '#9c8880' }}>
              Cover Letter
            </h2>
            <CopyButton text={application.cover_letter} />
          </div>
          <div
            className="rounded-xl p-5 text-sm leading-relaxed h-96 overflow-y-auto"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e0d4c8', color: '#1a1614' }}
          >
            <p style={{ whiteSpace: 'pre-wrap' }}>{application.cover_letter}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
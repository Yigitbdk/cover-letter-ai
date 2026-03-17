import { createClient } from '@/lib/supabase/server'
import BuyCreditsButton from '@/components/shared/BuyCreditsButton'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: applications } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: credits } = await supabase
    .from('credits')
    .select('amount')
    .single()

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: '#1a1614' }}>
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: '#6b5c52' }}>
            Welcome back, {user?.email}
          </p>
        </div>
        <Link
          href="/generate"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#f97316' }}
        >
          <span>✦</span>
          New Application
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl p-5" style={{ backgroundColor: '#ffffff', border: '1px solid #e0d4c8' }}>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#9c8880' }}>
            Total Applications
          </p>
          <p className="text-3xl font-bold mt-2" style={{ color: '#1a1614' }}>
            {applications?.length ?? 0}
          </p>
        </div>
        <div className="rounded-xl p-5" style={{ backgroundColor: '#ffffff', border: '1px solid #e0d4c8' }}>
  <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#9c8880' }}>
    Credits Left
  </p>
  <p className="text-3xl font-bold mt-2" style={{ color: '#f97316' }}>
    {credits?.amount ?? 0}
  </p>
  <BuyCreditsButton />
</div>
        <div className="rounded-xl p-5" style={{ backgroundColor: '#ffffff', border: '1px solid #e0d4c8' }}>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#9c8880' }}>
            This Month
          </p>
          <p className="text-3xl font-bold mt-2" style={{ color: '#1a1614' }}>
            {applications?.filter(a => {
              const date = new Date(a.created_at)
              const now = new Date()
              return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
            }).length ?? 0}
          </p>
        </div>
      </div>

      {/* Applications List */}
      <div>
        <h2 className="text-sm font-medium uppercase tracking-wide mb-4" style={{ color: '#9c8880' }}>
          Recent Applications
        </h2>

        {applications && applications.length > 0 ? (
          <div className="space-y-3">
            {applications.map((app) => (
              <Link
                key={app.id}
                href={`/history/${app.id}`}
                className="flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:shadow-md group"
                style={{ backgroundColor: '#ffffff', border: '1px solid #e0d4c8' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: '#f97316' }}>
                    {app.company_name?.[0]?.toUpperCase() ?? '?'}
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#1a1614' }}>
                      {app.job_title ?? 'Untitled Position'}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#9c8880' }}>
                      {app.company_name ?? 'Unknown Company'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xs" style={{ color: '#9c8880' }}>
                    {new Date(app.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: '#f97316' }}>
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl p-12 text-center" style={{ backgroundColor: '#ffffff', border: '1px solid #e0d4c8' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#f5f0eb' }}>
              <span className="text-xl">✦</span>
            </div>
            <p className="font-medium" style={{ color: '#1a1614' }}>No applications yet</p>
            <p className="text-sm mt-1 mb-4" style={{ color: '#9c8880' }}>
              Create your first cover letter to get started
            </p>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#f97316' }}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
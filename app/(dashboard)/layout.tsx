import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/shared/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f0eb' }}>
      <Sidebar user={user} />
      <main style={{ marginLeft: '256px', flex: 1, padding: '32px' }}>
        {children}
      </main>
    </div>
  )
}
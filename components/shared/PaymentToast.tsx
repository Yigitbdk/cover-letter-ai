'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function PaymentToast() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')

  useEffect(() => {
    if (success) {
      // Webhook'un gelmesi için 2 saniye bekle sonra refresh et
      const refreshTimer = setTimeout(() => {
        router.refresh()
      }, 2000)

      const redirectTimer = setTimeout(() => {
        router.replace('/dashboard')
      }, 3000)

      return () => {
        clearTimeout(refreshTimer)
        clearTimeout(redirectTimer)
      }
    }

    if (canceled) {
      const timer = setTimeout(() => {
        router.replace('/dashboard')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [success, canceled, router])

  if (!success && !canceled) return null

  return (
    <div
      className="fixed top-6 right-6 z-50 px-5 py-4 rounded-xl text-sm font-medium shadow-lg transition-all duration-300"
      style={{
        backgroundColor: success ? '#1a1614' : '#fee2e2',
        color: success ? '#ffffff' : '#dc2626',
        border: `1px solid ${success ? '#f97316' : '#fecaca'}`,
      }}
    >
      {success ? (
        <div className="flex items-center gap-2">
          <span style={{ color: '#f97316' }}>✓</span>
          Payment successful! 60 credits added to your account.
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span>✕</span>
          Payment canceled. No charges were made.
        </div>
      )}
    </div>
  )
}
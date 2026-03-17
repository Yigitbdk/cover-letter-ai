'use client'

import { useState } from 'react'

export default function BuyCreditsButton() {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      console.error('Checkout failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full mt-3 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50"
      style={{ backgroundColor: '#f97316' }}
    >
      {loading ? 'Loading...' : 'Get Pro → $3/mo'}
    </button>
  )
}
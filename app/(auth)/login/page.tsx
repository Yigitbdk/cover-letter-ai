'use client'

import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const supabase = createClient()

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1a1614' }}>
      
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(249,115,22,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative w-full max-w-lg px-8">

        {/* Back to home */}
        <div className="text-center mb-8">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-sm transition-all duration-200 hover:opacity-70"
            style={{ color: '#9c8880' }}
          >
            Back to home
          </a>
        </div>
        

        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-8">
  
              <span className="font-semibold md:text-7xl text-white"
              style={{
                    WebkitTextStroke: '2px #f97316',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}>Cover Craft</span>

          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Welcome back</h1>
          <p className="text-base" style={{ color: '#9c8880' }}>
            Sign in to generate personalized cover letters
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{ backgroundColor: '#231e1b', border: '1px solid #3d3430' }}
        >
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-base font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#f97316' }}
          >
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#fff"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#fff" fillOpacity=".8"/>
              <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#fff" fillOpacity=".6"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#fff" fillOpacity=".4"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-sm text-center mt-6" style={{ color: '#6b5c52' }}>
            By signing in, you agree to our terms of service and privacy policy.
          </p>
        </div>

        {/* Features */}
        <div className="mt-10 grid grid-cols-3 gap-6 text-center">
          {[
            { icon: '✦', text: '3 free letters' },
            { icon: '⚡', text: 'Instant results' },
            { icon: '✓', text: 'Secure & private' },
          ].map((item) => (
            <div key={item.text}>
              <p className="text-2xl mb-2 font-bold" style={{ color: '#f97316' }}>{item.icon}</p>
              <p className="text-sm" style={{ color: '#6b5c52' }}>{item.text}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
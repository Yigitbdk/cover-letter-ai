'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import * as PricingCard from '@/components/ui/pricing-card'

const GLSLHills = dynamic(() => import('@/components/ui/glsl-hills'), { ssr: false })

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: '#1a1614', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="relative" style={{ height: '100vh' }}>
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <GLSLHills width="100vw" height="100vh" speed={0.3} />
        </div>

        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0" style={{ zIndex: 10 }}>
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: '#f97316' }}
              >
                CL
              </div>
              <span className="font-semibold text-white">Cover Letter AI</span>
            </div>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#f97316' }}
            >
              Sign In
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-start justify-center pt-24 px-4" style={{ zIndex: 5 }}>
          <div className="text-center w-full max-w-3xl">
            <div className="mb-8">
              <div
                className="inline-flex items-center gap-3 px-4 md:px-6 py-3 rounded-2xl text-sm md:text-base font-semibold"
                style={{
                  backgroundColor: 'rgba(249,115,22,0.15)',
                  color: '#f97316',
                  border: '1px solid rgba(249,115,22,0.4)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <span className="text-lg md:text-xl">✦</span>
                <span>AI-Powered Cover Letters</span>
                <span className="text-lg md:text-xl">✦</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold mb-6 leading-tight text-white w-full max-w-3xl mx-auto">
  Land your dream job with a <span style={{ color: '#f97316' }}>personalized cover letter</span>
</h1>
            <p className="text-base md:text-xl mb-10 max-w-xl mx-auto" style={{ color: '#9c8880' }}>
              Upload your CV, paste the job description, and get a professional cover letter tailored specifically for that role in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ backgroundColor: '#f97316' }}
              >
                Get Started Free →
              </Link>
              <span className="text-sm" style={{ color: '#9c8880' }}>
                3 free cover letters included
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <section style={{ backgroundColor: '#231e1b', borderTop: '1px solid #3d3430', borderBottom: '1px solid #3d3430' }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4" style={{ color: '#f5f0eb' }}>
            How it works
          </h2>
          <p className="text-center text-sm mb-12 md:mb-16" style={{ color: '#9c8880' }}>
            Three simple steps to your perfect cover letter
          </p>

          {/* Desktop */}
          <div className="hidden md:flex items-start gap-0">
            <div className="flex-1 text-center px-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: 'rgba(249,115,22,0.15)', border: '2px solid #f97316' }}>
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#f5f0eb' }}>Upload your CV</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9c8880' }}>Upload your CV as a PDF. We'll automatically extract your skills, experience, and education.</p>
            </div>
            <div className="flex items-center justify-center pt-8" style={{ minWidth: '60px' }}>
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                <path d="M0 10 H32 M24 2 L38 10 L24 18" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1 text-center px-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: 'rgba(249,115,22,0.15)', border: '2px solid #f97316' }}>
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#f5f0eb' }}>Paste job description</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9c8880' }}>Copy the job listing you want to apply for and paste it in. Any format works — we handle the rest.</p>
            </div>
            <div className="flex items-center justify-center pt-8" style={{ minWidth: '60px' }}>
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                <path d="M0 10 H32 M24 2 L38 10 L24 18" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1 text-center px-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: 'rgba(249,115,22,0.15)', border: '2px solid #f97316' }}>
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#f5f0eb' }}>Get your cover letter</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9c8880' }}>Our AI generates a personalized, professional cover letter tailored to that specific role in seconds.</p>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden flex-col gap-8">
            {[
              { icon: '📄', title: 'Upload your CV', desc: "Upload your CV as a PDF. We'll automatically extract your skills, experience, and education." },
              { icon: '📋', title: 'Paste job description', desc: 'Copy the job listing you want to apply for and paste it in. Any format works — we handle the rest.' },
              { icon: '✨', title: 'Get your cover letter', desc: 'Our AI generates a personalized, professional cover letter tailored to that specific role in seconds.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(249,115,22,0.15)', border: '2px solid #f97316' }}>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#f5f0eb' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#9c8880' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ backgroundColor: '#2a2320', borderBottom: '1px solid #3d3430' }} className="px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4" style={{ color: '#f5f0eb' }}>
            Simple pricing
          </h2>
          <p className="text-center text-sm mb-12 md:mb-16" style={{ color: '#9c8880' }}>
            Start free, upgrade when you need more
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6">

            <PricingCard.Card>
              <PricingCard.Header>
                <PricingCard.Plan>
                  <PricingCard.PlanName><span>Starter</span></PricingCard.PlanName>
                  <PricingCard.Badge>Free</PricingCard.Badge>
                </PricingCard.Plan>
                <PricingCard.Price>
                  <PricingCard.MainPrice>$0</PricingCard.MainPrice>
                  <PricingCard.Period>/ month</PricingCard.Period>
                </PricingCard.Price>
                <Link href="/login" className="block w-full text-center py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-80" style={{ backgroundColor: '#3d3430', color: '#f5f0eb' }}>
                  Get Started
                </Link>
              </PricingCard.Header>
              <PricingCard.Body>
                <PricingCard.List>
                  {['3 cover letters', 'AI-powered generation', 'Application history'].map((item) => (
                    <PricingCard.ListItem key={item}>
                      <span style={{ color: '#f97316' }}>✓</span>
                      <span>{item}</span>
                    </PricingCard.ListItem>
                  ))}
                </PricingCard.List>
                <PricingCard.Separator>Pro features</PricingCard.Separator>
                <PricingCard.List>
                  {['Unlimited cover letters', 'Priority generation', 'Download as PDF'].map((item) => (
                    <PricingCard.ListItem key={item} className="opacity-40">
                      <span>✕</span>
                      <span>{item}</span>
                    </PricingCard.ListItem>
                  ))}
                </PricingCard.List>
              </PricingCard.Body>
            </PricingCard.Card>

            <PricingCard.Card style={{ borderColor: '#f97316' }}>
              <PricingCard.Header style={{ backgroundColor: 'rgba(249,115,22,0.15)', borderColor: '#f97316' }}>
                <PricingCard.Plan>
                  <PricingCard.PlanName><span style={{ color: '#f97316' }}>Pro</span></PricingCard.PlanName>
                  <PricingCard.Badge>Most Popular</PricingCard.Badge>
                </PricingCard.Plan>
                <PricingCard.Price>
                  <PricingCard.MainPrice>$3</PricingCard.MainPrice>
                  <PricingCard.Period>/ month</PricingCard.Period>
                </PricingCard.Price>
                <p className="text-xs mb-3" style={{ color: '#9c8880' }}>60 cover letters per month</p>
                <Link href="/login" className="block w-full text-center py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: '#f97316' }}>
                  Get Pro
                </Link>
              </PricingCard.Header>
              <PricingCard.Body>
                <PricingCard.List>
                  {['60 cover letters / month', 'AI-powered generation', 'Application history', 'Priority generation', 'Download as PDF'].map((item) => (
                    <PricingCard.ListItem key={item}>
                      <span style={{ color: '#f97316' }}>✓</span>
                      <span>{item}</span>
                    </PricingCard.ListItem>
                  ))}
                </PricingCard.List>
              </PricingCard.Body>
            </PricingCard.Card>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1a1614', borderTop: '1px solid #2d2420' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: '#f97316' }}>
              CL
            </div>
            <span className="text-sm" style={{ color: '#9c8880' }}>Cover Letter AI</span>
          </div>
          <p className="text-xs" style={{ color: '#9c8880' }}>
            © 2026 Cover Letter AI. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  )
}
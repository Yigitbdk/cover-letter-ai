'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'

export default function GeneratePage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  })

  async function handleSubmit() {
    if (!file || !jobDescription.trim()) {
      setError('Please upload your CV and enter a job description.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('cv', file)
      formData.append('jobDescription', jobDescription)

      const res = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (res.status === 402) {
  setError('You have no credits left. Please upgrade to Pro to continue.')
  return
}
if (!res.ok) throw new Error(data.error || 'Something went wrong')

      router.push(`/history/${data.id}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ color: '#1a1614' }}>
          New Application
        </h1>
        <p className="text-sm mt-1" style={{ color: '#6b5c52' }}>
          Upload your CV and paste the job description to generate a cover letter
        </p>
      </div>

      <div className="space-y-6">
        {/* CV Upload */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#1a1614' }}>
            Your CV (PDF)
          </label>
          <div
            {...getRootProps()}
            className="rounded-xl p-8 text-center cursor-pointer transition-all duration-200"
            style={{
              backgroundColor: isDragActive ? '#fff3e8' : '#ffffff',
              border: `2px dashed ${isDragActive ? '#f97316' : '#e0d4c8'}`,
            }}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: '#f97316' }}
                >
                  PDF
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium" style={{ color: '#1a1614' }}>{file.name}</p>
                  <p className="text-xs" style={{ color: '#9c8880' }}>
                    {(file.size / 1024).toFixed(0)} KB
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null) }}
                  className="ml-4 text-xs px-2 py-1 rounded"
                  style={{ color: '#9c8880', backgroundColor: '#f5f0eb' }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: '#f5f0eb' }}
                >
                  <span className="text-xl">↑</span>
                </div>
                <p className="text-sm font-medium" style={{ color: '#1a1614' }}>
                  {isDragActive ? 'Drop your CV here' : 'Drag & drop your CV here'}
                </p>
                <p className="text-xs mt-1" style={{ color: '#9c8880' }}>
                  or click to browse — PDF only
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#1a1614' }}>
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            rows={10}
            className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-all duration-200"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e0d4c8',
              color: '#1a1614',
            }}
            onFocus={(e) => e.target.style.borderColor = '#f97316'}
            onBlur={(e) => e.target.style.borderColor = '#e0d4c8'}
          />
          <p className="text-xs mt-1" style={{ color: '#9c8880' }}>
            {jobDescription.length} characters
          </p>
        </div>

        {/* Error */}
{error && (
  <div className="rounded-lg px-4 py-3 text-sm" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
    <p>{error}</p>
    {error.includes('no credits') && (
      <a href="/dashboard" className="block mt-2 font-medium underline" style={{ color: '#dc2626' }}>
        Go to dashboard to upgrade →
      </a>
    )}
  </div>
)}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading || !file || !jobDescription.trim()}
          className="w-full py-3 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#f97316' }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </span>
          ) : (
            '✦ Generate Cover Letter'
          )}
        </button>
      </div>
    </div>
  )
}
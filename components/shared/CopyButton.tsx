'use client'

export default function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="text-xs px-3 py-1 rounded-lg transition-all duration-200 hover:opacity-80"
      style={{ backgroundColor: '#f97316', color: '#ffffff' }}
    >
      Copy
    </button>
  )
}
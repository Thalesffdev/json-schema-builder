'use client'

import { useState } from 'react'

interface JsonOutputProps {
  json: string
}

export function JsonOutput({ json }: JsonOutputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'output.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-zinc-400 text-sm font-medium">JSON gerado</span>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="text-xs px-3 py-1 rounded-md border border-zinc-600 text-zinc-300 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
          >
            {copied ? '✓ Copiado!' : 'Copiar'}
          </button>
          <button
            onClick={handleDownload}
            className="text-xs px-3 py-1 rounded-md border border-zinc-600 text-zinc-300 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
          >
            Download .json
          </button>
        </div>
      </div>

      <pre className="bg-zinc-950 border border-zinc-700 rounded-md p-4 text-sm text-emerald-400 overflow-x-auto whitespace-pre-wrap break-words">
        {json}
      </pre>
    </div>
  )
}
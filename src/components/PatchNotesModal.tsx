import { useEffect, useState } from 'react'

interface PatchNotesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PatchNotesModal({ isOpen, onClose }: PatchNotesModalProps) {
  const [patchNotes, setPatchNotes] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      // Fetch patch notes
      fetch('/PATCH_NOTES.md')
        .then(res => res.text())
        .then(text => {
          setPatchNotes(text)
          setIsLoading(false)
        })
        .catch(() => {
          setPatchNotes('# Patch Notes\n\nUnable to load patch notes.')
          setIsLoading(false)
        })
    }
  }, [isOpen])

  if (!isOpen) return null

  // Simple markdown parser for basic formatting
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n')
    const elements: JSX.Element[] = []
    let inCodeBlock = false
    let codeBlockContent: string[] = []

    lines.forEach((line, idx) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${idx}`} className="bg-gray-900 p-3 rounded-lg overflow-x-auto my-2">
              <code className="text-sm text-gray-300">{codeBlockContent.join('\n')}</code>
            </pre>
          )
          codeBlockContent = []
        }
        inCodeBlock = !inCodeBlock
        return
      }

      if (inCodeBlock) {
        codeBlockContent.push(line)
        return
      }

      // Headers
      if (line.startsWith('#### ')) {
        elements.push(<h4 key={idx} className="text-lg font-bold text-blue-400 mt-4 mb-2">{line.slice(5)}</h4>)
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={idx} className="text-xl font-bold text-purple-400 mt-6 mb-3">{line.slice(4)}</h3>)
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={idx} className="text-2xl font-bold text-dnd-gold mt-8 mb-4 border-b border-gray-700 pb-2">{line.slice(3)}</h2>)
      } else if (line.startsWith('# ')) {
        elements.push(<h1 key={idx} className="text-3xl font-bold text-dnd-gold mb-6">{line.slice(2)}</h1>)
      }
      // Horizontal rule
      else if (line.trim() === '---') {
        elements.push(<hr key={idx} className="border-gray-700 my-6" />)
      }
      // Unordered list
      else if (line.startsWith('- ')) {
        const content = line.slice(2)
        // Parse bold **text**
        const parts = content.split(/(\*\*[^*]+\*\*)/)
        const rendered = parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
          }
          return <span key={i}>{part}</span>
        })
        elements.push(
          <li key={idx} className="ml-4 text-gray-300 my-1">
            {rendered}
          </li>
        )
      }
      // Regular paragraph
      else if (line.trim()) {
        // Parse bold **text**
        const parts = line.split(/(\*\*[^*]+\*\*)/)
        const rendered = parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
          }
          return <span key={i}>{part}</span>
        })
        elements.push(<p key={idx} className="text-gray-400 my-2">{rendered}</p>)
      }
      // Empty line
      else {
        elements.push(<div key={idx} className="h-2" />)
      }
    })

    return elements
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div
        className="bg-gray-800 rounded-xl border-2 border-dnd-gold max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📋</span>
            <h2 className="text-2xl font-bold text-white">Patch Notes</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-900">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-dnd-gold"></div>
              <p className="text-gray-400 mt-4">Loading patch notes...</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              {renderMarkdown(patchNotes)}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-800 border-t border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-dnd-gold hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

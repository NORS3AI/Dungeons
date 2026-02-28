import { useState, useEffect } from 'react'

interface PatchNotesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PatchNotesModal({ isOpen, onClose }: PatchNotesModalProps) {
  const [patchNotes, setPatchNotes] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isOpen || patchNotes) return
    setIsLoading(true)
    fetch(`${import.meta.env.BASE_URL}PATCH_NOTES.md`)
      .then((r) => r.text())
      .then((text) => { setPatchNotes(text); setIsLoading(false) })
      .catch(() => { setPatchNotes('Failed to load patch notes.'); setIsLoading(false) })
  }, [isOpen, patchNotes])

  if (!isOpen) return null

  // Parse inline bold/italic from a markdown string into React elements
  const inlineMarkdown = (text: string, baseKey: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={`${baseKey}-${i}`} className="text-white font-semibold">{part.slice(2, -2)}</strong>
      }
      return <span key={`${baseKey}-${i}`}>{part}</span>
    })
  }

  // Simple markdown parser for basic formatting
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n')
    const elements: JSX.Element[] = []
    let inCodeBlock = false
    let codeBlockContent: string[] = []
    let listBuffer: { content: string; idx: number }[] = []

    const flushList = () => {
      if (listBuffer.length === 0) return
      const items = listBuffer.map(({ content, idx }) => (
        <li key={idx} className="flex items-start gap-2 text-gray-300 my-0.5">
          <span className="text-gray-500 mt-0.5 select-none">•</span>
          <span>{inlineMarkdown(content, `li-${idx}`)}</span>
        </li>
      ))
      elements.push(<ul key={`ul-${listBuffer[0].idx}`} className="ml-2 space-y-0.5 my-1">{items}</ul>)
      listBuffer = []
    }

    lines.forEach((line, idx) => {
      // Code blocks
      if (line.startsWith('```')) {
        flushList()
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

      // Unordered list — buffer for grouping
      if (line.startsWith('- ')) {
        listBuffer.push({ content: line.slice(2), idx })
        return
      }

      // Non-list line — flush any buffered list items first
      flushList()

      // Headers
      if (line.startsWith('#### ')) {
        elements.push(<h4 key={idx} className="text-base font-bold text-blue-400 mt-4 mb-1">{inlineMarkdown(line.slice(5), `h4-${idx}`)}</h4>)
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={idx} className="text-xl font-bold text-purple-400 mt-6 mb-3">{inlineMarkdown(line.slice(4), `h3-${idx}`)}</h3>)
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={idx} className="text-2xl font-bold text-dnd-gold mt-8 mb-4 border-b border-gray-700 pb-2">{inlineMarkdown(line.slice(3), `h2-${idx}`)}</h2>)
      } else if (line.startsWith('# ')) {
        elements.push(<h1 key={idx} className="text-3xl font-bold text-dnd-gold mb-6">{inlineMarkdown(line.slice(2), `h1-${idx}`)}</h1>)
      }
      // Horizontal rule
      else if (line.trim() === '---') {
        elements.push(<hr key={idx} className="border-gray-700 my-6" />)
      }
      // Regular paragraph
      else if (line.trim()) {
        elements.push(<p key={idx} className="text-gray-400 my-2">{inlineMarkdown(line, `p-${idx}`)}</p>)
      }
      // Empty line
      else {
        elements.push(<div key={idx} className="h-2" />)
      }
    })

    // Flush any remaining list items at end of file
    flushList()

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

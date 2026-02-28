import { useState, useMemo } from 'react'

// ⚠️  DO NOT change this to fetch() or any runtime network request.
//
// WHY: The deployed site (GitHub Pages) serves files from the `main` branch.
//   fetch(`${BASE_URL}PATCH_NOTES.md`) silently returns the OLD file from main,
//   hiding every version added since the last merge — the exact bug that caused
//   v0.4.1–0.4.8 to vanish from the in-app patch notes.
//
// HOW IT WORKS: Vite bundles the markdown content into the JS at build time via
//   the `?raw` suffix. The built app always contains the correct notes regardless
//   of what file the server happens to be serving.
//
// RULE: `npm run build` will fail if this import is missing or fetch() is used.
//   See CLAUDE.md § "Critical Technical Constraints" for the full explanation.
import patchNotesRaw from '../../PATCH_NOTES.md?raw'

interface PatchNotesModalProps {
  isOpen: boolean
  onClose: () => void
}

interface VersionSection {
  version: string
  date: string
  label: string   // e.g. "0.4.8"
  content: string // raw markdown for that version block
}

/** Split the full markdown into per-version sections keyed by ## headings */
function parseVersions(markdown: string): VersionSection[] {
  const lines = markdown.split('\n')
  const sections: VersionSection[] = []
  let current: string[] | null = null
  let currentHeading = ''

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (current !== null) {
        sections.push(parseSection(currentHeading, current.join('\n')))
      }
      currentHeading = line.slice(3).trim()
      current = []
    } else if (current !== null) {
      current.push(line)
    }
  }
  if (current !== null && currentHeading) {
    sections.push(parseSection(currentHeading, current.join('\n')))
  }
  return sections
}

function parseSection(heading: string, body: string): VersionSection {
  // heading format: "Version 0.4.8-alpha - February 28, 2026"
  const vMatch = heading.match(/Version\s+([\d.]+[^\s]*)/i)
  const dMatch = heading.match(/[-–]\s*(.+)$/)
  const version = vMatch ? vMatch[1] : heading
  const date = dMatch ? dMatch[1].trim() : ''
  const label = version.replace(/-alpha|-beta|-rc/gi, '')
  return { version, date, label, content: body.trimEnd() }
}

// ---- inline markdown (bold) ----
function InlineText({ text, baseKey }: { text: string; baseKey: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={`${baseKey}-${i}`} className="text-white font-semibold">{part.slice(2, -2)}</strong>
          : <span key={`${baseKey}-${i}`}>{part}</span>
      )}
    </>
  )
}

// ---- markdown body renderer (no ## headings, they're already stripped) ----
function renderBody(text: string) {
  const lines = text.split('\n')
  const elements: JSX.Element[] = []
  let inCode = false
  let codeLines: string[] = []
  let listBuf: { content: string; idx: number }[] = []

  const flushList = () => {
    if (!listBuf.length) return
    elements.push(
      <ul key={`ul-${listBuf[0].idx}`} className="ml-2 space-y-0.5 my-1 list-none">
        {listBuf.map(({ content, idx }) => (
          <li key={idx} className="flex items-start gap-2 text-gray-300">
            <span className="text-purple-400 mt-0.5 select-none shrink-0">•</span>
            <span><InlineText text={content} baseKey={`li-${idx}`} /></span>
          </li>
        ))}
      </ul>
    )
    listBuf = []
  }

  lines.forEach((line, idx) => {
    if (line.startsWith('```')) {
      flushList()
      if (inCode) {
        elements.push(
          <pre key={`code-${idx}`} className="bg-gray-950 border border-gray-700 p-3 rounded-lg overflow-x-auto my-2 text-sm text-gray-300">
            <code>{codeLines.join('\n')}</code>
          </pre>
        )
        codeLines = []
      }
      inCode = !inCode
      return
    }
    if (inCode) { codeLines.push(line); return }

    if (line.startsWith('- ')) {
      listBuf.push({ content: line.slice(2), idx })
      return
    }
    flushList()

    if (line.startsWith('#### ')) {
      elements.push(<h4 key={idx} className="text-sm font-bold text-blue-400 mt-4 mb-1 uppercase tracking-wide"><InlineText text={line.slice(5)} baseKey={`h4-${idx}`} /></h4>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={idx} className="text-base font-bold text-purple-300 mt-5 mb-2 flex items-center gap-2"><InlineText text={line.slice(4)} baseKey={`h3-${idx}`} /></h3>)
    } else if (line.trim() === '---') {
      elements.push(<hr key={idx} className="border-gray-700 my-4" />)
    } else if (line.trim()) {
      elements.push(<p key={idx} className="text-gray-400 my-1.5 leading-relaxed"><InlineText text={line} baseKey={`p-${idx}`} /></p>)
    } else {
      elements.push(<div key={idx} className="h-1.5" />)
    }
  })
  flushList()
  return elements
}

export function PatchNotesModal({ isOpen, onClose }: PatchNotesModalProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)

  const versions = useMemo(() => parseVersions(patchNotesRaw), [])

  if (!isOpen) return null

  const selected = versions[selectedIdx]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div
        className="bg-gray-800 rounded-xl border-2 border-dnd-gold max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 px-6 py-4 border-b border-gray-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <h2 className="text-xl font-bold text-white">Patch Notes</h2>
            {selected && (
              <span className="text-sm text-purple-300 font-mono bg-purple-900/40 px-2 py-0.5 rounded">
                v{selected.label}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar — version list */}
            <aside className="w-44 shrink-0 bg-gray-900 border-r border-gray-700 overflow-y-auto">
              {versions.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIdx(i)}
                  className={`w-full text-left px-3 py-2.5 border-b border-gray-800 transition-colors ${
                    i === selectedIdx
                      ? 'bg-purple-900/50 border-l-2 border-l-purple-400 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
                >
                  <div className={`text-sm font-bold font-mono ${i === 0 ? 'text-dnd-gold' : ''}`}>
                    v{v.label}
                  </div>
                  {v.date && (
                    <div className="text-xs text-gray-500 mt-0.5 leading-tight">{v.date}</div>
                  )}
                </button>
              ))}
            </aside>

            {/* Content panel */}
            <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
              {selected ? (
                <div className="max-w-2xl">
                  <h2 className="text-xl font-bold text-dnd-gold mb-1">
                    Version {selected.version}
                  </h2>
                  {selected.date && (
                    <p className="text-sm text-gray-500 mb-4">{selected.date}</p>
                  )}
                  <div>{renderBody(selected.content)}</div>
                </div>
              ) : (
                <p className="text-gray-500">Select a version from the list.</p>
              )}
            </main>
          </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-800 border-t border-gray-700 flex items-center justify-between shrink-0">
          <div className="flex gap-2">
            <button
              disabled={selectedIdx === 0}
              onClick={() => setSelectedIdx(selectedIdx - 1)}
              className="px-3 py-1.5 text-sm rounded bg-gray-700 hover:bg-gray-600 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← Newer
            </button>
            <button
              disabled={selectedIdx >= versions.length - 1}
              onClick={() => setSelectedIdx(selectedIdx + 1)}
              className="px-3 py-1.5 text-sm rounded bg-gray-700 hover:bg-gray-600 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Older →
            </button>
          </div>
          <span className="text-xs text-gray-600">
            {versions.length > 0 ? `${selectedIdx + 1} / ${versions.length}` : ''}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-dnd-gold hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

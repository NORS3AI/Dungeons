import { useState, useRef, useEffect } from 'react'
import { useSettingsStore } from '../stores/settingsStore'

const PASSCODE_HASH = '5db1fee4b5703808c48078a76768b155b421b210c0761cd6a5d223f4d99f1eaa'

async function sha256(text: string): Promise<string> {
  const encoded = new TextEncoder().encode(text)
  const buffer = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, authenticate } = useSettingsStore()
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isAuthenticated && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAuthenticated])

  if (isAuthenticated) return <>{children}</>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setChecking(true)
    setError(false)

    const hash = await sha256(code.trim())
    if (hash === PASSCODE_HASH) {
      authenticate()
    } else {
      setError(true)
      setCode('')
      inputRef.current?.focus()
    }
    setChecking(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">&#x1F3F0;</div>
          <h1 className="text-3xl font-bold text-dnd-gold mb-2">Dungeons</h1>
          <p className="text-gray-500 text-sm">Enter the passcode to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              ref={inputRef}
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setError(false)
              }}
              placeholder="Passcode"
              autoComplete="off"
              className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg text-white text-center text-lg
                         tracking-widest placeholder:text-gray-600 placeholder:tracking-normal
                         focus:outline-none focus:ring-2 focus:ring-dnd-gold transition-colors
                         ${error ? 'border-red-500 shake' : 'border-gray-700'}`}
            />
            {error && (
              <p className="text-red-400 text-sm text-center mt-2">
                Incorrect passcode
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!code.trim() || checking}
            className="w-full px-4 py-3 bg-dnd-gold text-gray-900 font-bold rounded-lg
                     hover:bg-yellow-500 transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed focus:outline-none focus:ring-2
                     focus:ring-dnd-gold focus:ring-offset-2 focus:ring-offset-gray-950"
          >
            {checking ? 'Checking...' : 'Enter'}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  )
}

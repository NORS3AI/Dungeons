import { useState, useEffect } from 'react'

interface ScrollNavigationProps {
  showScrollDown?: boolean
  showScrollUp?: boolean
}

export function ScrollNavigation({ showScrollDown = true, showScrollUp = true }: ScrollNavigationProps) {
  const [isAtTop, setIsAtTop] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight

      setIsAtTop(scrollTop < 100)
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 100)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {/* Scroll Down Arrow */}
      {showScrollDown && !isAtBottom && (
        <button
          onClick={scrollToBottom}
          className="fixed right-6 bottom-24 z-50 p-3 bg-gray-800/90 hover:bg-gray-700
                     border border-gray-600 rounded-full shadow-lg transition-all duration-200
                     hover:scale-110 group"
          aria-label="Scroll to bottom"
        >
          <svg
            className="w-6 h-6 text-dnd-gold group-hover:text-yellow-400 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}

      {/* Scroll Up Arrow */}
      {showScrollUp && !isAtTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 z-50 p-3 bg-gray-800/90 hover:bg-gray-700
                     border border-gray-600 rounded-full shadow-lg transition-all duration-200
                     hover:scale-110 group"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6 text-dnd-gold group-hover:text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  )
}

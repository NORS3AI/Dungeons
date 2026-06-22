import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { PasswordGate } from './components/PasswordGate'
import { ErrorBoundary } from './components/ErrorBoundary'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const CharacterCreatePage = lazy(() => import('./pages/CharacterCreatePage').then(m => ({ default: m.CharacterCreatePage })))
const CharacterSheetPage = lazy(() => import('./pages/CharacterSheetPage').then(m => ({ default: m.CharacterSheetPage })))
const CampaignPage = lazy(() => import('./pages/CampaignPage').then(m => ({ default: m.CampaignPage })))
const AdventurePage = lazy(() => import('./pages/AdventurePage').then(m => ({ default: m.AdventurePage })))

// Loading component for Suspense fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <PasswordGate>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ErrorBoundary><Suspense fallback={<PageLoader />}><HomePage /></Suspense></ErrorBoundary>} />
            <Route path="create" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><CharacterCreatePage /></Suspense></ErrorBoundary>} />
            <Route path="character/:id" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><CharacterSheetPage /></Suspense></ErrorBoundary>} />
            <Route path="campaign" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><CampaignPage /></Suspense></ErrorBoundary>} />
            <Route path="adventure/:id" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><AdventurePage /></Suspense></ErrorBoundary>} />
            <Route path="register" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><HomePage /></Suspense></ErrorBoundary>} />
          </Route>
        </Routes>
      </PasswordGate>
    </ErrorBoundary>
  )
}

export default App

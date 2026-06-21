import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { PasswordGate } from './components/PasswordGate'

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
    <PasswordGate>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
          <Route path="create" element={<Suspense fallback={<PageLoader />}><CharacterCreatePage /></Suspense>} />
          <Route path="character/:id" element={<Suspense fallback={<PageLoader />}><CharacterSheetPage /></Suspense>} />
          <Route path="campaign" element={<Suspense fallback={<PageLoader />}><CampaignPage /></Suspense>} />
          <Route path="adventure/:id" element={<Suspense fallback={<PageLoader />}><AdventurePage /></Suspense>} />
          <Route path="register" element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
        </Route>
      </Routes>
    </PasswordGate>
  )
}

export default App

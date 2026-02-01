import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { CharacterCreatePage } from './pages/CharacterCreatePage'
import { CharacterSheetPage } from './pages/CharacterSheetPage'
import { CampaignPage } from './pages/CampaignPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="create" element={<CharacterCreatePage />} />
        <Route path="character/:id" element={<CharacterSheetPage />} />
        <Route path="campaign" element={<CampaignPage />} />
        <Route path="register" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App

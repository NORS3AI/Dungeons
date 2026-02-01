import { Outlet, Link } from 'react-router-dom'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 border-b border-gray-700">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🎲</span>
              <span className="text-xl font-bold text-gold-500">Dungeons</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link
                to="/create"
                className="btn-primary"
              >
                Create Character
              </Link>
              <Link
                to="/campaign"
                className="btn-secondary"
              >
                DM Tools
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          D&D 5th Edition 2024 Character Creator & DM Tool
        </div>
      </footer>
    </div>
  )
}

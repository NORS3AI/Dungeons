import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gold-500 mb-4">
          Dungeons
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          D&D 5th Edition Character Creator & DM Tool.
          Create characters with a simple click-and-create flow.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link to="/create" className="card hover:border-gold-500 transition-colors group">
          <div className="text-4xl mb-4">⚔️</div>
          <h2 className="text-2xl font-bold text-gold-500 mb-2 group-hover:text-gold-400">
            Create Character
          </h2>
          <p className="text-gray-400">
            Build your hero step by step. Choose race, class, stats, spells, and equipment.
          </p>
        </Link>

        <Link to="/campaign" className="card hover:border-gold-500 transition-colors group">
          <div className="text-4xl mb-4">📜</div>
          <h2 className="text-2xl font-bold text-gold-500 mb-2 group-hover:text-gold-400">
            DM Tools
          </h2>
          <p className="text-gray-400">
            Manage your campaign. Track characters, NPCs, and run encounters.
          </p>
        </Link>
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-lg text-gray-500 mb-4">Currently Supporting</h3>
        <div className="flex justify-center gap-8 text-gray-400">
          <div>
            <span className="text-gold-500 font-semibold">Fighter</span> (Ranger)
          </div>
          <div>
            <span className="text-gold-500 font-semibold">Warlock</span> (Great Old One)
          </div>
          <div>
            <span className="text-gold-500 font-semibold">Drow</span>
          </div>
          <div>
            <span className="text-gold-500 font-semibold">Tiefling</span>
          </div>
        </div>
      </div>
    </div>
  )
}

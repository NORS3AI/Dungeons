export function CampaignPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gold-500 mb-8">DM Campaign Tools</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gold-400 mb-2">Party Overview</h2>
          <p className="text-gray-400 text-sm">
            View and manage all characters in your campaign.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gold-400 mb-2">NPC Creator</h2>
          <p className="text-gray-400 text-sm">
            Create NPCs with full stat blocks.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gold-400 mb-2">Encounter Manager</h2>
          <p className="text-gray-400 text-sm">
            Run encounters with multi-panel view.
          </p>
        </div>
      </div>

      <p className="text-gray-500 mt-8 text-center">
        DM tools coming in Phase 6.
      </p>
    </div>
  )
}

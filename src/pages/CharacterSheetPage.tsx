import { useParams } from 'react-router-dom'

export function CharacterSheetPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gold-500 mb-8">Character Sheet</h1>

      <div className="card">
        <p className="text-gray-400">
          Character sheet for ID: {id}
        </p>
        <p className="text-gray-500 mt-4 text-sm">
          Full character sheet display coming in Phase 5.
        </p>
      </div>
    </div>
  )
}

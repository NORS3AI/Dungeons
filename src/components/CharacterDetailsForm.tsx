import { useState, useRef, useEffect, KeyboardEvent } from 'react'

interface CharacterDetails {
  name: string
  age: string
  height: string
  weight: string
  backstory: string
  playerName: string
  startingLevel: number
}

interface CharacterDetailsFormProps {
  initialValues?: Partial<CharacterDetails>
  onSubmit: (details: CharacterDetails) => void
  onBack?: () => void
}

/**
 * Character Details Form - Page 1 of character creation
 * Collects basic character information with full keyboard navigation
 */
export function CharacterDetailsForm({
  initialValues = {},
  onSubmit,
  onBack,
}: CharacterDetailsFormProps) {
  const [details, setDetails] = useState<CharacterDetails>({
    name: initialValues.name ?? '',
    age: initialValues.age ?? '',
    height: initialValues.height ?? '',
    weight: initialValues.weight ?? '',
    backstory: initialValues.backstory ?? '',
    playerName: initialValues.playerName ?? '',
    startingLevel: initialValues.startingLevel ?? 1,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CharacterDetails, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof CharacterDetails, boolean>>>({})

  // Refs for keyboard navigation
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null)[]>([])

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const validateField = (field: keyof CharacterDetails, value: string | number): string | undefined => {
    switch (field) {
      case 'name':
        if (typeof value === 'string' && !value.trim()) return 'Character name is required'
        if (typeof value === 'string' && value.length < 2) return 'Name must be at least 2 characters'
        if (typeof value === 'string' && value.length > 50) return 'Name must be 50 characters or less'
        break
      case 'age':
        if (value && (isNaN(Number(value)) || Number(value) < 0)) {
          return 'Age must be a positive number'
        }
        break
      case 'height':
        if (typeof value === 'string' && value.length > 20) return 'Height must be 20 characters or less'
        break
      case 'weight':
        if (typeof value === 'string' && value.length > 20) return 'Weight must be 20 characters or less'
        break
      case 'backstory':
        if (typeof value === 'string' && value.length > 5000) return 'Backstory must be 5000 characters or less'
        break
      case 'playerName':
        if (typeof value === 'string' && value.length > 50) return 'Player name must be 50 characters or less'
        break
      case 'startingLevel':
        if (typeof value === 'number' && (value < 1 || value > 20)) return 'Starting level must be between 1 and 20'
        break
    }
    return undefined
  }

  const handleChange = (field: keyof CharacterDetails, value: string | number) => {
    setDetails((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const handleBlur = (field: keyof CharacterDetails) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const error = validateField(field, details[field])
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    // Handle Tab navigation (browser default works, but we can enhance it)
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault()
      // Move to next input on Enter (except for textarea)
      const nextIndex = index + 1
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex]?.focus()
      }
    }
  }

  const isValid = (): boolean => {
    const nameError = validateField('name', details.name)
    return !nameError
  }

  const handleSubmit = () => {
    // Validate all fields
    const newErrors: Partial<Record<keyof CharacterDetails, string>> = {}
    let hasErrors = false

    Object.keys(details).forEach((key) => {
      const field = key as keyof CharacterDetails
      const error = validateField(field, details[field])
      if (error) {
        newErrors[field] = error
        hasErrors = true
      }
    })

    setErrors(newErrors)
    setTouched({
      name: true,
      age: true,
      height: true,
      weight: true,
      backstory: true,
      playerName: true,
      startingLevel: true,
    })

    if (!hasErrors) {
      onSubmit(details)
    }
  }

  const inputClass = (field: keyof CharacterDetails) =>
    `w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500
     focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:border-transparent
     transition-all duration-200
     ${errors[field] && touched[field] ? 'border-red-500' : 'border-gray-600 hover:border-gray-500'}`

  const labelClass = 'block text-sm font-medium text-gray-300 mb-2'
  const errorClass = 'text-red-400 text-sm mt-1'

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dnd-gold mb-2">Character Details</h2>
        <p className="text-gray-400">
          Enter your character's basic information. Use Tab to navigate between fields.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="space-y-6"
      >
        {/* Character Name - Required */}
        <div>
          <label htmlFor="name" className={labelClass}>
            Character Name <span className="text-red-400">*</span>
          </label>
          <input
            ref={(el) => { inputRefs.current[0] = el }}
            id="name"
            type="text"
            value={details.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            placeholder="Enter your character's name"
            className={inputClass('name')}
            aria-required="true"
            aria-invalid={!!errors.name && touched.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && touched.name && (
            <p id="name-error" className={errorClass} role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Starting Level */}
        <div>
          <label htmlFor="startingLevel" className={labelClass}>
            Starting Level <span className="text-red-400">*</span>
          </label>
          <select
            ref={(el) => { inputRefs.current[1] = el as HTMLSelectElement }}
            id="startingLevel"
            value={details.startingLevel}
            onChange={(e) => handleChange('startingLevel', parseInt(e.target.value))}
            onBlur={() => handleBlur('startingLevel')}
            className={inputClass('startingLevel')}
            aria-required="true"
            aria-invalid={!!errors.startingLevel && touched.startingLevel}
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((level) => (
              <option key={level} value={level}>
                Level {level}
              </option>
            ))}
          </select>
          {errors.startingLevel && touched.startingLevel && (
            <p className={errorClass} role="alert">
              {errors.startingLevel}
            </p>
          )}
        </div>

        {/* Age */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="age" className={labelClass}>
              Age
            </label>
            <input
              ref={(el) => { inputRefs.current[2] = el }}
              id="age"
              type="text"
              value={details.age}
              onChange={(e) => handleChange('age', e.target.value)}
              onBlur={() => handleBlur('age')}
              onKeyDown={(e) => handleKeyDown(e, 2)}
              placeholder="e.g., 25"
              className={inputClass('age')}
              aria-invalid={!!errors.age && touched.age}
            />
            {errors.age && touched.age && (
              <p className={errorClass} role="alert">
                {errors.age}
              </p>
            )}
          </div>

          {/* Height */}
          <div>
            <label htmlFor="height" className={labelClass}>
              Height
            </label>
            <input
              ref={(el) => { inputRefs.current[3] = el }}
              id="height"
              type="text"
              value={details.height}
              onChange={(e) => handleChange('height', e.target.value)}
              onBlur={() => handleBlur('height')}
              onKeyDown={(e) => handleKeyDown(e, 3)}
              placeholder="e.g., 5'10&quot;"
              className={inputClass('height')}
            />
            {errors.height && touched.height && (
              <p className={errorClass} role="alert">
                {errors.height}
              </p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label htmlFor="weight" className={labelClass}>
              Weight
            </label>
            <input
              ref={(el) => { inputRefs.current[4] = el }}
              id="weight"
              type="text"
              value={details.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              onBlur={() => handleBlur('weight')}
              onKeyDown={(e) => handleKeyDown(e, 4)}
              placeholder="e.g., 150 lbs"
              className={inputClass('weight')}
            />
            {errors.weight && touched.weight && (
              <p className={errorClass} role="alert">
                {errors.weight}
              </p>
            )}
          </div>
        </div>

        {/* Player Name */}
        <div>
          <label htmlFor="playerName" className={labelClass}>
            Player Name
          </label>
          <input
            ref={(el) => { inputRefs.current[5] = el }}
            id="playerName"
            type="text"
            value={details.playerName}
            onChange={(e) => handleChange('playerName', e.target.value)}
            onBlur={() => handleBlur('playerName')}
            onKeyDown={(e) => handleKeyDown(e, 5)}
            placeholder="Your name (for DM tracking)"
            className={inputClass('playerName')}
          />
          {errors.playerName && touched.playerName && (
            <p className={errorClass} role="alert">
              {errors.playerName}
            </p>
          )}
        </div>

        {/* Backstory */}
        <div>
          <label htmlFor="backstory" className={labelClass}>
            Background Story / Notes
          </label>
          <textarea
            ref={(el) => { inputRefs.current[6] = el }}
            id="backstory"
            value={details.backstory}
            onChange={(e) => handleChange('backstory', e.target.value)}
            onBlur={() => handleBlur('backstory')}
            placeholder="Write your character's backstory, personality traits, or any notes..."
            rows={6}
            className={`${inputClass('backstory')} resize-y min-h-[120px]`}
          />
          <div className="flex justify-between mt-1">
            {errors.backstory && touched.backstory ? (
              <p className={errorClass} role="alert">
                {errors.backstory}
              </p>
            ) : (
              <span />
            )}
            <span className="text-gray-500 text-sm">
              {details.backstory.length}/5000
            </span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-gray-700">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600
                       hover:border-gray-500 rounded-lg transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-dnd-gold"
            >
              Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={!isValid()}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-2
                       focus:ring-offset-gray-900
                       ${
                         isValid()
                           ? 'bg-dnd-gold text-gray-900 hover:bg-yellow-500'
                           : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                       }`}
          >
            Next: Choose Race
          </button>
        </div>
      </form>

      {/* Keyboard Navigation Hint */}
      <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400">
          <span className="text-dnd-gold font-medium">Keyboard shortcuts:</span>{' '}
          <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Tab</kbd> to move forward,{' '}
          <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Shift+Tab</kbd> to move back,{' '}
          <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Enter</kbd> to advance to next field
        </p>
      </div>
    </div>
  )
}

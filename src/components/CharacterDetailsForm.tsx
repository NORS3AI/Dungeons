import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { RACE_NAME_TABLES, generateRandomName } from '../data/names'

interface CharacterDetails {
  name: string       // Composed from firstName + surname
  firstName: string  // Required
  surname: string    // Optional
  nickname: string   // Optional
  gender?: 'male' | 'female' | 'other'
  age: string
  height: string
  weight: string
  backstory: string
  playerName: string
}

interface CharacterDetailsFormProps {
  initialValues?: Partial<CharacterDetails>
  onSubmit: (details: CharacterDetails) => void
  onBack?: () => void
}

/**
 * Character Details Form - Page 1 of character creation
 * Collects basic character information with full keyboard navigation.
 * Includes a race-based random name generator.
 */
export function CharacterDetailsForm({
  initialValues = {},
  onSubmit,
  onBack,
}: CharacterDetailsFormProps) {
  const [details, setDetails] = useState<CharacterDetails>({
    name: initialValues.name ?? '',
    firstName: initialValues.firstName ?? '',
    surname: initialValues.surname ?? '',
    nickname: initialValues.nickname ?? '',
    gender: initialValues.gender,
    age: initialValues.age ?? '',
    height: initialValues.height ?? '',
    weight: initialValues.weight ?? '',
    backstory: initialValues.backstory ?? '',
    playerName: initialValues.playerName ?? '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CharacterDetails, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof CharacterDetails, boolean>>>({})

  // Name generator state
  const [generatorRace, setGeneratorRace] = useState('human')

  // Refs for keyboard navigation
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null)[]>([])

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  // Compose the full name whenever firstName or surname changes
  const composeName = (firstName: string, surname: string) =>
    [firstName.trim(), surname.trim()].filter(Boolean).join(' ')

  const validateField = (field: keyof CharacterDetails, value: string | number | undefined): string | undefined => {
    switch (field) {
      case 'firstName':
        if (typeof value === 'string' && !value.trim()) return 'First name is required'
        if (typeof value === 'string' && value.length < 2) return 'First name must be at least 2 characters'
        if (typeof value === 'string' && value.length > 50) return 'First name must be 50 characters or less'
        break
      case 'surname':
        if (typeof value === 'string' && value.length > 50) return 'Surname must be 50 characters or less'
        break
      case 'nickname':
        if (typeof value === 'string' && value.length > 50) return 'Nickname must be 50 characters or less'
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
    }
    return undefined
  }

  const handleChange = (field: keyof CharacterDetails, value: string | number | undefined) => {
    setDetails((prev) => {
      const next = { ...prev, [field]: value }
      // Keep the composed `name` in sync
      if (field === 'firstName' || field === 'surname') {
        next.name = composeName(
          field === 'firstName' ? String(value ?? '') : prev.firstName,
          field === 'surname' ? String(value ?? '') : prev.surname,
        )
      }
      return next
    })

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
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault()
      const nextIndex = index + 1
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex]?.focus()
      }
    }
  }

  const handleGenerateName = () => {
    const gender: 'male' | 'female' | 'neutral' =
      details.gender === 'male' ? 'male' :
      details.gender === 'female' ? 'female' :
      'neutral'
    const { firstName, surname } = generateRandomName(generatorRace, gender)
    setDetails((prev) => ({
      ...prev,
      firstName,
      surname,
      name: composeName(firstName, surname),
    }))
    // Clear validation errors after generating
    setErrors((prev) => ({ ...prev, firstName: undefined, surname: undefined }))
  }

  const isValid = (): boolean => {
    const firstNameError = validateField('firstName', details.firstName)
    return !firstNameError
  }

  const handleSubmit = () => {
    const newErrors: Partial<Record<keyof CharacterDetails, string>> = {}
    let hasErrors = false

    ;(['firstName', 'surname', 'nickname', 'age', 'height', 'weight', 'backstory', 'playerName'] as (keyof CharacterDetails)[]).forEach((field) => {
      const error = validateField(field, details[field])
      if (error) {
        newErrors[field] = error
        hasErrors = true
      }
    })

    setErrors(newErrors)
    setTouched({ firstName: true, surname: true, nickname: true, age: true, height: true, weight: true, backstory: true, playerName: true })

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
        {/* Name section */}
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Name</h3>
          </div>

          {/* Name Generator */}
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className={labelClass}>Race (for name generator)</label>
              <select
                value={generatorRace}
                onChange={(e) => setGeneratorRace(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 hover:border-gray-500 rounded-lg text-white
                           focus:outline-none focus:ring-2 focus:ring-dnd-gold"
              >
                {RACE_NAME_TABLES.map((r) => (
                  <option key={r.raceId} value={r.raceId}>{r.label}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={handleGenerateName}
              className="px-4 py-2 bg-dnd-gold text-gray-900 rounded-lg font-medium hover:bg-yellow-500 transition-colors whitespace-nowrap"
              title="Generate a random name based on race and gender"
            >
              🎲 Generate Name
            </button>
          </div>

          {/* First Name — required */}
          <div>
            <label htmlFor="firstName" className={labelClass}>
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              ref={(el) => { inputRefs.current[0] = el }}
              id="firstName"
              type="text"
              value={details.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              onBlur={() => handleBlur('firstName')}
              onKeyDown={(e) => handleKeyDown(e, 0)}
              placeholder="e.g., Araevin"
              className={inputClass('firstName')}
              aria-required="true"
              aria-invalid={!!errors.firstName && touched.firstName}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            />
            {errors.firstName && touched.firstName && (
              <p id="firstName-error" className={errorClass} role="alert">
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Surname + Nickname row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="surname" className={labelClass}>
                Surname <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <input
                ref={(el) => { inputRefs.current[1] = el }}
                id="surname"
                type="text"
                value={details.surname}
                onChange={(e) => handleChange('surname', e.target.value)}
                onBlur={() => handleBlur('surname')}
                onKeyDown={(e) => handleKeyDown(e, 1)}
                placeholder="e.g., Moonwhisper"
                className={inputClass('surname')}
              />
              {errors.surname && touched.surname && (
                <p className={errorClass} role="alert">{errors.surname}</p>
              )}
            </div>
            <div>
              <label htmlFor="nickname" className={labelClass}>
                Nickname <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <input
                ref={(el) => { inputRefs.current[2] = el }}
                id="nickname"
                type="text"
                value={details.nickname}
                onChange={(e) => handleChange('nickname', e.target.value)}
                onBlur={() => handleBlur('nickname')}
                onKeyDown={(e) => handleKeyDown(e, 2)}
                placeholder='e.g., "Quickhand"'
                className={inputClass('nickname')}
              />
              {errors.nickname && touched.nickname && (
                <p className={errorClass} role="alert">{errors.nickname}</p>
              )}
            </div>
          </div>

          {/* Composed name preview */}
          {details.firstName && (
            <div className="text-sm text-gray-400 pt-1">
              Full name:{' '}
              <span className="text-dnd-gold font-medium">
                {details.firstName}
                {details.nickname ? ` "${details.nickname}"` : ''}
                {details.surname ? ` ${details.surname}` : ''}
              </span>
            </div>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className={labelClass}>Gender</label>
          <div className="flex gap-3">
            {(['male', 'female', 'other'] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => handleChange('gender', g)}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-dnd-gold capitalize
                           ${
                             details.gender === g
                               ? 'bg-dnd-gold text-gray-900'
                               : 'bg-gray-800 text-gray-300 border border-gray-600 hover:border-gray-500'
                           }`}
              >
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Age / Height / Weight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="age" className={labelClass}>Age</label>
            <input
              ref={(el) => { inputRefs.current[3] = el }}
              id="age"
              type="text"
              value={details.age}
              onChange={(e) => handleChange('age', e.target.value)}
              onBlur={() => handleBlur('age')}
              onKeyDown={(e) => handleKeyDown(e, 3)}
              placeholder="e.g., 25"
              className={inputClass('age')}
            />
            {errors.age && touched.age && (
              <p className={errorClass} role="alert">{errors.age}</p>
            )}
          </div>
          <div>
            <label htmlFor="height" className={labelClass}>Height</label>
            <input
              ref={(el) => { inputRefs.current[4] = el }}
              id="height"
              type="text"
              value={details.height}
              onChange={(e) => handleChange('height', e.target.value)}
              onBlur={() => handleBlur('height')}
              onKeyDown={(e) => handleKeyDown(e, 4)}
              placeholder="e.g., 5'10&quot;"
              className={inputClass('height')}
            />
            {errors.height && touched.height && (
              <p className={errorClass} role="alert">{errors.height}</p>
            )}
          </div>
          <div>
            <label htmlFor="weight" className={labelClass}>Weight</label>
            <input
              ref={(el) => { inputRefs.current[5] = el }}
              id="weight"
              type="text"
              value={details.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              onBlur={() => handleBlur('weight')}
              onKeyDown={(e) => handleKeyDown(e, 5)}
              placeholder="e.g., 150 lbs"
              className={inputClass('weight')}
            />
            {errors.weight && touched.weight && (
              <p className={errorClass} role="alert">{errors.weight}</p>
            )}
          </div>
        </div>

        {/* Player Name */}
        <div>
          <label htmlFor="playerName" className={labelClass}>Player Name</label>
          <input
            ref={(el) => { inputRefs.current[6] = el }}
            id="playerName"
            type="text"
            value={details.playerName}
            onChange={(e) => handleChange('playerName', e.target.value)}
            onBlur={() => handleBlur('playerName')}
            onKeyDown={(e) => handleKeyDown(e, 6)}
            placeholder="Your name (for DM tracking)"
            className={inputClass('playerName')}
          />
          {errors.playerName && touched.playerName && (
            <p className={errorClass} role="alert">{errors.playerName}</p>
          )}
        </div>

        {/* Backstory */}
        <div>
          <label htmlFor="backstory" className={labelClass}>Background Story / Notes</label>
          <textarea
            ref={(el) => { inputRefs.current[7] = el }}
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
              <p className={errorClass} role="alert">{errors.backstory}</p>
            ) : (
              <span />
            )}
            <span className="text-gray-500 text-sm">{details.backstory.length}/5000</span>
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

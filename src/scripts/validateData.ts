#!/usr/bin/env node
/**
 * Data Validation Script
 *
 * Validates that all class feature IDs defined in class.ts have corresponding
 * trait reference entries in traits.ts. This prevents "Reference not found" errors
 * in QuickRefTooltips throughout the application.
 *
 * Run: npm run validate:data
 * Exits with code 1 if validation fails, 0 if successful.
 */

import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface ValidationResult {
  totalFeatures: number
  totalTraits: number
  missingTraits: string[]
  duplicateTraits: string[]
  success: boolean
}

/**
 * Extract all feature IDs from class.ts
 */
function extractFeatureIds(classFileContent: string): Set<string> {
  const featureIds = new Set<string>()

  // Match feature objects in the features array: { id: 'feature-id', ...}
  const featureRegex = /\{\s*id:\s*['"]([a-z-]+)['"]/g
  let match

  while ((match = featureRegex.exec(classFileContent)) !== null) {
    featureIds.add(match[1])
  }

  return featureIds
}

/**
 * Extract all trait IDs from traits.ts
 */
function extractTraitIds(traitsFileContent: string): { ids: Set<string>, duplicates: string[] } {
  const traitIds = new Set<string>()
  const seenIds = new Map<string, number>()

  // Match trait keys: 'trait-id': {
  const traitRegex = /^  '([a-z-]+)':\s*\{$/gm
  let match

  while ((match = traitRegex.exec(traitsFileContent)) !== null) {
    const id = match[1]
    seenIds.set(id, (seenIds.get(id) || 0) + 1)
    traitIds.add(id)
  }

  // Find duplicates
  const duplicates = Array.from(seenIds.entries())
    .filter(([_, count]) => count > 1)
    .map(([id]) => id)

  return { ids: traitIds, duplicates }
}

/**
 * Main validation function
 */
function validateData(): ValidationResult {
  const projectRoot = join(__dirname, '../..')

  // Read source files
  const classFilePath = join(projectRoot, 'src/types/class.ts')
  const traitsFilePath = join(projectRoot, 'src/data/references/traits.ts')

  let classFileContent: string
  let traitsFileContent: string

  try {
    classFileContent = readFileSync(classFilePath, 'utf-8')
  } catch (error) {
    console.error(`❌ Failed to read ${classFilePath}`)
    throw error
  }

  try {
    traitsFileContent = readFileSync(traitsFilePath, 'utf-8')
  } catch (error) {
    console.error(`❌ Failed to read ${traitsFilePath}`)
    throw error
  }

  // Extract IDs
  const featureIds = extractFeatureIds(classFileContent)
  const { ids: traitIds, duplicates } = extractTraitIds(traitsFileContent)

  // Find missing traits
  const missingTraits = Array.from(featureIds).filter(id => !traitIds.has(id)).sort()

  const result: ValidationResult = {
    totalFeatures: featureIds.size,
    totalTraits: traitIds.size,
    missingTraits,
    duplicateTraits: duplicates,
    success: missingTraits.length === 0 && duplicates.length === 0
  }

  return result
}

/**
 * Print validation results and exit with appropriate code
 */
function main() {
  console.log('\n🔍 Validating Data Consistency...\n')

  try {
    const result = validateData()

    console.log(`📊 Statistics:`)
    console.log(`   - Class features defined: ${result.totalFeatures}`)
    console.log(`   - Trait references defined: ${result.totalTraits}`)
    console.log(`   - Coverage: ${((result.totalTraits / result.totalFeatures) * 100).toFixed(1)}%`)

    // Check for duplicate trait IDs
    if (result.duplicateTraits.length > 0) {
      console.error(`\n❌ Found ${result.duplicateTraits.length} duplicate trait ID(s):\n`)
      result.duplicateTraits.forEach(id => {
        console.error(`   - '${id}' (duplicate definition)`)
      })
    }

    // Check for missing trait references
    if (result.missingTraits.length > 0) {
      console.error(`\n❌ Found ${result.missingTraits.length} class feature(s) without trait references:\n`)

      // Group by first word for better readability
      const grouped = new Map<string, string[]>()
      result.missingTraits.forEach(id => {
        const prefix = id.split('-')[0]
        if (!grouped.has(prefix)) {
          grouped.set(prefix, [])
        }
        grouped.get(prefix)!.push(id)
      })

      grouped.forEach((ids, prefix) => {
        console.error(`   ${prefix}-*: ${ids.join(', ')}`)
      })

      console.error(`\n💡 To fix: Add trait entries for these IDs in src/data/references/traits.ts\n`)
    }

    // Print result
    if (result.success) {
      console.log('\n✅ Data validation passed! All class features have trait references.\n')
      process.exit(0)
    } else {
      console.error(`\n❌ Data validation failed!\n`)
      process.exit(1)
    }

  } catch (error) {
    console.error('\n❌ Validation error:', error)
    process.exit(1)
  }
}

// Run if executed directly (ES module check)
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { validateData, type ValidationResult }

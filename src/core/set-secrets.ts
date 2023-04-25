import { setSecret } from './set-secret.js'
import type { Project } from '@/support/Project.js'

/**
 * Set multiple project secrets
 */
export async function setSecrets(
  project: Project,
  secrets: Record<string, any>
) {
  const promises = Object.entries(secrets).map(([key, value]) =>
    setSecret(project, key, value)
  )
  try {
    Promise.all(promises)
  } catch (cause) {
    throw new Error(`Unable to set secrets`, { cause })
  }
}

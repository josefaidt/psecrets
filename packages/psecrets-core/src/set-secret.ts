import { setParameter } from './set-parameter.js'
import { createSecretKey } from './support.js'
import type { Project } from 'project'

/**
 * Set a project secret
 */
export async function setSecret(project: Project, name: string, value: string) {
  const secretKey = createSecretKey(project, name)
  try {
    await setParameter(secretKey, value, { type: 'SecureString' })
  } catch (cause) {
    throw new Error(`Unable to set secret ${secretKey}`, { cause })
  }
}

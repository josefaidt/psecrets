import { setParameter } from './set-parameter.js'
import { createSecretKey } from './support.js'
import type { Project } from 'project'

/**
 * Set a project parameter
 */
export async function setPublic(project: Project, name: string, value: string) {
  const secretKey = createSecretKey(project, name)
  try {
    await setParameter(secretKey, value, { type: 'String' })
  } catch (cause) {
    throw new Error(`Unable to set public parameter ${secretKey}`, { cause })
  }
}

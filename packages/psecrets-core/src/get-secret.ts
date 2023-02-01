import { getParameter } from './get-parameter.js'
import { createSecretKey } from './support.js'
import type { Project } from 'project'

/**
 * Get a project's secret
 */
export async function getSecret(project: Project, name: string) {
  const secretKey = createSecretKey(project, name)
  return getParameter(secretKey)
}

import { loadEnv } from 'vite'
import { setSecret } from './set-secret.js'
import { PREFIXES } from './constants.js'
import type { Project } from 'project'

/**
 * Upload secrets to SSM Parameter Store using a local file
 */
export async function uploadSecrets(project: Project): Promise<void> {
  const env = loadEnv(project.env, process.cwd(), [PREFIXES.SECRET])
  for (const [name, value] of Object.entries(env)) {
    await setSecret(project, name, value)
  }
}

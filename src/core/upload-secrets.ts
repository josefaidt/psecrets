import { loadDotenv } from './load-dotenv.js'
import { setSecret } from './set-secret.js'
import { PREFIXES } from './constants.js'
import type { Project } from '@/support/Project.js'

/**
 * Upload secrets to SSM Parameter Store using a local file
 */
export async function uploadSecrets(project: Project): Promise<void> {
  const env = loadDotenv(project.env, process.cwd(), [PREFIXES.SECRET])
  for (const [name, value] of Object.entries(env)) {
    await setSecret(project, name, value)
  }
}

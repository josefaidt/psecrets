import { loadDotenv } from './load-dotenv.js'
import { setPublic } from './set-public.js'
import { PREFIXES } from './constants.js'
import type { Project } from '@/support/Project.js'

/**
 * Upload public parameters to SSM Parameter Store using a local file
 */
export async function uploadPublic(project: Project): Promise<void> {
  const env = loadDotenv(project.env, process.cwd(), [PREFIXES.PUBLIC])
  for (const [name, value] of Object.entries(env)) {
    await setPublic(project, name, value)
  }
}

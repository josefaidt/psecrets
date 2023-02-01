import { loadEnv } from 'vite'
import { setPublic } from './set-public.js'
import { PREFIXES } from './constants.js'
import type { Project } from 'project'

/**
 * Upload public parameters to SSM Parameter Store using a local file
 */
export async function uploadPublic(project: Project): Promise<void> {
  const env = loadEnv(project.env, process.cwd(), [PREFIXES.PUBLIC])
  for (const [name, value] of Object.entries(env)) {
    await setPublic(project, name, value)
  }
}

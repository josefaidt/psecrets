import { resolve } from 'project'
import type { ProjectOptions } from 'project'

export async function createProject(options?: ProjectOptions) {
  const existing = await resolve()
  console.debug('loaded existing project', existing)
  return { ...existing, ...options }
}

export const project = await resolve()

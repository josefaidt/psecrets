import { resolve } from 'project'
import type { ProjectOptions } from 'project'

type CreateProjectOptions = Omit<ProjectOptions, 'name'> & { name?: string }

export async function createProject(options?: CreateProjectOptions) {
  const existing = await resolve()
  console.debug('loaded existing project', existing)
  return { ...existing, ...options }
}

export const project = await resolve()

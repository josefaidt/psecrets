import { resolveProject } from '@/support/resolve-project.js'
import type { ProjectOptions } from '@/support/Project.js'

type CreateProjectOptions = Omit<ProjectOptions, 'name'> & {
  name?: string | undefined
}

export async function createProject(options?: CreateProjectOptions) {
  const existing = await resolveProject()
  console.debug('loaded existing project', existing)
  return {
    name: options?.name ?? existing.name,
    env: options?.env ?? existing.env,
  }
}

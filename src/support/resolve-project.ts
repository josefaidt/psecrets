import { readPackageJson } from './read-package-json.js'
import { createProject } from './Project.js'

export async function resolveProject(path?: string) {
  const pkg = await readPackageJson(path)
  const project = createProject(pkg)
  return project
}

import { readPackageJson } from './packageJson.js'
import { createProject } from './Project.js'

export async function resolve(path: string) {
  const pkg = await readPackageJson(path)
  const project = createProject(pkg)
  return project
}

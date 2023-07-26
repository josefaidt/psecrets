import { existsSync } from 'node:fs'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

export async function readPackageJson(dir: string = process.cwd()) {
  const root = process.cwd()
  const packageJsonPath = path.join(root, 'package.json')
  if (!existsSync(packageJsonPath)) {
    throw new Error(
      'package.json not found, are you in the root of your project?'
    )
  }
  console.debug('resolved package.json at', packageJsonPath)
  const contents = await fs.readFile(packageJsonPath, 'utf8')
  return JSON.parse(contents)
}

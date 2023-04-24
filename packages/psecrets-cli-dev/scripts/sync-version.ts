import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

async function main() {
  const pkg = require('../package.json')
  const cli = require('../../psecrets-cli/package.json')
  const updated = { ...pkg, version: cli.version }
  try {
    await fs.writeFile(
      path.resolve('package.json'),
      JSON.stringify(updated, null, 2),
      'utf-8'
    )
  } catch (cause) {
    throw new Error(`Failed to update package.json`, { cause })
  }
}

main()

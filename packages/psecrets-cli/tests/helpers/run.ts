import { resolve } from 'node:path'
import { spawn } from 'node:child_process'
import { LOG_LEVEL } from '../../src/config.js'

const cli = resolve(process.cwd(), 'bin/cli.js')

export async function run(args: string[], debug: boolean = false) {
  if (debug) {
    process.env.PSECRETS_LOG_LEVEL = LOG_LEVEL.DEBUG
  }
  const spawned = spawn(cli, args, {})
  const output = await new Promise<string>((resolve, reject) => {
    let stdout = ''
    let stderr = ''
    spawned.stdout?.on('data', (data) => {
      stdout += data
    })
    spawned.stderr?.on('data', (data) => {
      stderr += data
    })
    spawned.on('close', (code) => {
      if (code === 0) {
        resolve(stdout)
      } else {
        reject(new Error(stderr, { code }))
      }
    })
  })
  return output.trim()
}

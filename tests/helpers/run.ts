import { resolve } from 'node:path'
import { spawn } from 'node:child_process'
import { LOG_LEVEL } from '@/cli/support/log-level.js'

const cli = resolve(process.cwd(), 'bin/cli.js')

export async function run(args: string[], debug: boolean = false) {
  if (debug) {
    process.env.PSECRETS_LOG_LEVEL = LOG_LEVEL.DEBUG
  }
  const spawned = spawn(cli, args, {})
  const result = await new Promise<string>((resolve, reject) => {
    let output = ''
    spawned.stdout?.on('data', (data) => {
      output += data
    })
    spawned.stderr?.on('data', (data) => {
      output += data
    })
    spawned.on('close', (code) => {
      if (code === 0) {
        resolve(output)
      } else {
        reject(new Error(output))
      }
    })
  })
  return result.trim()
}

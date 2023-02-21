import * as fs from 'node:fs'
import * as path from 'node:path'
import * as dotenv from 'dotenv'
import { expand } from 'dotenv-expand'

/**
 * Load env, heavily inspired by Vite's `loadEnv` function
 * @todo
 */
export function loadEnv(
  mode: string,
  envDir: string = process.cwd(),
  prefixes: string[] = ['PUBLIC_', 'SECRET_']
) {
  const env: Record<string, string> = {}
  /**
   * Dotenv files to load. note we do not load `.env.local` here
   */
  const envFiles = ['.env', `.env.${mode}`]

  for (const file of envFiles) {
    const envFile = path.resolve(envDir, file)
    if (!fs.existsSync(envFile)) {
      continue
    }
    const parsed = dotenv.parse(fs.readFileSync(envFile))

    // support referencing other variables
    try {
      expand({ parsed, ignoreProcessEnv: true })
    } catch (cause: any) {
      // from https://github.com/vitejs/vite/blob/main/packages/vite/src/node/env.ts#L53-L60
      // custom error handling until https://github.com/motdotla/dotenv-expand/issues/65 is fixed upstream
      // check for message "TypeError: Cannot read properties of undefined (reading 'split')"
      if (cause.message.includes('split')) {
        throw new Error(
          'dotenv-expand failed to expand env vars. Maybe you need to escape `$`?'
        )
      }
    }

    for (const key in parsed) {
      if (prefixes.some((prefix) => key.startsWith(prefix))) {
        env[key] = parsed[key]
      }
    }

    // from: https://github.com/vitejs/vite/blob/main/packages/vite/src/node/env.ts#L71-L77
    // check if there are actual env variables starting with prefixes
    // these are typically provided inline and should be prioritized
    for (const key in process.env) {
      if (prefixes.some((prefix) => key.startsWith(prefix))) {
        env[key] = process.env[key] as string
      }
    }

    return env
  }
}

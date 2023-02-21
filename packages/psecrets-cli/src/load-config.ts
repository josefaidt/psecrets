import { loadEnv } from 'psecrets-core'
import { defineConfig } from './config.js'

/**
 * Load the PSECRETS_* environment variables for config
 * @param [dir=process.cwd()] The directory to load the config from
 */
export function loadConfig(dir?: string) {
  const envDir = dir || process.cwd()
  const env = loadEnv('local', envDir, ['PSECRETS_'])
  const config = defineConfig(env)
  return config
}

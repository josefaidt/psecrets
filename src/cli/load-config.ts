import { loadDotenv } from '@/core/load-dotenv.js'
import { defineConfig } from './config.js'

/**
 * Load the PSECRETS_* environment variables for config
 * @param [dir=process.cwd()] The directory to load the config from
 */
export function loadConfig(dir: string = process.cwd()) {
  const env = loadDotenv('local', dir, ['PSECRETS_'])
  const config = defineConfig(env)
  return config
}

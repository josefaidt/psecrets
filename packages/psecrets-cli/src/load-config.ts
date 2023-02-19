import { loadEnv } from 'psecrets-core'
import { Config, setLogLevel } from './config.js'

/**
 * Load the PSECRETS_* environment variables for config
 * @param [dir=process.cwd()] The directory to load the config from
 */
export function loadConfig(dir?: string) {
  const envDir = dir || process.cwd()
  const env = loadEnv('local', envDir, ['PSECRETS_'])
  const config = Config.safeParse(env)
  if (!config.success) {
    throw new Error(`Invalid config: ${config.error.message}`, {
      cause: config.error,
    })
  }
  setLogLevel(config.data.PSECRETS_LOG_LEVEL)
  return config.data
}

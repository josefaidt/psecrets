import { z } from 'zod'
import { PSECRETS_LOG_LEVEL, setLogLevel } from './support/log-level.js'

export const UserConfig = z.object({
  PSECRETS_LOG_LEVEL: PSECRETS_LOG_LEVEL.optional(),
})
export type UserConfig = z.infer<typeof UserConfig>

export const ResolvedConfig = z.object({
  PSECRETS_LOG_LEVEL: PSECRETS_LOG_LEVEL,
})
export type ResolvedConfig = z.infer<typeof ResolvedConfig>

export function defineConfig(config: UserConfig) {
  // console.debug('[config] received config', config)
  const parsed = UserConfig.parse(config)
  // console.debug('[config] parsed config', config)
  const resolved = ResolvedConfig.parse(parsed)
  // console.debug('[config] resolved config', config)

  /* config setters */
  setLogLevel(resolved.PSECRETS_LOG_LEVEL)
  /* end config setters */

  return resolved
}

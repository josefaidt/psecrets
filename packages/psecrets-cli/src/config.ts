import { z } from 'zod'

export const LOG_LEVEL = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
} as const

const LOG_LEVEL_VALUES = Object.values(LOG_LEVEL)

export const Config = z.object({
  PSECRETS_LOG_LEVEL: z
    .enum([LOG_LEVEL_VALUES[0], ...LOG_LEVEL_VALUES.slice(1)])
    .default(LOG_LEVEL.WARN),
})

export function setLogLevel(level: keyof typeof LOG_LEVEL) {
  process.env.PSECRETS_LOG_LEVEL = level
  switch (level) {
    case LOG_LEVEL.DEBUG:
      console.debug = console.log
      break
    case LOG_LEVEL.INFO:
      console.debug = () => {}
      break
    case LOG_LEVEL.WARN:
      console.debug = () => {}
      console.info = () => {}
      break
    case LOG_LEVEL.ERROR:
      console.debug = () => {}
      console.info = () => {}
      console.warn = () => {}
      break
    default:
      throw new Error(`Invalid log level: ${level}`)
  }
}

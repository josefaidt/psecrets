import { z } from 'zod'

export const LOG_LEVEL = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
} as const

const LOG_LEVEL_VALUES = Object.values(LOG_LEVEL)
export const PSECRETS_LOG_LEVEL = z
  .enum([LOG_LEVEL_VALUES[0], ...LOG_LEVEL_VALUES.slice(1)])
  .describe('The log level to use')
  .default(LOG_LEVEL.WARN)
export type PSECRETS_LOG_LEVEL = z.infer<typeof PSECRETS_LOG_LEVEL>

export function setLogLevel(level?: keyof typeof LOG_LEVEL) {
  let parsed_level = PSECRETS_LOG_LEVEL.parse(level)
  if (process.env.PSECRETS_LOG_LEVEL) {
    parsed_level = PSECRETS_LOG_LEVEL.parse(process.env.PSECRETS_LOG_LEVEL, {
      errorMap: () =>
        new Error(
          `Invalid PSECRETS_LOG_LEVEL, must be one of ${LOG_LEVEL_VALUES.join(
            ', '
          )}`
        ),
    })
  } else {
    process.env.PSECRETS_LOG_LEVEL = parsed_level
  }
  switch (parsed_level) {
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

import { createOption } from '@commander-js/extra-typings'
import { z } from 'zod'
import { handleOptionSchemaValidation } from '../support/handle-option-schema-validation.js'

const DEFAULT_VALUE = 'development'
export const env_schema = z
  .string()
  .min(1)
  .describe('project environment')
  .default(DEFAULT_VALUE)

/**
 * Project Environment option
 */
export const option = createOption(
  '-e, --env <environment-name>',
  'project environment'
)
  .default(DEFAULT_VALUE)
  .argParser((value, previous) =>
    handleOptionSchemaValidation(env_schema, value ?? previous)
  )

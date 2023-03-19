import { createOption } from '@commander-js/extra-typings'
import { z } from 'zod'
import { handleOptionSchemaValidation } from '../support/handle-option-schema-validation.js'

const DEFAULT_VALUE = '(read from package.json)'
export const env_schema = z.string().min(1).describe('project name')

/**
 * Project Name option
 */
export const option = createOption(
  '-n, --name <project-name>',
  'project name (read from package.json by default)'
).argParser((value, previous) =>
  handleOptionSchemaValidation(env_schema, value)
)

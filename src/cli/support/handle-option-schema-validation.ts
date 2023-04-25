import { z } from 'zod'
import { InvalidOptionArgumentError } from '@commander-js/extra-typings'

/**
 * Handle option schema validation
 * @param schema Commander option schema
 * @param value Value to parse
 */
export function handleOptionSchemaValidation(schema: z.Schema, value: unknown) {
  try {
    return schema.parse(value)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new InvalidOptionArgumentError(error.issues[0].message)
    }
    throw new InvalidOptionArgumentError(
      `Invalid value for option ${schema.description}`
    )
  }
}

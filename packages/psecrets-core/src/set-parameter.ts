import { PutParameterCommand } from '@aws-sdk/client-ssm'
import { client } from './ssm-client.js'
import { z } from 'zod'

const optionsSchema = z.object({
  type: z.enum(['SecureString', 'String']).optional().default('String'),
})

type SetParameterOptions = z.infer<typeof optionsSchema>

/**
 * Set parameter from AWS SSM Parameter Store
 */
export async function setParameter(
  key: string,
  value: string,
  options?: SetParameterOptions
) {
  const { type } = optionsSchema.parse(options ?? {})
  const command = new PutParameterCommand({
    Name: key,
    Value: value,
    Type: type,
    Overwrite: true,
  })
  try {
    await client.send(command)
  } catch (cause) {
    throw new Error(`Unable to set parameter ${key}`, { cause })
  }
}

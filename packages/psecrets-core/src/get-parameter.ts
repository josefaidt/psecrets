import { GetParameterCommand, ParameterNotFound } from '@aws-sdk/client-ssm'
import { z } from 'zod'
import { client } from './ssm-client.js'

const options_schema = z.object({
  /**
   * Get full JSON representation of the parameter
   */
  json: z.boolean().optional().default(false),
})

/**
 * Get parameter from AWS SSM Parameter Store
 */
export async function getParameter(
  key: string,
  options?: z.infer<typeof options_schema>
) {
  const parsed_options = options_schema.parse(options || {})
  const command = new GetParameterCommand({
    Name: key,
    WithDecryption: true,
  })
  try {
    const { Parameter } = await client.send(command)
    if (parsed_options.json) {
      return Parameter
    }
    return Parameter?.Value
  } catch (cause) {
    if (cause instanceof ParameterNotFound) {
      return undefined
    }
    throw new Error(`Unable to get parameter ${key}`, { cause })
  }
}

import { GetParameterCommand, ParameterNotFound } from '@aws-sdk/client-ssm'
import { client } from './ssm-client.js'

/**
 * Get parameter from AWS SSM Parameter Store
 */
export async function getParameter(key: string) {
  const command = new GetParameterCommand({
    Name: key,
    WithDecryption: true,
  })
  try {
    const { Parameter } = await client.send(command)
    return Parameter?.Value
  } catch (cause) {
    if (cause instanceof ParameterNotFound) {
      return undefined
    }
    throw new Error(`Unable to get parameter ${key}`, { cause })
  }
}

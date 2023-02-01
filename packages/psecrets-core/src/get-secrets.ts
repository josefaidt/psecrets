import {
  GetParametersByPathCommand,
  ParameterNotFound,
} from '@aws-sdk/client-ssm'
import { client } from './ssm-client.js'
import { createSecretKeyPrefix } from './support.js'
import type { Project } from 'project'

/**
 * Get all secrets for a project
 */
export async function getSecrets(
  project: Project
): Promise<Record<string, string>> {
  const prefix = createSecretKeyPrefix(project) + '/'
  const command = new GetParametersByPathCommand({
    Path: prefix,
    WithDecryption: true,
  })
  try {
    const { Parameters } = await client.send(command)
    const parameters = Parameters?.map((parameter) => {
      const key = parameter.Name?.replace(prefix, '')
      if (!key) {
        throw new Error('No key found')
      }
      return [key, parameter.Value || '']
    })
    if (!parameters) {
      throw new Error('No parameters found')
    }
    return Object.fromEntries(parameters)
  } catch (cause) {
    // if (error instanceof ParameterNotFound) {
    //   console.warn('No secrets found')
    //   return []
    // }
    throw new Error('Unable to get secrets', { cause })
  }
}

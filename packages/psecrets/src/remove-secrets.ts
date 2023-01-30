import { DeleteParametersCommand } from '@aws-sdk/client-ssm'
import { client } from './ssm-client.js'
import { createSecretKey } from './support.js'
import type { Project } from 'project'

/**
 * Remove multiple project secrets
 */
export async function removeSecrets(
  project: Project,
  keys: string[]
): Promise<void> {
  const Names = keys.map((key) => createSecretKey(project, key))
  const command = new DeleteParametersCommand({ Names })
  try {
    await client.send(command)
  } catch (cause) {
    throw new Error(`Unable to remove secrets`, { cause })
  }
}

import { DeleteParameterCommand } from '@aws-sdk/client-ssm'
import { client } from './ssm-client.js'
import { createSecretKey } from './support.js'
import type { Project } from 'project'

/**
 * Remove a project's secret
 */
export async function removeSecret(
  project: Project,
  key: string
): Promise<void> {
  const Name = createSecretKey(project, key)
  const command = new DeleteParameterCommand({ Name })
  try {
    await client.send(command)
  } catch (cause) {
    throw new Error(`Unable to remove secret`, { cause })
  }
}

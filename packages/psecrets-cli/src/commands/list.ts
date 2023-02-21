import { EOL } from 'node:os'
import kleur from 'kleur'
import { getSecrets } from 'psecrets-core'
import { createCommand } from '../create-command.js'
import { createProject } from '../project.js'

export const command = createCommand('list')
  .alias('ls')
  .description('list secrets')
  .action(async (options, command) => {
    const project = await createProject(command.optsWithGlobals())
    const noSecretsFoundMessage = `No secrets found for ${project.name} and environment ${project.env}`
    let secrets: any[] = []
    try {
      secrets = Object.keys(await getSecrets(project))
    } catch (error) {
      console.error(kleur.red(noSecretsFoundMessage))
    }
    if (secrets.length) {
      console.log(secrets.join(EOL))
    } else {
      console.warn(kleur.yellow(noSecretsFoundMessage))
    }
  })

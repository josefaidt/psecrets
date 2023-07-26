import { EOL } from 'node:os'
import kleur from 'kleur'
import { getSecrets } from '@/core/get-secrets.js'
import { createProjectCommand } from '../create-project-command.js'
import { createProject } from '../create-project.js'

export const command = createProjectCommand('list')
  .alias('ls')
  .description('list secrets')
  .action(async (options, command) => {
    const project = await createProject({
      name: options.name,
      env: options.env,
    })
    const noSecretsFoundMessage = `No secrets found for project "${project.name}" and environment "${project.env}"`
    let secrets: any[] = []
    try {
      secrets = Object.keys(await getSecrets(project))
    } catch (error) {
      return console.error(kleur.red(noSecretsFoundMessage))
    }
    if (secrets.length) {
      console.log(secrets.join(EOL))
    } else {
      console.warn(kleur.yellow(noSecretsFoundMessage))
    }
  })

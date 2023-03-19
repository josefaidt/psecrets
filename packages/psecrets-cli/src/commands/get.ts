import kleur from 'kleur'
import { getSecret } from 'psecrets-core'
import { createProjectCommand } from '../create-project-command.js'
import { createProject } from '../project.js'

export const command = createProjectCommand('get')
  .description('get secrets')
  .argument('<secret-name>', 'Name of the secret')
  .action(async (name, options, command) => {
    const project = await createProject({
      env: options.env,
      name: options.name,
    })
    const value = await getSecret(project, name)
    if (!value) {
      console.error(kleur.red(`Secret "${name}" not found`))
    } else {
      console.log(value)
    }
  })

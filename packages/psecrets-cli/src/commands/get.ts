import kleur from 'kleur'
import { getSecret } from 'psecrets-core'
import { createCommand } from '../create-command.js'
import { project } from '../project.js'

export const command = createCommand('get')
  .description('get secrets')
  .argument('<name>', 'Name of the secret')
  .action(async (name) => {
    const value = await getSecret(project, name)
    if (!value) {
      console.error(kleur.red(`Secret ${name} not found`))
    } else {
      console.log(value)
    }
  })

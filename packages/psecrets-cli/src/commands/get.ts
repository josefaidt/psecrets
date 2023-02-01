import { createCommand } from 'commander'
import kleur from 'kleur'
import { getSecret } from 'psecrets-core'
import { project } from '../project.js'

export const command = createCommand('get')
  .description('Get secrets')
  .argument('<name>', 'Name of the secret')
  .action(async (name) => {
    const value = await getSecret(project, name)
    if (!value) {
      console.error(kleur.red(`Secret ${name} not found`))
    } else {
      console.log(value)
    }
  })

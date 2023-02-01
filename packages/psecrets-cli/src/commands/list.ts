import { EOL } from 'node:os'
import { createCommand } from 'commander'
import kleur from 'kleur'
import { getSecrets } from 'psecrets-core'
import { project } from '../project.js'

export const command = createCommand('list')
  .alias('ls')
  .description('List secrets')
  .action(async () => {
    let secrets: any[] = []
    try {
      secrets = Object.keys(await getSecrets(project))
    } catch (error) {
      console.error(kleur.red(`No secrets found for ${project.name}`))
    }
    if (secrets.length) {
      console.log(secrets.join(EOL))
    } else {
      console.warn(kleur.yellow(`No secrets found for ${project.name}`))
    }
  })

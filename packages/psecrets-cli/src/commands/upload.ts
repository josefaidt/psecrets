import kleur from 'kleur'
import { uploadSecrets } from 'psecrets-core'
import { createCommand } from '../create-command.js'
import { createProject } from '../project.js'

export const command = createCommand('upload')
  .description('upload secrets from a dotenv file')
  .action(async (options, command) => {
    const project = await createProject(command.optsWithGlobals())
    try {
      await uploadSecrets(project)
      console.log('Uploaded successfully')
    } catch (error) {
      console.error(kleur.red(`Unable to upload secrets`))
    }
  })

import kleur from 'kleur'
import { uploadSecrets } from '@/core/upload-secrets.js'
import { createProjectCommand } from '../create-project-command.js'
import { createProject } from '../project.js'

export const command = createProjectCommand('upload')
  .description('upload secrets from a dotenv file')
  .action(async (options, command) => {
    const project = await createProject({
      env: options.env,
      name: options.name,
    })
    try {
      await uploadSecrets(project)
      console.log('Uploaded successfully')
    } catch (error) {
      console.error(kleur.red(`Unable to upload secrets`))
    }
  })

import * as fs from 'node:fs/promises'
import {
  createSecretKey,
  getSecret,
  getSecrets,
  setSecret,
  setSecrets,
  downloadSecrets,
  uploadSecrets,
  removeSecret,
  removeSecrets,
} from '@/index.js'
import { parse } from 'dotenv'
import { createProject } from '@/support/Project.js'
import { env } from './env.sample.js'

const TEST_SECRET_NAME = 'TEST'
const TEST_SECRET_VALUE = 'test'
const project = createProject({
  name: 'e2e',
  env: 'test',
})
const key = createSecretKey(project, TEST_SECRET_NAME)

describe('psecrets usage workflow', () => {
  it('set-secret', async () => {
    await setSecret(project, TEST_SECRET_NAME, TEST_SECRET_VALUE)
  })

  it('set-secrets', async () => {
    await setSecrets(project, env)
  })

  it('get-secret', async () => {
    const secret = await getSecret(project, TEST_SECRET_NAME)
    expect(secret?.Value).toEqual(TEST_SECRET_VALUE)
  })

  it('upload-secrets', async () => {
    await uploadSecrets(project)
  })

  it('get-secrets', async () => {
    const secrets = await getSecrets(project)
    expect(secrets).toEqual(env)
  })

  it('download-secrets', async () => {
    const filename = '.env.test'
    await downloadSecrets(project, {
      filename,
    })
    const file_contents = await fs.readFile(filename, 'utf8')
    const parsed = parse(file_contents.toString())
    expect(parsed).toEqual(env)

    async function cleanup() {
      await fs.unlink(filename)
    }
    await cleanup()
  })

  it('removes a secret', async () => {
    await removeSecret(project, TEST_SECRET_NAME)
    const secret = await getSecret(project, TEST_SECRET_NAME)
    expect(secret).toEqual(undefined)
  })

  it('removes multiple secrets', async () => {
    await removeSecrets(project, Object.keys(env))
    const secrets = await getSecrets(project)
    expect(secrets).toEqual({})
  })
})

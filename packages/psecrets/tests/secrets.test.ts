import * as fs from 'node:fs/promises'
import {
  getSecret,
  getSecrets,
  setSecret,
  downloadSecrets,
  uploadSecrets,
  removeSecret,
  removeSecrets,
} from '../src/index.js'
import { parse } from 'dotenv'
import { createProject } from 'project'
import { createSecretKey } from '../src/index.js'
import { env, projectName } from './env.sample.js'

const TEST_SECRET_NAME = 'TEST'
const TEST_SECRET_VALUE = 'test'
const project = createProject({
  name: 'e2e',
  env: 'test',
})
const key = createSecretKey(project, TEST_SECRET_NAME)

describe('secrets usage workflow', () => {
  beforeAll(() => {
    vi.mock('vite', async (loadOriginal) => {
      const original = (await loadOriginal()) as Record<string, unknown>
      return { ...original, loadEnv: () => env }
    })
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('set-secret', async () => {
    await setSecret(project, key, TEST_SECRET_VALUE)
  })

  it('get-secret', async () => {
    const secret = await getSecret(project, key)
    expect(secret).toEqual(TEST_SECRET_VALUE)
  })

  it('upload-secrets', async () => {
    await uploadSecrets(projectName)
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
    await removeSecret(project, key)
    const secret = await getSecret(project, key)
    expect(secret).toEqual(undefined)
  })

  it('removes multiple secrets', async () => {
    await removeSecrets(project, Object.keys(env))
    const secrets = await getSecrets(project)
    expect(secrets).toEqual({})
  })
})

import { env } from '../env.sample.js'

export function createViteLoadEnvMock() {
  vi.mock('vite', async (loadOriginal) => {
    const original = (await loadOriginal()) as Record<string, unknown>
    return { ...original, loadEnv: () => env }
  })
}

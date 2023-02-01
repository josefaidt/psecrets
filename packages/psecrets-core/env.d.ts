/// <reference types="vitest/importMeta" />
/// <reference types="vitest/globals" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_REGION: string
    }
  }
}

export {}

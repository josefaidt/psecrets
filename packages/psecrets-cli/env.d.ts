/// <reference types="vitest/globals" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_REGION: string
      PACKAGE_VERSION: string
    }
  }
}

export {}

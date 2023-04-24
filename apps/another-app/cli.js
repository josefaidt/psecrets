#!/usr/bin/env node
import { createCLI, createCommand } from 'another-cli-framework'
import { z } from 'zod'

const cli = createCLI('another-app').description('Another app').version('0.0.1')

const hello = createCommand('hello')
  .description('say hello')
  .argument('name', 'name to say hello to', z.string())
  .handle(({ args }) => {
    console.log({ hello: args.name })
  })

cli.addCommand(hello)
cli.parse()

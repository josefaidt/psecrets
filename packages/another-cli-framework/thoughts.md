# Thoughts

do you like the idea of a command builder or a definition?

this feels composable

```ts
const builder = createCommand('hello')
  .description('hello world')
  .argument('[name]', 'name to say hello to', 'world')
  // somehow get typesafety here
  .handler((arguments, options) => {
    const { name } = arguments
    console.log(name)
  })
```

whereas this is configurable

```ts
const definition = createCommand({
  name: 'hello',
  description: 'hello world',
  arguments: [
    createArgument({
      name: 'name',
      defaultValue: 'world',
      description: 'name to say hello to',
      isOptional: true,
    })
  ],
  // somehow get typesafety here
  handler: ((arguments, options)) => {
    const { name } = arguments
    console.log(name)
  }
})
```

or maybe even?

```ts
import { createCommand } from 'another-cli-framework'

const command = createCommand('hello')
  .description('hello world')
  .createArgument((a) => {
    // blend in zod, where zod is also used to validate the command structure
    return a.string('name', 'name to say hello to').optional().default('world')
  })
  // another way...
  .argument('name', 'name to say hello to', a =>
    .string()
    .optional()
    .default('world')
  )
  .handler({ arguments, options }) => {
    const { name } = arguments
    console.log(name)
  }
```

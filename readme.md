# psecrets

utility CLI for AWS SSM Parameter Store

```
Usage: psecrets [options] [command]

Manage secrets from AWS SSM Parameter Store

Options:
  -h, --help                  display help for command

Commands:
  get <name>                  Get secrets
  set <name> [value]          Set secrets
  remove|rm [options] <name>  remove secrets
  list                        List secrets
  download [file]             download secrets into a dotenv file
  upload                      upload secrets from a dotenv file
  help [command]              display help for command
```

const shell = require('shelljs')
const cli = require('commander')

const network = 'foncia_technical_test_default'
const databaseHost = 'db'

const exec = command =>
  console.log('Execute:', command) ||
  new Promise((resolve, reject) =>
    shell.exec(
      command,
      (code, stdout, stderr) => (code !== 0 ? reject(stderr) : resolve(stdout))
    )
  )

cli.version('1.0.0', '-v, --version')

const restoreCommand = `mongorestore -d myFonciaBdd /backup --host ${databaseHost}:27017`

cli
  .command('restore')
  .description('Restore database')
  .action(() => exec(`docker run --rm --network ${network} -v \`pwd\`/myFonciaBdd:/backup mongo bash -c '${restoreCommand}'`))

cli
  .command('reset')
  .description('Reset database')
  .action(() => shell.rm('-rf', './data/db/*'))

cli.on('command:*', args => {
  console.error('Unknown command:', args.join(' '))
  console.log('See --help for a list of available commands.')
})
cli.parse(process.argv)

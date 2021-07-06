import chalk from 'chalk'

export const wait = async (cb: () => Promise<boolean>): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      process.stdout.write(`\nTimeout ${chalk.red('✕')}\n`)

      reject()
    }, 100 * 1000)
    const check = async () => {
      process.stdout.write('\r')
      if (await cb()) {
        process.stdout.write(`\nDone ${chalk.green('✓')}\n`)
        clearTimeout(timeoutId)
        clearInterval(intervalId)
        resolve()
      }
    }
    const intervalId = setInterval(check, 3000)
    check()
  })
}

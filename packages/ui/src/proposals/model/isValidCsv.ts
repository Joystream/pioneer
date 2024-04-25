export const CSV_PATTERN = /^([^,:;]+),([^,:;]+)(\n[^,:;]+,[^,:;]+)*(\n)?$/

export const isValidCSV = (value: string) => {
  if (!CSV_PATTERN.test(value)) return false

  const pairs = value.split('\n')

  for (const pair of pairs) {
    const [, amount] = pair.split(',')
    if (!Number(amount)) return false
  }

  return true
}

import BN from 'bn.js'

const NUMBER_SEPARATOR_REG_EXP = /\B(?=(\d{3})+(?!\d))/g

export const formatTokenValue = (value: BN | number | undefined) => {
  return new BN(value || 0).toString().replace(NUMBER_SEPARATOR_REG_EXP, ',')
}

export function shortenAddress(address: string, length = 18) {
  return length >= address.length
    ? address
    : address.substring(0, Math.ceil(length / 2)) +
        '...' +
        address.substring(address.length - Math.floor(length / 2), address.length)
}

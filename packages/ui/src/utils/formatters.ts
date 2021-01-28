import BN from 'bn.js'

const NUMBER_SEPARATOR_REG_EXP = /\B(?=(\d{3})+(?!\d))/g

export const formatTokenValue = (value: BN | number | undefined) => {
  return new BN(value || 0).toString().replace(NUMBER_SEPARATOR_REG_EXP, ',')
}

import { Address } from '@/common/types'

export interface RebagModalCall {
  modal: 'Rebag'
  data: {
    validatorAddress: Address
  }
}

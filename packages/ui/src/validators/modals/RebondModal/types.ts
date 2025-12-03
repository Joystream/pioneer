import { Address } from '@/common/types'

export interface RebondModalCall {
  modal: 'Rebond'
  data: {
    validatorAddress: Address
  }
}

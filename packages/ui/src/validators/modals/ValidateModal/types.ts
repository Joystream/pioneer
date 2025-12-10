import { Address } from '@/common/types'

export interface ValidateModalCall {
  modal: 'Validate'
  data: {
    validatorAddress: Address
  }
}

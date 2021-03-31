import { Account } from '../../common/types'
import { TransferIconName } from '../../components/icons/TransferIcons'
import { ModalWithDataCall } from '../../providers/modal/types'

export type TransferModalCall = ModalWithDataCall<
  'TransferTokens',
  { from?: Account; to?: Account; iconName: TransferIconName }
>

import { ApiRx } from '@polkadot/api'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import BN from 'bn.js'
import React, { useMemo } from 'react'
import { Account, BaseMember } from '../../common/types'
import { SelectedAccount } from '../../components/account/SelectAccount'
import { Button } from '../../components/buttons'
import { Label } from '../../components/forms'
import { Help } from '../../components/Help'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { Text, TokenValue } from '../../components/typography'
import { useApi } from '../../hooks/useApi'
import { useSignAndSendTransaction } from '../../hooks/useSignAndSendTransaction'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from '../common'
import { WaitModal } from '../WaitModal'
import { WithNullableValues, UpdateMemberForm } from './types'

interface SignProps {
  onClose: () => void
  transactionParams: WithNullableValues<UpdateMemberForm>
  onDone: (result: boolean, fee: BN) => void
  member: BaseMember
  signer: Account
}

const hasEdits = (object: Record<string, any>, fields: string[]) => {
  return fields.some((field) => !!object[field])
}

function createBatch(
  transactionParams: WithNullableValues<UpdateMemberForm>,
  api: ApiRx | undefined,
  member: BaseMember
) {
  const hasProfileEdits = hasEdits(transactionParams, ['about', 'handle', 'avatarURI', 'name'])
  const hasAccountsEdits = hasEdits(transactionParams, ['rootAccount', 'controllerAccount'])

  const transactions: SubmittableExtrinsic<'rxjs'>[] = []

  if (!api || !(hasProfileEdits || hasAccountsEdits)) {
    return
  }
  if (hasProfileEdits) {
    const updateProfile = api.tx.members.updateProfile(
      member.id,
      transactionParams.name || null,
      transactionParams.handle || null,
      transactionParams.avatarURI || null,
      transactionParams.about || null
    )
    transactions.push(updateProfile)
  }

  if (hasAccountsEdits) {
    const updateAccounts = api.tx.members.updateAccounts(
      member.id,
      transactionParams.rootAccount?.address || null,
      transactionParams.controllerAccount?.address || null
    )
    transactions.push(updateAccounts)
  }

  return api.tx.utility.batch(transactions)
}

export const SignUpdateMembershipModal = ({ onClose, transactionParams, member, signer, onDone }: SignProps) => {
  const { api } = useApi()
  const updateProfileTransaction = useMemo(() => createBatch(transactionParams, api, member), [member.id])

  const { paymentInfo, send, status } = useSignAndSendTransaction({
    transaction: updateProfileTransaction,
    from: signer,
    onDone,
  })

  if (status === 'READY') {
    return (
      <Modal modalSize="m" modalHeight="s" onClose={onClose}>
        <ModalHeader onClick={onClose} title="Authorize transaction" />
        <ModalBody>
          <Text>You intend to update your membership.</Text>
          <Text>
            Fees of <TokenValue value={paymentInfo?.partialFee.toBn()} /> will be applied to the transaction.
          </Text>
          <Row>
            <Label>Sending from account</Label>
            <SelectedAccount account={signer} />
          </Row>
        </ModalBody>
        <ModalFooter>
          <BalanceInfoNarrow>
            <InfoTitle>Transaction fee:</InfoTitle>
            <InfoValue>
              <TokenValue value={paymentInfo?.partialFee.toBn()} />
            </InfoValue>
            <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
          </BalanceInfoNarrow>
          <Button size="medium" onClick={send} disabled={status !== 'READY'}>
            Sign and update a member
          </Button>
        </ModalFooter>
      </Modal>
    )
  }

  if (status === 'EXTENSION') {
    return (
      <WaitModal
        onClose={onClose}
        title="Waiting for the extension"
        description="Please, sign the transaction using external signer app."
      />
    )
  }

  if (status === 'PENDING') {
    return (
      <WaitModal
        onClose={onClose}
        title="Pending transaction"
        description="We are waiting for your transaction to be mined. It can takes Lorem ipsum deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim."
      />
    )
  }

  return null
}

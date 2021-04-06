import React from 'react'

import { Modal, ModalBody, ModalHeader } from '../../components/Modal'
import { TextMedium, TokenValue } from '../../components/typography'
import { useApi } from '../../hooks/useApi'
import { useObservable } from '../../hooks/useObservable'

interface Props {
  onClose: () => void
}

export const WorkingGroupBudgetModal = ({ onClose }: Props) => {
  const { api } = useApi()
  const workingGroupBudget = useObservable(api?.query.membershipWorkingGroup.budget(), [])
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Insufficient Working Group budget" />
      <ModalBody>
        <TextMedium margin="s">
          Unfortunately, the Membership Working group budget is Lorem ipsum dolor sit enim. Please try again later.
        </TextMedium>
        <TextMedium>
          Current budget: <TokenValue value={workingGroupBudget?.toBn()} />
        </TextMedium>
        <TextMedium>
          Working Group Dept: <TokenValue value={membershipPrice?.toBn()} />
        </TextMedium>
      </ModalBody>
    </Modal>
  )
}

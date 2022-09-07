import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { Modal, ModalBody, ModalHeader } from '@/common/components/Modal'
import { TooltipExternalLink } from '@/common/components/Tooltip'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'

interface Props {
  onClose: () => void
}

export const InviteMemberRequirementsModal = ({ onClose }: Props) => {
  const { api } = useApi()
  const workingGroupBudget = useFirstObservableValue(
    () => api?.query.membershipWorkingGroup.budget(),
    [api?.isConnected]
  )
  const membershipPrice = useFirstObservableValue(() => api?.query.members.membershipPrice(), [api?.isConnected])

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Insufficient Working Group budget" />
      <ModalBody>
        <TextMedium margin="s">
          Memberships Working Group budget has to be sufficient to cover new member invitations. Speak with the
          Membership Working Group Lead on Discord to find out about the upcoming "Update Working Group Budget" and "Set
          Membership Lead Invitation Quota" proposals.
          <TooltipExternalLink href="https://discord.gg/DE9UN3YpRP" target="_blank">
            <TextMedium>Go to Discord</TextMedium> <LinkSymbol />
          </TooltipExternalLink>
        </TextMedium>
        <TextMedium>
          Current budget: <TokenValue value={workingGroupBudget?.toBn()} />
        </TextMedium>
        <TextMedium>
          Working Group Debt: <TokenValue value={membershipPrice?.toBn()} />
        </TextMedium>
      </ModalBody>
    </Modal>
  )
}

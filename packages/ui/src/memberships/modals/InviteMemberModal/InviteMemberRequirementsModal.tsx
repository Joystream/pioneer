import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { Modal, ModalBody, ModalHeader } from '@/common/components/Modal'
import { TooltipExternalLink } from '@/common/components/Tooltip'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useObservable } from '@/common/hooks/useObservable'

interface Props {
  onClose: () => void
}

export const InviteMemberRequirementsModal = ({ onClose }: Props) => {
  const { api } = useApi()
  const workingGroupBudget = useObservable(api?.query.membershipWorkingGroup.budget(), [api])
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [api])

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Insufficient Working Group budget" />
      <ModalBody>
        <TextMedium margin="s">
          Memberships Working Group budget has to be sufficient to cover new member invitations. Speak with the
          Membership Working Group Lead on Discord to find out about the upcoming "Update Working Group Budget" and "Set
          Membership Lead Invitation Quota" proposals.
          <TooltipExternalLink
            href="https://joystream.gitbook.io/joystream-handbook/subsystems/membership#working-group"
            target="_blank"
          >
            <TextMedium>Link</TextMedium> <LinkSymbol />
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

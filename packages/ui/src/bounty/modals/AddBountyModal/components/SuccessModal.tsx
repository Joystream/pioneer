import React, { useCallback } from 'react'
import { generatePath } from 'react-router'
import { useHistory } from 'react-router-dom'

import { BountyRoutes } from '@/bounty/constants'
import { ButtonGhost } from '@/common/components/buttons'
import { SuccessSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'

interface Props {
  onClose: () => void
  bountyId: number
}

export const SuccessModal = ({ onClose, bountyId }: Props) => {
  const history = useHistory()

  const goToBounty = useCallback(() => {
    history.push(generatePath(BountyRoutes.bounty, { id: bountyId }))
    onClose()
  }, [bountyId, onClose])

  return (
    <Modal modalSize="s" modalHeight="s" onClose={onClose}>
      <ModalHeader title="Success" onClick={onClose} icon={<SuccessSymbol />} />
      <ModalBody>
        <Info>
          <TextMedium>You have just successfully created new bounty!</TextMedium>
        </Info>
      </ModalBody>
      <ModalFooter>
        <ButtonGhost disabled={!bountyId} onClick={goToBounty} size="medium">
          See my Bounty
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}

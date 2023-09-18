import React from 'react'
import { useHistory } from 'react-router-dom'

import { ButtonGhost } from '@/common/components/buttons'
import { SuccessSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { GroupIdToGroupParam } from '@/working-groups/constants'
import { GroupIdName } from '@/working-groups/types'

interface SuccessModalProps {
  onClose: () => void
  groupId: GroupIdName
}

export const SuccessModal = ({ onClose, groupId }: SuccessModalProps) => {
  const history = useHistory()

  const redirect = () => {
    onClose()
    history.push(`/working-groups/${GroupIdToGroupParam[groupId].toLowerCase()}`)
  }

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessSymbol />} />
      <ModalBody>
        <Info>
          <TextMedium light>You have just successfully created an opening.</TextMedium>
        </Info>
      </ModalBody>
      <ModalFooter>
        <ButtonGhost onClick={redirect} size="medium">
          Back to Working Group
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}

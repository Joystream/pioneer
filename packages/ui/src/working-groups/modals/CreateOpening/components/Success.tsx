import React from 'react'
import { generatePath, useHistory } from 'react-router-dom'

import { ButtonGhost } from '@/common/components/buttons'
import { SuccessSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { nameMapping } from '@/common/helpers'
import { WorkingGroupsRoutes } from '@/working-groups/constants'
import { groupNameToURLParam } from '@/working-groups/model/workingGroupName'

interface SuccessModalProps {
  onClose: () => void
  groupName: string
  openingRuntimeId: number
}

export const SuccessModal = ({ onClose, groupName, openingRuntimeId }: SuccessModalProps) => {
  const history = useHistory()

  const openingId = `${groupNameToURLParam(nameMapping(groupName))}-${openingRuntimeId}`
  const redirect = () => {
    onClose()
    history.push(generatePath(WorkingGroupsRoutes.openingById, { id: openingId }))
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
          See my Opening
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}

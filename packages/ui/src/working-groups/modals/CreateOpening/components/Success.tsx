import React from 'react'
import { generatePath } from 'react-router-dom'

import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
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
  const openingId = `${groupNameToURLParam(nameMapping(groupName))}${openingRuntimeId}`

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessSymbol />} />
      <ModalBody>
        <Info>
          <TextMedium light>You have just successfully created an opening.</TextMedium>
        </Info>
      </ModalBody>
      <ModalFooter>
        <LinkButtonGhost
          size="medium"
          to={generatePath(WorkingGroupsRoutes.openingById, { id: openingId })}
          onClick={onClose}
        >
          See my Opening
        </LinkButtonGhost>
      </ModalFooter>
    </Modal>
  )
}

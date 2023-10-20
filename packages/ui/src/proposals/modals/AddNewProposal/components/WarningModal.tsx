import React, { useState } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { Checkbox } from '@/common/components/forms'
import { Arrow } from '@/common/components/icons'
import { AlertSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useModal } from '@/common/hooks/useModal'

interface AddNewProposalWarningModalProps {
  onNext: () => void
}

export const WarningModal = ({ onNext }: AddNewProposalWarningModalProps) => {
  const { hideModal } = useModal()
  const [isAwareChecked, setAwareChecked] = useState(false)
  const [isHidingCaution, setHidingCaution] = useLocalStorage<boolean>('proposalCaution')
  const closeModal = () => {
    hideModal()
    setHidingCaution(false)
  }
  return (
    <Modal modalSize="m" modalHeight="s" onClose={hideModal}>
      <ModalHeader onClick={closeModal} title="Caution" icon={<AlertSymbol />} />
      <ModalBody>
        <TextMedium margin="s">
          A proposal is a motion to change the state or policy of the system in some way. While we encourage you to make
          proposals that benefit the network, there are certain risks associated with proposals.
        </TextMedium>
        <Info>
          <TextMedium margin="s">- proposals can get rejected by the council</TextMedium>
          <TextMedium margin="s">
            - a rejection fee will be withheld upon stake recovery from rejected proposals
          </TextMedium>
          <TextMedium margin="s">
            - you may get outright slashed, losing your entire stake. This applies only to some proposal types
          </TextMedium>
        </Info>
        <Checkbox id="aware-of-risks" onChange={setAwareChecked} isChecked={isAwareChecked}>
          I'm aware of the possible risks associated with creating a proposal.
        </Checkbox>
        <Checkbox id="do-not-show-again" onChange={setHidingCaution} isChecked={isHidingCaution}>
          Do not show this message again.
        </Checkbox>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary disabled={!isAwareChecked} onClick={onNext} size="medium">
          Create A Proposal
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

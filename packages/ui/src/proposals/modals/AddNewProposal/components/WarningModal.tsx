import React, { useState } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { Checkbox } from '@/common/components/forms'
import { Arrow } from '@/common/components/icons'
import { AlertSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'

interface AddNewProposalWarningModalProps {
  onNext: () => void
}

export const WarningModal = ({ onNext }: AddNewProposalWarningModalProps) => {
  const { hideModal } = useModal()
  const [isAwareChecked, setAwareChecked] = useState(false)

  return (
    <Modal modalSize="m" modalHeight="s" onClose={hideModal}>
      <ModalHeader onClick={hideModal} title="Caution" icon={<AlertSymbol />} />
      <ModalBody>
        <TextMedium margin="s">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </TextMedium>
        <Info
          content={
            <>
              <TextMedium margin="s">
                - you may get rejected amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
                officia consequat duis enim velit mollit
              </TextMedium>
              <TextMedium margin="s">- you may lose a rejection fee from any required stake.</TextMedium>
              <TextMedium margin="s">
                - you may get outright slashed on top of the rejection, depending on what type of proposal this is (not
                true for all proposal types), which means you will lose the entire stake put up.
              </TextMedium>
            </>
          }
        />
        <Checkbox id="aware-of-risks" onChange={setAwareChecked} isChecked={isAwareChecked}>
          I’m aware of the possible risks associated with creating a proposal.
        </Checkbox>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary disabled={!isAwareChecked} onClick={onNext} size="medium">
          I want to create a proposal anyway
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

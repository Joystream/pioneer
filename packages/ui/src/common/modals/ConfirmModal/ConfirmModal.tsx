import React from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'
import { Modal, ModalBody, ModalFooter } from '@/common/components/Modal'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { TextHuge, TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'

export const ConfirmModal = () => {
  const { hideModal, returnClosedModal } = useModal()

  return (
    <Modal modalSize="xs" onClose={() => undefined}>
      <StyledModalBody>
        <TextContainer gap={10}>
          <TextHuge bold value>
            Are you sure you want to close this modal?
          </TextHuge>
          <TextMedium>If you have made progress in the form, it will be lost.</TextMedium>
        </TextContainer>
      </StyledModalBody>
      <ModalFooter>
        <ColumnGapBlock>
          <ButtonGhost size="medium" onClick={returnClosedModal}>
            Cancel
          </ButtonGhost>
          <ButtonPrimary size="medium" onClick={hideModal}>
            Close
          </ButtonPrimary>
        </ColumnGapBlock>
      </ModalFooter>
    </Modal>
  )
}

const TextContainer = styled(RowGapBlock)`
  text-align: center;
  padding: 20px 10%;
`

const StyledModalBody = styled(ModalBody)`
  background-color: #fff;
`

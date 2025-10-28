import { BN } from '@polkadot/util'
import React from 'react'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { SuccessIcon } from '@/common/components/icons'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/common/components/Modal'
import { TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface StakingSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: () => void
  stakedAmount: BN
  validatorCount: number
}

export const StakingSuccessModal = ({
  isOpen,
  onClose,
  onContinue,
  stakedAmount,
  validatorCount,
}: StakingSuccessModalProps) => {
  if (!isOpen) return null

  return (
    <StyledModal onClose={onClose} modalSize="m">
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      <ModalBody>
        <Content>
          <SuccessMessage>
            <div style={{ fontSize: '14px', lineHeight: '20px' }}>
              You have just successfully staked <TokenValue value={new BN(stakedAmount)} /> with{' '}
              <strong>{validatorCount} validators</strong>!
            </div>
          </SuccessMessage>
        </Content>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={onContinue}>
          Continue
        </ButtonPrimary>
      </ModalFooter>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  width: 720px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 16px;
  padding: 24px 0;
`

const SuccessMessage = styled.div`
  text-align: left;
  color: ${Colors.Black[600]};
`

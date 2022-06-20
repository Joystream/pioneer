import React from 'react'
import styled from 'styled-components'

import { Modal } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { capitalizeFirstLetter } from '@/common/helpers'

interface SelectWalletModalProps {
  availableWallets: string[]
  onWalletSelect: (wallet: string) => void
}

export const SelectWalletModal = ({ availableWallets, onWalletSelect }: SelectWalletModalProps) => {
  return (
    <Modal isDark onClose={() => undefined} modalSize="xs">
      <ModalContainer>
        <TextBig value>Select your wallet</TextBig>
        <Divider />
        <RowGapBlock gap={10}>
          {availableWallets.map((wallet) => (
            <WalletItem key={wallet} onClick={() => onWalletSelect(wallet)}>
              {capitalizeFirstLetter(wallet)}
            </WalletItem>
          ))}
        </RowGapBlock>
      </ModalContainer>
    </Modal>
  )
}

const ModalContainer = styled.div`
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  > *:first-child {
    align-self: center;
  }
`

const Divider = styled.div`
  background-color: ${Colors.Black[400]};
  height: 1px;
  width: 100%;
`

const WalletItem = styled.div`
  padding: 10px 20px;
  border: 1px solid ${Colors.Black[400]};
  user-select: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  :hover {
    border-color: ${Colors.LogoPurple};
    color: ${Colors.LogoPurple};
  }
`

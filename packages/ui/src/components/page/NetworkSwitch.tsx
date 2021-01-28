import React from 'react'
import styled from 'styled-components'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { Network } from '../../providers/api/provider'

export function NetworkSwitch() {
  const [network, setNetwork] = useLocalStorage<Network>('network')

  const switchNetwork = () => {
    if (network === 'DEV') {
      setNetwork('TESTNET')
    } else {
      setNetwork('DEV')
    }

    window.location.reload()
  }

  return (
    <ButtonForTransfer
      onClick={switchNetwork}
      title={`Switch to ${network === 'DEV' ? 'joystream testnet' : 'local dev'}`}
    >
      Network: {(network || 'TESTNET').toLowerCase()}
    </ButtonForTransfer>
  )
}

const ButtonForTransfer = styled.a`
  cursor: pointer;
  position: absolute;
  bottom: 36px;
  left: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

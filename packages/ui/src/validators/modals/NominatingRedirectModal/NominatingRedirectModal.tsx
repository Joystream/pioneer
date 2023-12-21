import React from 'react'

import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'
import { ArrowRightIcon } from '@/common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextBig, TextInlineBig } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'

import { NominatingRedirectModalCall } from './types'

export const NominatingRedirectModal = () => {
  const { hideModal } = useModal<NominatingRedirectModalCall>()
  const viewDetailedStats = () => {
    window.location.href = 'https://polkadot.js.org/apps/?rpc=wss://rpc.joystream.org:9944#/staking/targets'
  }
  const nominate = () => {
    window.location.href = 'https://polkadot.js.org/apps/?rpc=wss://rpc.joystream.org:9944#/staking/actions'
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title={'Nominate validator'} onClick={hideModal} />
      <ModalBody>
        <TextBig>
          Nomination functionality is still in the development but in the meantime you can nominate validators in{' '}
          <TextInlineBig bold>Polkadot.js app</TextInlineBig>. In order to do that you should click the “
          <TextInlineBig bold>+ Nominator</TextInlineBig>” button on the polkadot website.
        </TextBig>
      </ModalBody>
      <ModalFooter>
        <ButtonGhost size="medium" onClick={viewDetailedStats}>
          View detailed stats
        </ButtonGhost>
        <ButtonPrimary size="medium" onClick={nominate}>
          Norminate <ArrowRightIcon white />
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

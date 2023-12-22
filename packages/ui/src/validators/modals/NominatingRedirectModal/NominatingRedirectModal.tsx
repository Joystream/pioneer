import React from 'react'

import { LinkGhost, LinkPrimary } from '@/common/components/buttons/Links'
import { ArrowRightIcon } from '@/common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextBig, TextInlineBig } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'

import { NominatingRedirectModalCall } from './types'

export const NominatingRedirectModal = () => {
  const { hideModal } = useModal<NominatingRedirectModalCall>()

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
        <LinkGhost size="medium" href="https://polkadot.js.org/apps/?rpc=wss://rpc.joystream.org:9944#/staking/targets">
          View detailed stats
        </LinkGhost>
        <LinkPrimary
          size="medium"
          href="https://polkadot.js.org/apps/?rpc=wss://rpc.joystream.org:9944#/staking/actions"
        >
          Norminate <ArrowRightIcon white />
        </LinkPrimary>
      </ModalFooter>
    </Modal>
  )
}

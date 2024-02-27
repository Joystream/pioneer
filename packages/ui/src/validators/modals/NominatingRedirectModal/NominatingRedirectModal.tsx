import React from 'react'

import { LinkGhost, LinkPrimary } from '@/common/components/buttons/Links'
import { ArrowRightIcon } from '@/common/components/icons'
import { Link } from '@/common/components/Link'
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
          <TextInlineBig bold>Polkadot.js app</TextInlineBig>. Learn how in{' '}
          <Link href="https://gleev.xyz/video/829659">this video</Link>.
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
          Nominate <ArrowRightIcon white />
        </LinkPrimary>
      </ModalFooter>
    </Modal>
  )
}

import React, { useState } from 'react'
import styled from 'styled-components'

import { Link } from '@/common/components/Link'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useToggle } from '@/common/hooks/useToggle'

import { ButtonPrimary } from '../../common/components/buttons'
import { Checkbox } from '../../common/components/forms'
import { ArrowRightIcon } from '../../common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../common/components/Modal'
import { TextMedium } from '../../common/components/typography'

export const ValidatorsInfo = () => {
  const title = 'Nominating validators on Joystream'
  const buttonName = 'Start nominating'
  const [check, setCheck] = useToggle(false)
  const [notShowAgain, setNotShowAgain] = useLocalStorage<boolean>('ValidatorsPageCheck')
  const [showModal, setShowModal] = useState<boolean>(true)
  const closeModal = () => {
    setShowModal(false)
  }
  const checkModal = () => {
    setNotShowAgain(check)
    closeModal()
  }

  if (!notShowAgain && showModal)
    return (
      <Modal modalSize="s" onClose={checkModal}>
        <ModalHeader title={title} onClick={checkModal} />
        <ModalBody>
          <RowGapBlock gap={16}>
            <RowGapBlock gap={24}>
              <TextMedium>
                The Joystream blockchain is a PoS system relying on validators. Nominating validators allows you to
                participate in the Joystream governance system and earn rewards.
              </TextMedium>
              <TextMedium>
                When nominating, you are at risk of having parts of your staked funds lost if the validator malfunctions
                or does a poor job, resulting in a reduced return on investment. To manage your risk, we advice you to
                nominate several validators (up to 16). This allows you to spread out your risk and increase your
                chances of earning rewards. You can choose how much to stake with each validator, and you can change
                your staking percentages at any time.
              </TextMedium>
              <TextMedium>
                To begin, review each validator's performance metrics by clicking on their name in the list. When you're
                ready to nominate, add the validators you'd like to nominate by clicking the "Nominate" button on the
                list or directly on the validator’s profile. Once you've selected a validator, click the "Proceed"
                button to initiate the nomination process.
              </TextMedium>
            </RowGapBlock>
            <TextMedium>
              You can learn more about the Pioneer nomination{' '}
              <Link href="https://handbook.joystream.org/system/nomination">system here</Link>.
            </TextMedium>
          </RowGapBlock>
        </ModalBody>
        <InfoModalFooter>
          <Checkbox id="" onChange={setCheck} isChecked={check}>
            Do not show this again.
          </Checkbox>
          <ButtonPrimary size="medium" onClick={checkModal}>
            {buttonName} <ArrowRightIcon white />
          </ButtonPrimary>
        </InfoModalFooter>
      </Modal>
    )
  return null
}

const InfoModalFooter = styled(ModalFooter)`
  justify-items: start;
  justify-content: space-between;
`

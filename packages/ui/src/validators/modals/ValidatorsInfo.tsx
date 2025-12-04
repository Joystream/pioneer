import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { Checkbox } from '@/common/components/forms'
import { ArrowRightIcon } from '@/common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useModal } from '@/common/hooks/useModal'

export const ValidatorsInfo = () => {
  const title = 'Nominating validators on Joystream'
  const buttonName = 'Start nominating'

  const { hideModal } = useModal()
  const [pageCheck, showInfo] = useLocalStorage<boolean>('ValidatorsPageCheck')

  const closeModal = () => {
    hideModal()
    showInfo(true)
  }

  if (!pageCheck)
    return (
      <Modal modalSize="s" onClose={closeModal}>
        <ModalHeader title={title} onClick={closeModal} />
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
                ready to nominate, add the validators you'd like to nominate to by clicking the "Nominate" button on the
                list or directly on the validator’s profile. Once you've selected your validators, click the "Proceed"
                button to initiate the nomination process.
              </TextMedium>
            </RowGapBlock>
            <TextMedium>
              You can learn more about the Pioneer nomination{' '}
              <Link to="#" style={{ color: Colors.Blue[500], textDecoration: 'underline' }}>
                system here
              </Link>
              .
            </TextMedium>
          </RowGapBlock>
        </ModalBody>
        <InfoModalFooter>
          <Checkbox id="" onChange={() => {}} isChecked={false}>
            Do not show this again.
          </Checkbox>
          <ButtonPrimary size="medium" onClick={closeModal}>
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

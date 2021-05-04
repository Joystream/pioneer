import BN from 'bn.js'
import React from 'react'
import { Link } from 'react-router-dom'

import { Account } from '@/accounts/types'
import { ButtonGhostMedium } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader, Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Stepper } from '@/common/components/Stepper'
import {
  StepDescriptionColumn,
  StepperBody,
  StepperModalBody,
  StepperModalWrapper,
} from '@/common/components/StepperModal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'

import { OpeningFormPreview } from '../../components/OpeningFormPreview'

import { ApplyForRoleModalCall } from '.'
import { steps } from './model'

interface Props {
  stake: BN
  stakeAccount: Account
  applicationId: number
}

export const ApplyForRoleSuccessModal = ({ stake, stakeAccount, applicationId }: Props) => {
  const { hideModal, modalData } = useModal<ApplyForRoleModalCall>()

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Applying for role" />
      <StepperModalBody>
        <StepperModalWrapper>
          <Stepper steps={steps} active={2} />
          <StepDescriptionColumn>
            <OpeningFormPreview opening={modalData.opening} />
          </StepDescriptionColumn>
          <StepperBody>
            <RowGapBlock gap={24}>
              <Row>
                <RowGapBlock gap={8}>
                  <h4>Application submitted!</h4>
                  <TextMedium>
                    Here is your application id: {applicationId} You can track the progress of you application in "
                    <Link to="/working-groups/my-applications">My applications subpage</Link>".
                  </TextMedium>
                </RowGapBlock>
              </Row>
              <Row>
                <RowGapBlock gap={20}>
                  <div>
                    <h5>Staked</h5>
                    <TextMedium>
                      You have just staked <TokenValue value={stake} /> from your "{stakeAccount.name}" account.
                    </TextMedium>
                  </div>
                </RowGapBlock>
              </Row>
            </RowGapBlock>
          </StepperBody>
        </StepperModalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <Link to="/working-groups/my-applications" component={ButtonGhostMedium}>
          Go to my applications
          <Arrow direction="right" />
        </Link>
      </ModalFooter>
    </Modal>
  )
}

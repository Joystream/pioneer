import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Account } from '@/accounts/types'
import { ButtonGhost } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { Info } from '@/common/components/Info'
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

import { getStepsFromMachineAndState } from '../../../common/model/machines/getSteps'
import { OpeningFormPreview } from '../../components/OpeningFormPreview'

import { ApplyForRoleModalCall } from '.'
import { applyForRoleMachine } from './machine'

interface Props {
  stake: BN
  stakeAccount: Account
  applicationId: BN
}

export const ApplyForRoleSuccessModal = ({ stake, stakeAccount, applicationId }: Props) => {
  const { hideModal, modalData } = useModal<ApplyForRoleModalCall>()
  const { push } = useHistory()
  const [state] = useMachine(applyForRoleMachine)

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Applying for role" />
      <StepperModalBody>
        <StepperModalWrapper>
          <Stepper steps={getStepsFromMachineAndState(applyForRoleMachine, state)} />
          <StepDescriptionColumn>
            <OpeningFormPreview opening={modalData.opening} />
          </StepDescriptionColumn>
          <StepperBody>
            <RowGapBlock gap={24}>
              <Row>
                <RowGapBlock gap={8}>
                  <h4>Application submitted!</h4>
                  <TextMedium>
                    Here is your application id: {applicationId.toString()} You can track the progress of you
                    application in "<Link to="/working-groups/my-applications">My applications subpage</Link>".
                  </TextMedium>
                </RowGapBlock>
              </Row>
              <Row>
                <RowGapBlock gap={20}>
                  <Info
                    title="Staked"
                    content={
                      <TextMedium light>
                        You have just staked <TokenValue value={stake} /> from your "{stakeAccount.name}" account.
                      </TextMedium>
                    }
                  />
                </RowGapBlock>
              </Row>
            </RowGapBlock>
          </StepperBody>
        </StepperModalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <ButtonGhost onClick={() => push('/working-groups/my-applications')} size="medium">
          Go to my applications
          <Arrow direction="right" />
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}

import BN from 'bn.js'
import React, { useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Account } from '@/accounts/types'
import { ButtonGhost } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { Info } from '@/common/components/Info'
import { Modal, ModalFooter, ModalHeader, Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import {
  Stepper,
  StepDescriptionColumn,
  StepperBody,
  StepperModalBody,
  StepperModalWrapper,
} from '@/common/components/StepperModal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { Step } from '@/common/model/machines/getSteps'
import { WorkingGroupsRoutes } from '@/working-groups/constants/routes'

import { OpeningFormPreview } from '../../components/OpeningFormPreview'

import { ApplyForRoleModalCall } from '.'

interface Props {
  stake: BN
  stakeAccount: Account
  applicationId: BN
  steps: Step[]
}

export const ApplyForRoleSuccessModal = ({ stake, stakeAccount, applicationId, steps }: Props) => {
  const { hideModal, modalData } = useModal<ApplyForRoleModalCall>()
  const { push } = useHistory()

  const viewApplications = useCallback(async () => {
    push(WorkingGroupsRoutes.myApplications)
    hideModal()
  }, [])

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Applying for role" />
      <StepperModalBody>
        <StepperModalWrapper>
          <Stepper steps={steps} />
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
                    application in "<Link to={WorkingGroupsRoutes.myApplications}>My applications subpage</Link>".
                  </TextMedium>
                </RowGapBlock>
              </Row>
              <Row>
                <RowGapBlock gap={20}>
                  <Info title="Staked">
                    <TextMedium light>
                      You have just staked <TokenValue value={stake} /> from your "{stakeAccount.name}" account.
                    </TextMedium>
                  </Info>
                </RowGapBlock>
              </Row>
            </RowGapBlock>
          </StepperBody>
        </StepperModalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <ButtonGhost onClick={viewApplications} size="medium">
          Go to my applications
          <Arrow direction="right" />
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}

import { useMachine } from '@xstate/react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useBalance } from '@/accounts/hooks/useBalance'
import { ForumThreadStep } from '@/bounty/modals/AddBountyModal/components/ForumThreadStep'
import { FundingDetailsStep } from '@/bounty/modals/AddBountyModal/components/FundingDetailsStep'
import { GeneralParametersStep } from '@/bounty/modals/AddBountyModal/components/GeneralParametersStep'
import { JudgingDetailsStep } from '@/bounty/modals/AddBountyModal/components/JudgingDetailsStep'
import { WorkingDetailsStep } from '@/bounty/modals/AddBountyModal/components/WorkingDetailsStep'
import { isNextStepValid } from '@/bounty/modals/AddBountyModal/helpers'
import { addBountyMachine, AddBountyModalMachineState, AddBountyStates } from '@/bounty/modals/AddBountyModal/machine'
import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { Stepper, StepperBody, StepperModalBody, StepperModalWrapper } from '@/common/components/StepperModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { isLastStepActive } from '@/common/modals/utils'
import { getSteps } from '@/common/model/machines/getSteps'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { Member } from '@/memberships/types'

export const AddBountyModal = () => {
  const { hideModal, showModal } = useModal()
  const { active: activeMember } = useMyMemberships()
  const [state, send, service] = useMachine(addBountyMachine)
  const [isValidNext, setValidNext] = useState(false)
  const { api } = useApi()
  const { transferable } = useBalance(activeMember?.controllerAccount) || {}
  const bountyApi = api?.consts.bounty

  if (!service.initialized) {
    service.start()
  }

  useEffect(() => {
    if (state.matches(AddBountyStates.requirementsVerification)) {
      if (!activeMember) {
        return showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
      }
      if (activeMember) {
        send('NEXT')
      }
    }
    setValidNext(
      isNextStepValid(state as AddBountyModalMachineState, {
        minCherryLimit: bountyApi?.minCherryLimit,
        maxCherryLimit: transferable,
        minFundingLimit: bountyApi?.minFundingLimit,
        maxWhitelistSize: bountyApi?.closedContractSizeLimit,
        minWorkEntrantStake: bountyApi?.minWorkEntrantStake,
      })
    )
  }, [state])
  // if (state.matches(AddBountyStates.transaction)) {
  //   const transaction = api.tx.bounty.createBounty({})
  //   return (
  //     <SignTransactionModal
  //       onClose={hideModal}
  //       transaction={transaction}
  //       // signer={activeMember.controllerAccount}
  //       // stake={constants?.requiredStake as BN}
  //       // service={state.children['transaction']}
  //       // steps={transactionsSteps}
  //     />
  //   )
  // }

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader title="Creating New Bounty" onClick={hideModal} />
      <StepperModalBody>
        <AddBountyModalWrapper>
          <Stepper steps={getSteps(service)} />
          <StepperBody>
            {state.matches(AddBountyStates.generalParameters) && (
              <GeneralParametersStep
                title={state.context.title}
                setTitle={(title: string) => send('SET_BOUNTY_TITLE', { title })}
                description={state.context.description}
                setDescription={(description: string) => send('SET_BOUNTY_DESCRIPTION', { description })}
                setCreator={(creator: Member) => send('SET_CREATOR', { creator })}
                coverPhotoLink={state.context.coverPhotoLink}
                setCoverPhoto={(coverPhotoLink: string) => send('SET_COVER_PHOTO', { coverPhotoLink })}
                activeMember={activeMember}
              />
            )}

            {state.matches(AddBountyStates.fundingPeriodDetails) && (
              <FundingDetailsStep
                cherry={state.context.cherry}
                setCherry={(cherry) => send('SET_CHERRY', { cherry })}
                fundingMaximalRange={state.context.fundingMaximalRange}
                setFundingMaximalRange={(fundingMaximalRange) =>
                  send('SET_FUNDING_MAXIMAL_RANGE', { fundingMaximalRange })
                }
                fundingMinimalRange={state.context.fundingMinimalRange}
                setFundingMinimalRange={(fundingMinimalRange) =>
                  send('SET_FUNDING_MINIMAL_RANGE', { fundingMinimalRange })
                }
                fundingPeriodType={state.context.fundingPeriodType}
                setFundingPeriodType={(fundingPeriodType) => send('SET_FUNDING_PERIOD_TYPE', { fundingPeriodType })}
                account={activeMember?.controllerAccount}
                fundingPeriodLength={state.context.fundingPeriodLength}
                setFundingPeriodLength={(fundingPeriodLength) =>
                  send('SET_FUNDING_PERIOD_LENGTH', { fundingPeriodLength })
                }
              />
            )}
            {state.matches(AddBountyStates.workingPeriodDetails) && (
              <WorkingDetailsStep
                workingPeriodType={state.context.workingPeriodType}
                workingPeriodLength={state.context.workingPeriodLength}
                workingPeriodStakeAllowance={state.context.workingPeriodStakeAllowance}
                workingPeriodStake={state.context.workingPeriodStake}
                workingPeriodWhitelist={state.context.workingPeriodWhitelist}
                setWorkingPeriodWhitelist={(members: Member[]) =>
                  send('SET_WORKING_PERIOD_WHITELIST', { workingPeriodWhitelist: members })
                }
                setWorkingPeriodLength={(workingPeriodLength) =>
                  send('SET_WORKING_PERIOD_LENGTH', { workingPeriodLength })
                }
                setWorkingPeriodStake={(workingPeriodStake) => send('SET_WORKING_PERIOD_STAKE', { workingPeriodStake })}
                setWorkingPeriodStakeAllowance={(workingPeriodStakeAllowance) =>
                  send('SET_ALLOW_WORKING_PERIOD_STAKE', { workingPeriodStakeAllowance })
                }
                setWorkingPeriodType={(workingPeriodType) => send('SET_WORKING_PERIOD_TYPE', { workingPeriodType })}
              />
            )}
            {state.matches(AddBountyStates.judgingPeriodDetails) && (
              <JudgingDetailsStep
                oracle={state.context.oracle}
                judgingPeriodLength={state.context.judgingPeriodLength}
                setJudgingPeriodLength={(judgingPeriodLength) =>
                  send('SET_JUDGING_PERIOD_LENGTH', { judgingPeriodLength })
                }
                setOracle={(oracle) => send('SET_ORACLE', { oracle })}
              />
            )}
            {state.matches(AddBountyStates.forumThreadDetails) && (
              <ForumThreadStep
                setForumThreadDescription={(forumThreadDescription) =>
                  send('SET_FORUM_THREAD_DESCRIPTION', { forumThreadDescription })
                }
                setForumThreadTopic={(forumThreadTopic) => send('SET_FORUM_THREAD_TOPIC', { forumThreadTopic })}
                forumThreadTopic={state.context.forumThreadTopic}
                forumThreadDescription={state.context.forumThreadDescription}
              />
            )}
          </StepperBody>
        </AddBountyModalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <ButtonsGroup align="right">
          <ButtonPrimary disabled={!isValidNext} onClick={() => send('NEXT')} size="medium">
            {isLastStepActive(getSteps(service)) ? 'Create bounty' : 'Next step'}
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}

const AddBountyModalWrapper = styled(StepperModalWrapper)`
  grid-template-columns: 184px 1fr;
`

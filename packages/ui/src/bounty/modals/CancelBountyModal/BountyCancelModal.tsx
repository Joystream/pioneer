import { useMachine } from '@xstate/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { AuthorizationModal } from '@/bounty/modals/CancelBountyModal/AuthorizationModal'
import { bountyCancelMachine, BountyCancelStates } from '@/bounty/modals/CancelBountyModal/machine'
import { BountyCancelModalCall } from '@/bounty/modals/CancelBountyModal/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, InputContainer } from '@/common/components/forms'
import { FileIcon } from '@/common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { SelectedMember } from '@/memberships/components/SelectMember'

export const BountyCancelModal = () => {
  const { t } = useTranslation('bounty')
  const [state, send] = useMachine(bountyCancelMachine)
  const { hideModal, modalData } = useModal<BountyCancelModalCall>()

  if (state.matches(BountyCancelStates.TRANSACTION)) {
    return (
      <AuthorizationModal
        service={state.children['transaction']}
        onClose={hideModal}
        creator={modalData.creator}
        bountyId={modalData.bounty.id}
      />
    )
  }

  return (
    <Modal onClose={hideModal} modalSize="l">
      <ModalHeader title={t('modals.bountyCancel.title')} onClick={hideModal} />
      <ModalBody>
        <BodyContainer gap={30}>
          <WarningWrapper>
            <ColumnGapBlock gap={4}>
              <TextMedium bold value>
                <FileIcon /> {t('modals.bountyCancel.warningBox.question1')}
              </TextMedium>
            </ColumnGapBlock>
            <TextMedium inter light>
              {t('modals.bountyCancel.warningBox.question2')}
            </TextMedium>
          </WarningWrapper>
          <Container
            disabled
            label={t('modals.bountyCancel.bountyInput.label')}
            tooltipText={t('modals.bountyCancel.bountyInput.tooltipText')}
            inputSize="l"
          >
            <TextBig value bold>
              {modalData.bounty.title}
            </TextBig>
          </Container>
          <SelectedMember
            disabled
            label={t('modals.bountyCancel.memberInput.label')}
            tooltipText={t('modals.bountyCancel.memberInput.tooltipText')}
            member={modalData.creator}
          />
        </BodyContainer>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={() => send('NEXT')}>
          {t('modals.bountyCancel.authorization.button')}
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

const BodyContainer = styled(RowGapBlock)`
  label {
    color: ${Colors.Black[900]};
  }
`

const WarningWrapper = styled.div`
  background-color: ${Colors.Warning[50]};
  width: 100%;
  padding: 10px 15px;
  > * {
    padding: 5px 0;
  }
`

const Container = styled(InputComponent)`
  ${InputContainer} {
    padding-left: 16px;
  }
`

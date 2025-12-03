import { BN } from '@polkadot/util'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'

import { List, ListItem } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { SortHeader } from '@/common/components/List/SortHeader'
import { Pagination, PaginationProps } from '@/common/components/Pagination'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { Colors } from '@/common/constants'
import { useValidatorsList } from '@/validators/hooks/useValidatorsList'
import { WorkingGroupsRoutes } from '@/working-groups/constants'

import { useSelectedValidators } from '../context/SelectedValidatorsContext'
import { useMyStashPositions } from '../hooks/useMyStashPositions'
import { ValidatorCard } from '../modals/validatorCard/ValidatorCard'
import { ValidatorDetailsOrder, ValidatorWithDetails } from '../types'

import { NominateValidatorsModal } from './NominateValidatorsModal'
import { SelectedValidatorsPanel } from './SelectedValidatorsPanel'
import { StakingSuccessModal } from './StakingSuccessModal'
import { StashAccountModal } from './StashAccountModal'
import { TransactionSummaryModal } from './TransactionSummaryModal'
import { ValidatorItem } from './ValidatorItem'
import { ValidatorItemLoading } from './ValidatorItemLoading'
import { ValidatorSelectionModal } from './ValidatorSelectionModal'
import { ValidatorsFilter } from './ValidatorsFilter'

interface ValidatorsListProps {
  validators: ValidatorWithDetails[] | undefined
  eraIndex: number | undefined
  order: ValidatorDetailsOrder & { sortBy: (key: ValidatorDetailsOrder['key']) => () => void }
  pagination: PaginationProps
}

export const ValidatorsList = ({ validators, eraIndex, order, pagination }: ValidatorsListProps) => {
  const { t } = useTranslation('validators')
  const [cardNumber, selectCard] = useState<number | null>(null)
  const [isValidatorModalOpen, setIsValidatorModalOpen] = useState(false)
  const [isStashModalOpen, setIsStashModalOpen] = useState(false)
  const [isTransactionSummaryModalOpen, setIsTransactionSummaryModalOpen] = useState(false)
  const [isNominateModalOpen, setIsNominateModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [stashAccountData, setStashAccountData] = useState<any>(null)
  const [nominatedValidatorAddresses, setNominatedValidatorAddresses] = useState<Set<string>>(new Set())
  const { format } = useValidatorsList()
  const { selectedValidators, clearSelection } = useSelectedValidators()
  const stashPositions = useMyStashPositions()

  // Get all validators currently nominated by my stashes
  const myNominatedValidators = React.useMemo(() => {
    if (!stashPositions) return new Set<string>()
    const nominated = new Set<string>()
    stashPositions.forEach((position) => {
      position.nominations.forEach((validatorAddress) => {
        nominated.add(validatorAddress)
      })
    })
    return nominated
  }, [stashPositions])

  if (validators && !validators.length) return <NotFoundText>{t('common:forms.noResults')}</NotFoundText>

  const handleProceed = () => {
    setIsValidatorModalOpen(true)
  }

  const handleValidatorModalContinue = () => {
    setIsValidatorModalOpen(false)
    setIsStashModalOpen(true)
  }

  const handleValidatorModalCancel = () => {
    setIsValidatorModalOpen(false)
  }

  const handleValidatorModalClose = () => {
    setIsValidatorModalOpen(false)
  }

  const handleStashModalContinue = (data: { nominatingController: any; stashAccount: any; valueBonded: BN }) => {
    setIsStashModalOpen(false)
    setStashAccountData(data)
    setIsNominateModalOpen(true)
    //
  }

  const handleStashModalBack = () => {
    setIsStashModalOpen(false)
    setIsValidatorModalOpen(true)
  }

  const handleStashModalClose = () => {
    setIsStashModalOpen(false)
  }

  const handleTransactionSummaryModalBack = () => {
    setIsTransactionSummaryModalOpen(false)
    setIsNominateModalOpen(true)
  }

  const handleTransactionSummaryModalClose = () => {
    setIsTransactionSummaryModalOpen(false)
    setStashAccountData(null)
  }

  const handleTransactionSummaryModalContinue = () => {
    // Mark the selected validators as nominated
    const newNominatedAddresses = new Set(nominatedValidatorAddresses)
    selectedValidators.forEach((validator) => {
      newNominatedAddresses.add(validator.stashAccount)
    })
    setNominatedValidatorAddresses(newNominatedAddresses)

    setIsTransactionSummaryModalOpen(false)
    setIsSuccessModalOpen(true)
    clearSelection()
  }

  const handleNominateModalBack = () => {
    setIsNominateModalOpen(false)
    setIsStashModalOpen(true)
  }

  const handleNominateModalClose = () => {
    setIsNominateModalOpen(false)
  }

  const handleBondAndNominate = () => {
    setIsNominateModalOpen(false)
    setIsTransactionSummaryModalOpen(true)
    //setIsSuccessModalOpen(true)
  }

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false)
  }

  const handleSuccessModalContinue = () => {
    setIsSuccessModalOpen(false)
    clearSelection()
  }

  const handleNominate = () => {
    handleProceed()
  }

  return (
    <MainContainer>
      <Wrapper>
        <ValidatorsFilter filter={format.filter} onNominate={handleNominate} />
        <ResponsiveWrap>
          <ValidatorsListWrap>
            <ListHeaders>
              <SortHeader
                onSort={order.sortBy('default')}
                isActive={order.key === 'default'}
                isDescending={order.isDescending}
              >
                Validator
              </SortHeader>
              <ListHeader>
                Verification
                <Tooltip
                  tooltipText="The profile of Verified validator has been entirely verified by the Membership working group."
                  tooltipLinkText="Membership working group"
                  tooltipLinkURL={generatePath(WorkingGroupsRoutes.group, { name: 'membership' })}
                >
                  <TooltipDefault />
                </Tooltip>
              </ListHeader>
              <ListHeader>State</ListHeader>
              <ListHeader>Own Stake</ListHeader>
              <ListHeader>Total Stake</ListHeader>
              <SortHeader onSort={order.sortBy('apr')} isActive={order.key === 'apr'} isDescending={order.isDescending}>
                Expected Nom APR
                <Tooltip
                  tooltipText={
                    <p>
                      This column shows the expected APR for nominators who are nominating funds for the chosen
                      validator. The APR is subject to the amount staked and have a diminishing return for higher token
                      amounts. This is calculated as follow:
                      <br />
                      <code>Yearly Reward * (1 - Commission) / Stake</code>
                      <dl>
                        <dt>Reward:</dt>
                        <dd>Average reward generated (during the last 30 days) extrapolated over a year.</dd>

                        <dt>Commission:</dt>
                        <dd>Current nominator commission.</dd>

                        <dt>Stake:</dt>
                        <dd>Current total stake (validator + nominators).</dd>
                      </dl>
                    </p>
                  }
                >
                  <TooltipDefault />
                </Tooltip>
              </SortHeader>
              <SortHeader
                onSort={order.sortBy('commission')}
                isActive={order.key === 'commission'}
                isDescending={order.isDescending}
              >
                Commission
                <Tooltip tooltipText={<p>The validator commission on the nominators rewards</p>}>
                  <TooltipDefault />
                </Tooltip>
              </SortHeader>
              <ListHeader>Actions</ListHeader>
            </ListHeaders>
            {!validators ? (
              <ValidatorItemLoading count={7} />
            ) : (
              <>
                <List>
                  {validators?.map((validator, index) => (
                    <ListItem
                      key={validator.stashAccount}
                      onClick={() => {
                        selectCard(index + 1)
                      }}
                    >
                      <ValidatorItem
                        validator={validator}
                        isNominated={
                          nominatedValidatorAddresses.has(validator.stashAccount) ||
                          myNominatedValidators.has(validator.stashAccount)
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                {cardNumber && validators[cardNumber - 1] && (
                  <ValidatorCard
                    cardNumber={cardNumber}
                    validator={validators[cardNumber - 1]}
                    eraIndex={eraIndex}
                    selectCard={selectCard}
                    totalCards={validators.length}
                    isNominated={
                      nominatedValidatorAddresses.has(validators[cardNumber - 1].stashAccount) ||
                      myNominatedValidators.has(validators[cardNumber - 1].stashAccount)
                    }
                  />
                )}
              </>
            )}
          </ValidatorsListWrap>
        </ResponsiveWrap>
        <Pagination {...pagination} />
      </Wrapper>
      {selectedValidators.length > 0 && <SelectedValidatorsPanel onProceed={handleProceed} />}
      <ValidatorSelectionModal
        isOpen={isValidatorModalOpen}
        onClose={handleValidatorModalClose}
        onContinue={handleValidatorModalContinue}
        onCancel={handleValidatorModalCancel}
      />
      <StashAccountModal
        isOpen={isStashModalOpen}
        onClose={handleStashModalClose}
        onContinue={handleStashModalContinue}
        onBack={handleStashModalBack}
      />
      <NominateValidatorsModal
        isOpen={isNominateModalOpen}
        onClose={handleNominateModalClose}
        onBack={handleNominateModalBack}
        onBondAndNominate={handleBondAndNominate}
        nominatingController={stashAccountData?.nominatingController}
        stashAccount={stashAccountData?.stashAccount}
        valueBonded={stashAccountData?.valueBonded ? stashAccountData.valueBonded.toString() : '0'}
        useExistingStash={stashAccountData?.useExistingStash}
      />
      <TransactionSummaryModal
        isOpen={isTransactionSummaryModalOpen}
        onClose={handleTransactionSummaryModalClose}
        onBack={handleTransactionSummaryModalBack}
        onSignAndNominate={handleTransactionSummaryModalContinue}
        nominatingController={stashAccountData?.nominatingController}
        stashAccount={stashAccountData?.stashAccount}
        valueBonded={stashAccountData?.valueBonded ? stashAccountData.valueBonded.toString() : '0'}
      />

      <StakingSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        onContinue={handleSuccessModalContinue}
        stakedAmount={stashAccountData?.valueBonded ? stashAccountData.valueBonded.toString() : '0'}
        validatorCount={selectedValidators.length}
      />
    </MainContainer>
  )
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 24px;
  justify-content: space-between;
  align-items: start;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: end;
  flex: 1;
  min-width: 0;
`

const ResponsiveWrap = styled.div`
  overflow: auto;
  align-self: stretch;
  width: 100%;
`

const ValidatorsListWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 16px auto;
  grid-template-areas:
    'validatorstablenav'
    'validatorslist';
  grid-row-gap: 4px;
  min-width: 0;

  ${List} {
    gap: 8px;
  }
  ${ListItem} {
    background: ${Colors.Black[50]};
  }
`

const ListHeaders = styled.div`
  display: grid;
  grid-area: validatorstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 1fr 0.8fr 1.4fr 1.4fr 1.4fr 1fr 1fr;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;

  span {
    display: flex;
    justify-content: flex-end;
    gap: 4px;
  }
`

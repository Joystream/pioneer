import React, { useMemo, useState } from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { ValidatorsTabs } from './components/ValidatorsTabs'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { MultiValueStat, Statistics, TokenValueStat } from '@/common/components/statistics'
import { BN } from '@polkadot/util'
import { useMyTotalBalances } from '@/accounts/hooks/useMyTotalBalances'
import { ClaimAllButton } from './components/ClaimAllButton'
import { NorminatorDashboardItem } from '@/validators/components/nominator/NominatorItems'
import { useValidatorsList } from '@/validators/hooks/useValidatorsList'
import { List, ListItem } from '@/common/components/List'
import styled from 'styled-components'
import { Colors } from '@/common/constants'

export const NominatorDashboard = () => {

    const { visibleValidators } = useValidatorsList()
    const [isDisplayAll, setIsDisplayAll] = useState(true)
    const [isDescending, setDescending] = useState(false)
    const sortedValidators = useMemo(
        () => visibleValidators,
        [visibleValidators]
    )

    const { vestedClaimable } = useMyTotalBalances();


    return (
        <PageLayout
            header={
                <RowGapBlock gap={24} >
                    <PageHeader
                        title="Validators"
                        tabs={<ValidatorsTabs />}
                    />
                    <Statistics>
                        <TokenValueStat title='CLAIMABLE REWARDS' tooltipText="tooltip text..."
                            tooltipTitle="claim rewards tooltip title"
                            tooltipLinkText="link..."
                            tooltipLinkURL="#" value={vestedClaimable} actionElement={<ClaimAllButton />} />
                        <MultiValueStat
                            title="STAKE"
                            tooltipText="tooltip text..."
                            tooltipTitle="stake tooltip title"
                            tooltipLinkText="link..."
                            tooltipLinkURL="#"
                            values={[
                                { label: 'Total', value: new BN(0) },
                                { label: 'Yours', value: new BN(0) },
                            ]}
                        />
                        <MultiValueStat
                            title="YOUR REWARDS "
                            tooltipText="tooltip text..."
                            tooltipTitle="Rewards tooltip title"
                            tooltipLinkText="link..."
                            tooltipLinkURL="#"
                            values={[
                                { label: 'total', value: new BN(0) },
                                { label: 'last', value: new BN(0) },
                            ]}
                        />
                        <MultiValueStat
                            title="ANNUAL PECENTAGE RATE(APR)"
                            tooltipText="tooltip text..."
                            tooltipTitle="annual tooltip title"
                            tooltipLinkText="link..."
                            tooltipLinkURL="#"
                            values={[
                                { label: 'Average', value: new BN(0) },
                                { label: 'Last 7 days', value: new BN(0) },
                            ]}
                        />
                    </Statistics>
                </RowGapBlock>
            }
            main={
                <ValidatorsListWrap>
                    <ListHeaders>
                        <ListHeader >Validator</ListHeader>
                        <ListHeader >Total Reward</ListHeader>
                        <ListHeader >Health</ListHeader>
                        <ListHeader >Apr</ListHeader>
                        <ListHeader >7Days Apr</ListHeader>
                        <ListHeader >Slashed</ListHeader>
                        <ListHeader >Your stake</ListHeader>
                        <ListHeader >Claimable Reward</ListHeader>
                    </ListHeaders>
                    <List>
                        {sortedValidators?.map((validator) => (
                            <ListItem key={validator.address} borderless>
                                <NorminatorDashboardItem validator={validator} />
                            </ListItem>
                        ))}
                    </List>
                </ValidatorsListWrap>
            }
        />
    )
}


const ValidatorsListWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 16px auto;
  grid-template-areas:
    'validatorstablenav'
    'validatorslist';
  grid-row-gap: 4px;
  width: 100%;
`

const ListHeaders = styled.div`
  display: grid;
  grid-area: validatorstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: 222px 141px 75px 30px 73px 55px 131px 120px 118px 30px 27px;
  justify-content: space-between;
  justify-items: center;
  width: 100%;
  padding-left: 9px;
  padding-right: 8px;
`

export const ListHeader = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  justify-self: start;
  width: fit-content;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  text-align: right;
  user-select: none;
  cursor: pointer;
  &:first-child {
    text-align: left;
    justify-self: start;
  }
`
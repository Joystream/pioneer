import React from 'react'
import styled from 'styled-components'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { List, ListItem } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { NumericValueStat, Statistics } from '@/common/components/statistics'
import { TextBig, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useBagsList } from '@/validators/hooks/useBagsList'

import { ValidatorsTabs } from './components/ValidatorsTabs'

export const Bags = () => {
  const bagsData = useBagsList()

  return (
    <PageLayout
      header={
        <RowGapBlock gap={24}>
          <PageHeader title="My Bags" tabs={<ValidatorsTabs />} />
          <Statistics>
            <NumericValueStat
              title="TOTAL BAGS"
              tooltipText="The total number of bags in the bags list. Bags organize nominators by their bonded stake amount."
              tooltipTitle="Total Bags"
              tooltipLinkText="Learn about bags list"
              tooltipLinkURL="https://wiki.polkadot.network/docs/learn-nominator#bags-list"
              value={bagsData?.totalBags ?? 0}
            />
          </Statistics>
        </RowGapBlock>
      }
      fullWidth
      main={
        <BagsListWrap>
          <ListHeaders>
            <ListHeader>Bag Upper Bound</ListHeader>
            <ListHeader>Node Count</ListHeader>
          </ListHeaders>
          {!bagsData ? (
            <LoadingWrapper>
              <Loading />
            </LoadingWrapper>
          ) : bagsData.bags.length === 0 ? (
            <EmptyState>
              <TextMedium>
                Bags list feature coming soon. This will display the nominator bags organized by stake thresholds.
              </TextMedium>
            </EmptyState>
          ) : (
            <List>
              {bagsData.bags.map((bag, index) => (
                <ListItem key={index} borderless>
                  <BagItemWrap>
                    <TextBig>{bag.bagUpper.toString()}</TextBig>
                    <TextBig>{bag.nodeCount}</TextBig>
                  </BagItemWrap>
                </ListItem>
              ))}
            </List>
          )}
        </BagsListWrap>
      }
    />
  )
}

const BagsListWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 16px auto;
  grid-template-areas:
    'bagstablenav'
    'bagslist';
  grid-row-gap: 4px;
  width: 100%;
`

const ListHeaders = styled.div`
  display: grid;
  grid-area: bagstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  justify-items: start;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
`

const ListHeader = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  width: fit-content;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  text-align: left;
  user-select: none;
`

const BagItemWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: start;
  align-items: center;
  width: 100%;
  padding: 16px;
  background: ${Colors.Black[50]};
`

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
`

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
  color: ${Colors.Black[400]};
`

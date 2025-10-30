import React, { useState } from 'react'
import styled from 'styled-components'

import { AnonymousAccount } from '@/accounts/components/AnonymousAccount'
import { CloseButton } from '@/common/components/buttons'
import { ArrowRightIcon } from '@/common/components/icons'
import { SidePaneGlass, SidePaneTitle, SidePanelTop } from '@/common/components/SidePane'
import { StatisticButton } from '@/common/components/statistics/StatisticButton'
import { TextInlineBig } from '@/common/components/typography'
import {
  PreviewPanel,
  PreviewPanelBody,
  PreviewPanelHeader,
} from '@/proposals/modals/AddNewProposal/components/SpecificParameters/modals/PreviewAndValidate'

import { Address } from './Address'

type Props = {
  label: string
  value: string[]
}
export const AddressesPreview = ({ label, value }: Props) => {
  const [isOpen, setOpen] = useState(false)

  if (value.length < 2) {
    return <Address label={label} value={value[0]} />
  }

  return (
    <>
      <StatisticButton title={label} onClick={() => setOpen(true)} icon={<ArrowRightIcon />}>
        <TextInlineBig bold value>
          {value.length} accounts
        </TextInlineBig>
      </StatisticButton>
      {isOpen && (
        <SidePaneGlass onClick={() => setOpen(false)}>
          <PreviewPanel>
            <PreviewPanelHeader>
              <SidePanelTop>
                <SidePaneTitle>{label}</SidePaneTitle>
                <CloseButton onClick={() => setOpen(false)} />
              </SidePanelTop>
            </PreviewPanelHeader>
            <PreviewPanelBody>
              <AccountList>
                {value.map((address) => (
                  <AnonymousAccount key={address} address={address} addressLength={12} />
                ))}
              </AccountList>
            </PreviewPanelBody>
          </PreviewPanel>
        </SidePaneGlass>
      )}
    </>
  )
}

const AccountList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
`

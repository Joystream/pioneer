import { getAllWallets } from 'injectweb3-connect'
import React from 'react'
import styled from 'styled-components'

import { TextHuge, TextInlineBig, TextMedium } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { MemberAvatar } from '@/memberships/components/Avatar'
import { MemberStackStyles } from '@/memberships/components/MemberStack'

interface VerticalStaticStepperData {
  title: string
  subtitle?: string
  walletIcon?: boolean
}
export interface VerticalStaticStepperProps {
  steps: Array<VerticalStaticStepperData>
}
export const VerticalStaticStepper = ({ steps }: VerticalStaticStepperProps) => {
  return (
    <StepperWrap>
      {steps.map((item, index) => (
        <StepWrap key={`vertical-stepper-${index}`}>
          <StepNumber>
            <StepNumberText value>{index + 1}</StepNumberText>
          </StepNumber>
          <StepBody>
            <StepTitle>{item.title}</StepTitle>
            <StepSubtitleList>
              <StyledSubtitle>{item.subtitle}</StyledSubtitle>
              {item.walletIcon ?? (
                <WalletIconWrapper>
                  {getAllWallets().map((wallet) => (
                    <WalletIcons avatarUri={wallet.logo.src} />
                  ))}
                </WalletIconWrapper>
              )}
            </StepSubtitleList>
          </StepBody>
        </StepWrap>
      ))}
    </StepperWrap>
  )
}

const StepperWrap = styled.div`
  display: grid;
  position: relative;
  grid-row-gap: 20px;
  align-content: start;
  margin-bottom: 15px;
`

const StepNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  border-radius: ${BorderRad.round};
  background-color: ${Colors.Black[700]};
  font-weight: 700;
`

const StepTitle = styled(TextHuge)`
  align-self: center;
  font-weight: 700;
  text-transform: capitalize;
`

const StepSubtitleList = styled.ul`
  list-style: disc;
`

const WalletIcons = styled(MemberAvatar)``

const WalletIconWrapper = styled(MemberStackStyles)`
  margin-top: 5px;
`

const StyledSubtitle = styled(TextMedium)`
  color: ${Colors.Black[300]};
`
const StepBody = styled.div`
  display: grid;
  align-items: center;
  row-gap: 8px;
  padding-left: 16px;
  margin-top: 12px;
`

const StepWrap = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 28px 1fr;
  grid-column-gap: 8px;
  justify-content: start;

  &:not(:last-child) {
    ${StepNumber}:before {
      content: '';
      position: absolute;
      left: 14px;
      top: 49px;
      width: 1px;
      height: calc(100% + 20px);
      transform: translateX(-50%);
      background-color: ${Colors.White};
    }
  }

  ${StepNumber} {
    border: 2px solid ${Colors.Black[500]};
    width: 49px;
    height: 49px;
  }

  ${StepTitle} {
    font-weight: ${({ theme }) => theme.stepperTitleFontWeight};
    -webkit-text-stroke-width: 0.05em;
    -webkit-text-stroke-color: transparent;
    color: ${Colors.White};
  }
`

const StepNumberText = styled(TextInlineBig)`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: ${Colors.White};
  line-height: 13px;
`

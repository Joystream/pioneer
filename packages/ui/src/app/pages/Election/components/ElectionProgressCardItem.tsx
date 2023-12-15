import React, { useState } from 'react'
import styled from 'styled-components'

import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { Skeleton } from '@/common/components/Skeleton'
import { BorderRad, Colors, Transitions } from '@/common/constants'

interface ElectionProgressCardItemProps {
  progress: number
  text: string
  title: string
}

interface CircleProgressBarProps {
  progress: number
}

const CircleProgressBar = ({ progress }: CircleProgressBarProps) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx="10" cy="10" r="9" fill="none" stroke={Colors.Black[200]} stroke-width="2" />
      <circle
        stroke-dasharray="100"
        stroke-dashoffset={100 - progress * 100}
        cx="10"
        cy="10"
        r="9"
        fill="none"
        stroke={Colors.Blue[500]}
        stroke-width="2"
        pathLength="100"
      />
    </svg>
  )
}

export const ElectionProgressCardItem = ({ title, progress, text }: ElectionProgressCardItemProps) => {
  const [isDropped, setDropped] = useState(false)

  return (
    <ProgressCardItemWrapper>
      <ProgressCardItemWrap key={title} onClick={() => setDropped(!isDropped)}>
        <ProgressCardItemHeaderWrap>
          <CircleProgressBar progress={progress} />
          <StatisticBigLabel strong={true}>{title}</StatisticBigLabel>
        </ProgressCardItemHeaderWrap>
        <DropDownButton onClick={() => setDropped(!isDropped)} isDropped={isDropped} />
      </ProgressCardItemWrap>
      <StyledDropDown isDropped={isDropped}>
        <StatisticBigLabel strong={false}>{text}</StatisticBigLabel>
      </StyledDropDown>
    </ProgressCardItemWrapper>
  )
}

const ProgressCardItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};

  ${TableListItemAsLinkHover}
`

const ProgressCardItemWrap = styled.div`
  display: grid;
  grid-template-columns: auto 40px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 54px;
  padding-left: 16px;
  padding-right: 4px;
  margin-left: -1px;

  ${Skeleton} {
    min-width: 100%;
    height: 1.2rem;
  }
`
const ProgressCardItemHeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 4px;
  gap: 12px;
`

const StatisticBigLabel = styled.div<{ strong?: boolean }>`
  font-size: ${({ strong }) => (strong ? '20px' : '18px')};
  line-height: ${({ strong }) => (strong ? '28px' : '24px')};
  margin-right: 6px;
  display: inline-block;
  font-weight: ${({ strong }) => (strong ? '700' : '300')};
  color: ${({ strong }) => (strong ? `${Colors.Black[600]}` : `${Colors.Black[400]}`)};
`

const StyledDropDown = styled(DropDownToggle)`
  row-gap: 16px;
  padding: 0px 16px 16px 16px;
`

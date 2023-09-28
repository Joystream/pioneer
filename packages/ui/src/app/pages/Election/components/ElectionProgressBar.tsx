import { Placement } from '@popperjs/core'
import BN from 'bn.js'
import React, { ReactElement, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { usePopper } from 'react-popper'
import styled from 'styled-components'

import { ProgressBar, ProgressBarProps } from '@/common/components/Progress'
import {
  MultiStatisticItem,
  StatisticItemSpacedContent,
  StatisticLabel,
  StatisticItemProps,
} from '@/common/components/statistics'
import { TooltipText } from '@/common/components/Tooltip'
import { A_SECOND, AN_HOUR, A_DAY, A_MINUTE, BorderRad, Colors, Fonts, Transitions, ZIndex } from '@/common/constants'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { toNumber, intersperse } from '@/common/utils'
import { useCouncilConstants } from '@/council/hooks/useCouncilConstants'

interface ElectionProgressBarProps extends StatisticItemProps {
  electionStage: string
  value?: number | BN
  currentBlock?: number | BN
}

export const ElectionProgressBar = (props: ElectionProgressBarProps) => {
  const duration = toNumber(props.value)
  const currentBlock = toNumber(props.currentBlock)

  const _seconds = Math.floor(duration / (A_SECOND / MILLISECONDS_PER_BLOCK))
  const _minutes = Math.floor(duration / (A_MINUTE / MILLISECONDS_PER_BLOCK))
  const _hours = Math.floor(duration / (AN_HOUR / MILLISECONDS_PER_BLOCK))
  const days = Math.floor(duration / (A_DAY / MILLISECONDS_PER_BLOCK))

  const seconds = _seconds - _minutes * 60
  const minutes = _minutes - _hours * 60
  const hours = _hours - days * 24

  let announcingProgress = 0
  let votingProgress = 0
  let revealingProgress = 0
  const nextRoundProgress = 0

  let announcingColor = Colors.Blue[500]
  let votingColor = Colors.Blue[500]
  let revealingColor = Colors.Blue[500]
  const nextRoundColor = Colors.Blue[500]

  let remainDays = 0
  let announcingDays = 0
  let votingDays = 0
  let revealingDays = 0
  let nextRoundDays = 0

  let announcingEndDay = ''
  let votingEndDay = ''
  let revealingEndDay = ''
  let nextRoundEndDay = ''

  let announcingEndBlock = 0
  let votingEndBlock = 0
  let revealingEndBlock = 0
  let nextRoundEndBlock = 0

  const constants = useCouncilConstants()

  // console.log(`duration: ${duration}, constants: ${JSON.stringify(constants)}, currentBlock = ${currentBlock}`)

  if (
    !isNaN(duration) &&
    constants?.budgetRefillPeriod !== undefined &&
    constants?.election.votingPeriod != undefined &&
    constants?.election.revealingPeriod != undefined &&
    constants?.idlePeriod != undefined
  ) {
    // calculate the days per each stage
    announcingDays = Math.floor(constants?.announcingPeriod / constants?.budgetRefillPeriod)
    votingDays = Math.floor(constants?.election.votingPeriod / constants?.budgetRefillPeriod)
    revealingDays = Math.floor(constants?.election.revealingPeriod / constants?.budgetRefillPeriod)
    nextRoundDays = Math.floor(constants?.idlePeriod / constants?.budgetRefillPeriod)

    if (props.electionStage === 'announcing') {
      announcingProgress = Math.floor(100 - (100 * duration) / constants?.announcingPeriod)
      remainDays = Math.floor(
        (duration +
          constants?.election.votingPeriod +
          constants?.election.revealingPeriod +
          constants?.idlePeriod +
          constants?.budgetRefillPeriod -
          1) /
          constants?.budgetRefillPeriod
      )

      // calculate the end of day of each stage
      const date = new Date()

      date.setSeconds(date.getSeconds() + _seconds)
      announcingEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      date.setSeconds(
        date.getSeconds() + Math.floor(constants?.election.votingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK))
      )
      votingEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      date.setSeconds(
        date.getSeconds() + Math.floor(constants?.election.revealingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK))
      )
      revealingEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      date.setSeconds(date.getSeconds() + Math.floor(constants?.idlePeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)))
      nextRoundEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      // calculate the end of blocks of each stage
      announcingEndBlock = currentBlock + duration
      votingEndBlock = announcingEndBlock + constants?.election.votingPeriod
      revealingEndBlock = votingEndBlock + constants?.election.revealingPeriod
      nextRoundEndBlock = revealingEndBlock + constants?.idlePeriod
    } else if (props.electionStage === 'voting') {
      announcingProgress = 100
      announcingColor = Colors.Blue[200]

      votingProgress = Math.floor(100 - (100 * duration) / constants?.election.votingPeriod)
      remainDays = Math.floor(
        (duration + constants?.election.revealingPeriod + constants?.idlePeriod + constants?.budgetRefillPeriod - 1) /
          constants?.budgetRefillPeriod
      )

      // calculate the end of day of each stage
      const date = new Date()

      date.setSeconds(date.getSeconds() + _seconds)
      votingEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      const previousDate = date
      previousDate.setSeconds(
        previousDate.getSeconds() - Math.floor(constants?.election.votingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK))
      )
      announcingEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      date.setSeconds(
        date.getSeconds() + Math.floor(constants?.election.revealingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK))
      )
      revealingEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      date.setSeconds(date.getSeconds() + Math.floor(constants?.idlePeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)))
      nextRoundEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      // calculate the end of blocks of each stage
      votingEndBlock = currentBlock + duration
      announcingEndBlock = votingEndBlock - constants?.election.votingPeriod
      revealingEndBlock = votingEndBlock + constants?.election.revealingPeriod
      nextRoundEndBlock = revealingEndBlock + constants?.idlePeriod
    } else if (props.electionStage === 'revealing') {
      announcingProgress = 100
      votingProgress = 100

      announcingColor = Colors.Blue[200]
      votingColor = Colors.Blue[200]

      revealingProgress = Math.floor(100 - (100 * duration) / constants?.election.revealingPeriod)
      remainDays = Math.floor(
        (duration + constants?.idlePeriod + constants?.budgetRefillPeriod - 1) / constants?.budgetRefillPeriod
      )

      // calculate the end of day of each stage
      const date = new Date()

      date.setSeconds(date.getSeconds() + _seconds)
      revealingEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      const previousDate = date
      previousDate.setSeconds(
        previousDate.getSeconds() -
          Math.floor(constants?.election.revealingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK))
      )
      votingEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      previousDate.setSeconds(
        previousDate.getSeconds() - Math.floor(constants?.election.votingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK))
      )
      announcingEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      date.setSeconds(date.getSeconds() + Math.floor(constants?.idlePeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)))
      nextRoundEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      // calculate the end of blocks of each stage
      revealingEndBlock = currentBlock + duration
      votingEndBlock = revealingEndBlock - constants?.election.revealingPeriod
      announcingEndBlock = votingEndBlock - constants?.election.votingPeriod
      nextRoundEndBlock = revealingEndBlock + constants?.idlePeriod
    } else {
      announcingProgress = 100
      votingProgress = 100
      revealingProgress = 100

      announcingColor = Colors.Blue[200]
      votingColor = Colors.Blue[200]
      revealingColor = Colors.Blue[200]

      revealingProgress = Math.floor(100 - (100 * duration) / constants?.idlePeriod)

      // calculate the end of day of each stage
      const date = new Date()

      date.setSeconds(date.getSeconds() + _seconds)
      nextRoundEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      date.setSeconds(date.getSeconds() - Math.floor(constants?.idlePeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)))
      revealingEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      date.setSeconds(
        date.getSeconds() - Math.floor(constants?.election.revealingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK))
      )
      votingEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      date.setSeconds(
        date.getSeconds() - Math.floor(constants?.election.votingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK))
      )
      announcingEndDay = date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })

      // calculate the end of blocks of each stage
      nextRoundEndBlock = currentBlock + duration
      revealingEndBlock = nextRoundEndBlock - constants?.idlePeriod
      votingEndBlock = revealingEndBlock - constants?.election.revealingPeriod
      announcingEndBlock = votingEndBlock - constants?.election.votingPeriod
    }
  }

  return (
    <MultiStatisticItem {...props}>
      <StatisticItemSpacedContent key={duration}>
        <StatisticBigLabel>
          <StatisticBigLabel strong={true} style={{ textTransform: 'capitalize' }}>
            {props.electionStage}
          </StatisticBigLabel>
          <StatisticBigLabel strong={false}>ends in</StatisticBigLabel>
          <StatisticBigLabel>
            {intersperse(
              [
                [days.toString().padStart(2, '0'), 'day'],
                [hours.toString().padStart(2, '0'), 'hours'],
                [minutes.toString().padStart(2, '0'), 'minutes'],
                [seconds.toString().padStart(2, '0'), 'seconds'],
              ].flatMap(([amount, unit]) =>
                amount ? <Period key={unit} amount={amount} unit={''} tiny={false} /> : []
              ),
              (index) => (
                <Separator key={index} tiny={true} />
              )
            )}
          </StatisticBigLabel>
        </StatisticBigLabel>
        <StatisticLabel>{remainDays} days until next round</StatisticLabel>
      </StatisticItemSpacedContent>

      <ProgressBarLayout>
        <TooltipProgressBar
          start={0}
          end={announcingProgress / 100}
          color={announcingColor}
          tooltipText={`Announcing stage lasts ${announcingDays} days and ends on ${announcingEndDay} CET (block #${announcingEndBlock.toLocaleString(
            'en-US'
          )} block). During this time members can announce that they will stand as candidates for the next council`}
          placement="bottom-start"
        />
        <TooltipProgressBar
          start={0}
          end={votingProgress / 100}
          color={votingColor}
          tooltipText={`Voting stage lasts ${votingDays} days and ends on ${votingEndDay} CET (block #${votingEndBlock.toLocaleString(
            'en-US'
          )} block). During this time voters can submit votes in favor of candidates`}
          placement="bottom-start"
        />
        <TooltipProgressBar
          start={0}
          end={revealingProgress / 100}
          color={revealingColor}
          tooltipText={`Revealing stage lasts ${revealingDays} days and ends on ${revealingEndDay} CET (block #${revealingEndBlock.toLocaleString(
            'en-US'
          )} block). During this time, voters can reveal their sealed votes. Any valid vote which is unsealed is counter, and in the end a winning set of candidates is selected`}
          placement="bottom-end"
        />
        <TooltipProgressBar
          start={0}
          end={nextRoundProgress / 100}
          color={nextRoundColor}
          tooltipText={`Idle stage lasts ${nextRoundDays} days and ends on ${nextRoundEndDay} CET (block #${nextRoundEndBlock.toLocaleString(
            'en-US'
          )} block). After that time, a new round of elections begins`}
          placement="bottom-end"
        />
      </ProgressBarLayout>
    </MultiStatisticItem>
  )
}

interface TooltipProgressBarProps extends ProgressBarProps {
  tooltipText?: string
  placement?: Placement
}

const TooltipProgressBar = (props: TooltipProgressBarProps) => {
  const [isTooltipActive, setTooltipActive] = useState(false)
  const [referenceElementRef, setReferenceElementRef] = useState<HTMLElement | null>(null)
  const [popperElementRef, setPopperElementRef] = useState<HTMLDivElement | null>(null)
  const [barHeight, setBarHeight] = useState<'small' | 'big' | 'medium'>('small')
  const [arrowPos, setArrowPos] = useState<number>()

  const { styles, attributes } = usePopper(referenceElementRef, popperElementRef, {
    placement: props.end === 1 ? 'bottom' : props.placement ?? 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5], // [skidding, distance]
        },
      },
    ],
  })

  useEffect(() => {
    if (referenceElementRef) {
      const barWidth = referenceElementRef.clientWidth

      if (props.placement === 'bottom-start') {
        if (props.end === 0) setArrowPos(Math.floor(barWidth / 2))
        else setArrowPos(Math.floor(props.end * barWidth))
      } else if (props.placement === 'bottom-end') {
        if (props.end === 0) setArrowPos(Math.floor(barWidth / 2))
        else setArrowPos(Math.floor(barWidth - props.end * barWidth))
      }
    }
  }, [referenceElementRef, props.end])

  const mouseIsOver = () => {
    setBarHeight('medium')
    setTooltipActive(true)
  }
  const mouseLeft = () => {
    setBarHeight('small')
    setTooltipActive(false)
  }

  const tooltipHandlers = {
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      setTooltipActive(false)
    },
    onFocus: mouseIsOver,
    onBlur: mouseLeft,
    onPointerEnter: mouseIsOver,
    onPointerLeave: mouseLeft,
  }
  const popUpHandlers = {
    onPointerEnter: mouseIsOver,
    onPointerLeave: mouseLeft,
  }

  return (
    <>
      <ProgressBar {...props} size={barHeight} ref={setReferenceElementRef} {...tooltipHandlers} />
      {isTooltipActive &&
        ReactDOM.createPortal(
          <CustomTooltipPopupContainer
            ref={setPopperElementRef}
            style={styles.popper}
            {...attributes.popper}
            {...popUpHandlers}
            arrowPos={arrowPos}
            isTooltipActive={isTooltipActive}
          >
            <TooltipText>{props?.tooltipText}</TooltipText>
          </CustomTooltipPopupContainer>,
          document.body
        )}
    </>
  )
}

const CustomTooltipPopupContainer = styled.div<{ isTooltipActive?: boolean; forBig?: boolean; arrowPos?: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  width: max-content;
  min-width: 160px;
  max-width: 304px;
  padding: 16px 24px;
  border: 1px solid ${Colors.Black[900]};
  background-color: ${Colors.Black[700]};
  border-radius: ${BorderRad.m};
  opacity: ${({ isTooltipActive }) => (isTooltipActive ? '1' : '0')};
  transition: opacity ${Transitions.duration} ease;
  z-index: ${ZIndex.tooltip};

  &:after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: ${Colors.Black[700]};
    border: 1px solid ${Colors.Black[900]};
    transform: rotate(45deg);
    z-index: 1;
  }

  &:before {
    content: '';
    position: absolute;
    left: -8px;
    top: -8px;
    width: calc(100% + 16px);
    height: calc(100% + 16px);
    z-index: -1;
  }

  &[data-popper-placement^='top'] {
    &:after {
      bottom: -4px;
      clip-path: polygon(100% 0, 100% 100%, 0 100%);
    }
  }
  &[data-popper-placement^='bottom'] {
    &:after {
      top: -4px;
      clip-path: polygon(100% 0, 0 0, 0 100%);
    }
  }
  &[data-popper-reference-hidden='true'] {
    visibility: hidden;
    pointer-events: none;
  }
  &[data-popper-placement='bottom'] {
    &:after {
      left: 50%;
    }
  }
  &[data-popper-placement='top-start']:after,
  &[data-popper-placement='bottom-start']:after {
    left: ${({ arrowPos }) => (arrowPos ? `${arrowPos + 12}px` : '19px')};
  }
  &[data-popper-placement='top-end']:after,
  &[data-popper-placement='bottom-end']:after {
    right: ${({ arrowPos }) => (arrowPos ? `${arrowPos + 12}px` : '19px')};
  }
  &[data-popper-placement='top-start'] {
    inset: ${({ forBig }) => (forBig ? 'auto auto 5px -13px !important' : 'auto auto 4px -16px !important')};
  }
  &[data-popper-placement='top-end'] {
    inset: ${({ forBig }) => (forBig ? 'auto -12px 5px auto !important' : 'auto -16px 4px auto !important')};
  }
  &[data-popper-placement='bottom-start'] {
    inset: ${({ forBig }) => (forBig ? '5px auto auto -13px !important' : '4px auto auto -16px !important')};
  }
  &[data-popper-placement='bottom-end'] {
    inset: ${({ forBig }) => (forBig ? '5px -12px auto auto !important' : '4px -16px auto auto !important')};
  }
`
const StatisticBigLabel = styled.div<{ strong?: boolean }>`
  font-size: 20px;
  line-height: 28px;
  margin-right: 6px;
  display: inline-block;
  color: ${({ strong }) => (strong ? `${Colors.Black[900]}` : `${Colors.Black[400]}`)};
`
const ProgressBarLayout = styled.div`
  display: grid;
  grid-template-columns: 14fr 3fr 3fr 1fr;
  gap: 4px;
  width: 100%;
  max-width: 100%;
  margin-top: 8px;
  place-items: center;
`
const Period = ({ amount, unit, tiny }: { amount: number | string; unit: string; tiny?: boolean }) => (
  <Days unit={unit} tiny={tiny}>
    {amount} <Unit tiny={tiny}>{unit}</Unit>
  </Days>
)

const Days = styled.div<{ unit?: string; tiny?: boolean }>`
  display: inline-grid;
  position: relative;
  grid-auto-flow: column;
  grid-column-gap: ${({ tiny }) => (tiny ? '0' : '4px')};
  align-items: baseline;
  width: fit-content;
  color: ${({ tiny }) => (tiny ? `${Colors.Black[400]}` : `${Colors.Black[900]}`)};
  font-size: ${({ tiny }) => (tiny ? '12px' : '20px')};
  font-weight: ${({ tiny }) => (tiny ? '400' : '700')};
  font-family: ${Fonts.Grotesk};
`

const Unit = styled.span<{ tiny?: boolean }>`
  display: inline-block;
  font-size: ${({ tiny }) => (tiny ? '12px' : '14px')};
  line-height: 20px;
  font-weight: 400;
  color: ${Colors.Black[400]};
  font-family: ${Fonts.Grotesk};
`

const Separator = styled<(props: { tiny?: boolean }) => ReactElement>(() => <span>:</span>)`
  display: inline-block;
  color: ${({ tiny }) => (tiny ? `${Colors.Black[400]}` : `${Colors.Black[900]}`)};
  margin: ${({ tiny }) => (tiny ? '0' : '0 8px')};
`

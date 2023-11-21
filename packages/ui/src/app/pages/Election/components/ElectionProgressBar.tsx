import BN from 'bn.js'
import { sum } from 'lodash'
import React, { ReactElement, useState, useEffect, useMemo } from 'react'
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
  const currentBlock = toNumber(props.currentBlock)
  const duration = toNumber(props.value)
  const totalSeconds = Math.floor(duration / (A_SECOND / MILLISECONDS_PER_BLOCK))

  const convertDurationToTimeString = (duration: number) => {
    const _totalSeconds = Math.floor(duration / (A_SECOND / MILLISECONDS_PER_BLOCK))
    const _minutes = Math.floor(duration / (A_MINUTE / MILLISECONDS_PER_BLOCK))
    const _hours = Math.floor(duration / (AN_HOUR / MILLISECONDS_PER_BLOCK))
    const days = Math.floor(duration / (A_DAY / MILLISECONDS_PER_BLOCK))
    const seconds = _totalSeconds - _minutes * 60
    const minutes = _minutes - _hours * 60
    const hours = _hours - days * 24

    return intersperse(
      [
        [days.toString().padStart(2, '0'), 'day'],
        [hours.toString().padStart(2, '0'), 'hours'],
        [minutes.toString().padStart(2, '0'), 'minutes'],
        [seconds.toString().padStart(2, '0'), 'seconds'],
      ].flatMap(([amount, unit]) => (amount ? <Period key={unit} amount={amount} unit={''} tiny={false} /> : [])),
      (index) => <Separator key={index} tiny={true} />
    )
  }

  const endDayOfStage = useMemo(() => convertDurationToTimeString(duration), [duration])

  const [stageDescription, setStageDescription] = useState(props.electionStage)
  const [verbIndicator, setVerbIndicator] = useState('ends in')
  const [daysIndicator, setDaysIndicator] = useState<any>(endDayOfStage)
  const [selectedToolbarStage, setSelectedToolbarStage] = useState('')

  useEffect(() => {
    if (selectedToolbarStage === '') updateDescription(selectedToolbarStage, false)
    else updateDescription(selectedToolbarStage, true)
  }, [endDayOfStage])

  let announcingProgress = 0
  let votingProgress = 0
  let revealingProgress = 0
  let inactiveProgress = 0

  let remainDays = 0
  let announcingDays = 0
  let votingDays = 0
  let revealingDays = 0
  let inactiveDays = 0

  let announcingEndDay = ''
  let votingEndDay = ''
  let revealingEndDay = ''
  let inactiveEndDay = ''

  let announcingEndBlock = 0
  let votingEndBlock = 0
  let revealingEndBlock = 0
  let inactiveEndBlock = 0

  let progressBarAttr = '1fr 14fr 3fr 3fr'

  const constants = useCouncilConstants()

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
    inactiveDays = Math.floor(constants?.idlePeriod / constants?.budgetRefillPeriod)

    // calculate progress bar layout
    progressBarAttr = `${inactiveDays > 0 ? inactiveDays : 1}fr ${announcingDays > 0 ? announcingDays : 1}fr ${
      votingDays > 0 ? votingDays : 1
    }fr ${revealingDays > 0 ? revealingDays : 1}fr`

    // calculate progress status variables
    const stages = ['inactive', 'announcing', 'voting', 'revealing']
    const currentPosition = stages.indexOf(props.electionStage)
    const gaps = [
      constants?.announcingPeriod,
      constants?.election.votingPeriod,
      constants?.election.revealingPeriod,
      constants?.budgetRefillPeriod - 1,
    ]

    inactiveProgress = [Math.floor(100 - (100 * duration) / constants?.idlePeriod), 100, 100, 100][currentPosition]
    announcingProgress = [0, Math.floor(100 - (100 * duration) / constants?.announcingPeriod), 100, 100][
      currentPosition
    ]
    votingProgress = [0, 0, Math.floor(100 - (100 * duration) / constants?.election.votingPeriod), 100][currentPosition]
    revealingProgress = [0, 0, 0, Math.floor(100 - (100 * duration) / constants?.election.revealingPeriod)][
      currentPosition
    ]
    remainDays = Math.floor((duration + sum(gaps.slice(currentPosition))) / constants?.budgetRefillPeriod)

    const today = new Date()

    const inactiveEndDate = new Date()
    inactiveEndDate.setSeconds(
      today.getSeconds() +
        [
          totalSeconds,
          totalSeconds - Math.floor(sum(gaps.slice(0, 1)) / (A_SECOND / MILLISECONDS_PER_BLOCK)),
          totalSeconds - Math.floor(sum(gaps.slice(0, 2)) / (A_SECOND / MILLISECONDS_PER_BLOCK)),
          totalSeconds - Math.floor(sum(gaps.slice(0, 3)) / (A_SECOND / MILLISECONDS_PER_BLOCK)),
        ][currentPosition]
    )
    inactiveEndDay = inactiveEndDate.toLocaleString('en-gb', { timeZone: 'Europe/Paris' })

    const announcingEndDate = new Date()
    announcingEndDate.setSeconds(
      today.getSeconds() +
        [
          totalSeconds + Math.floor(sum(gaps.slice(0, 1)) / (A_SECOND / MILLISECONDS_PER_BLOCK)),
          totalSeconds,
          totalSeconds - Math.floor(sum(gaps.slice(1, 2)) / (A_SECOND / MILLISECONDS_PER_BLOCK)),
          totalSeconds - Math.floor(sum(gaps.slice(1, 3)) / (A_SECOND / MILLISECONDS_PER_BLOCK)),
        ][currentPosition]
    )
    announcingEndDay = announcingEndDate.toLocaleString('en-gb', { timeZone: 'Europe/Paris' })

    const votingEndDate = new Date()
    votingEndDate.setSeconds(
      today.getSeconds() +
        [
          totalSeconds + Math.floor(sum(gaps.slice(0, 2)) / (A_SECOND / MILLISECONDS_PER_BLOCK)),
          totalSeconds + Math.floor(sum(gaps.slice(1, 2)) / (A_SECOND / MILLISECONDS_PER_BLOCK)),
          totalSeconds,
          totalSeconds - Math.floor(sum(gaps.slice(2, 3)) / (A_SECOND / MILLISECONDS_PER_BLOCK)),
        ][currentPosition]
    )
    votingEndDay = votingEndDate.toLocaleString('en-gb', { timeZone: 'Europe/Paris' })

    const revealingEndDate = new Date()
    revealingEndDate.setSeconds(
      today.getSeconds() +
        [
          totalSeconds + Math.floor(sum(gaps.slice(0, 3)) / (A_SECOND / MILLISECONDS_PER_BLOCK)),
          totalSeconds + Math.floor(sum(gaps.slice(1, 3)) / (A_SECOND / MILLISECONDS_PER_BLOCK)),
          totalSeconds + Math.floor(sum(gaps.slice(2, 3)) / (A_SECOND / MILLISECONDS_PER_BLOCK)),
          totalSeconds,
        ][currentPosition]
    )
    revealingEndDay = revealingEndDate.toLocaleString('en-gb', { timeZone: 'Europe/Paris' })

    inactiveEndBlock =
      currentBlock +
      [duration, duration - sum(gaps.slice(0, 1)), duration - sum(gaps.slice(0, 2)), duration - sum(gaps.slice(0, 3))][
        currentPosition
      ]

    announcingEndBlock =
      currentBlock +
      [duration + sum(gaps.slice(0, 1)), duration, duration - sum(gaps.slice(1, 2)), duration - sum(gaps.slice(1, 3))][
        currentPosition
      ]

    votingEndBlock =
      currentBlock +
      [duration + sum(gaps.slice(0, 2)), duration + sum(gaps.slice(1, 2)), duration, duration - sum(gaps.slice(2, 3))][
        currentPosition
      ]

    revealingEndBlock =
      currentBlock +
      [duration + sum(gaps.slice(0, 3)), duration + sum(gaps.slice(1, 3)), duration + sum(gaps.slice(2, 3)), duration][
        currentPosition
      ]
  }

  const updateDescription = (selectedStage: string, choose: boolean) => {
    if (choose == false || props.electionStage === selectedStage) {
      setStageDescription(props.electionStage === 'inactive' ? 'The Round' : props.electionStage)
      setVerbIndicator(props.electionStage === 'inactive' ? 'begins in' : 'ends in')
      setDaysIndicator(endDayOfStage)
      setSelectedToolbarStage('')
      return
    }

    const stages = ['inactive', 'announcing', 'voting', 'revealing']
    const electionPos = stages.indexOf(props.electionStage)
    const selectedPos = stages.indexOf(selectedStage)

    const verbIndicatorArray = [
      ['', 'begins in', 'begins in', 'begins in'],
      ['ended on', '', 'begins in', 'begins in'],
      ['ended on', 'ended on', '', 'begins in'],
      ['ended on', 'ended on', 'ended on', ''],
    ]

    const endOfStageArray = [
      [
        '',
        endDayOfStage,
        convertDurationToTimeString(announcingEndBlock - currentBlock),
        convertDurationToTimeString(votingEndBlock - currentBlock),
      ],
      [inactiveEndDay, '', endDayOfStage, convertDurationToTimeString(votingEndBlock - currentBlock)],
      [inactiveEndDay, announcingEndDay, '', endDayOfStage],
      [inactiveEndDay, announcingEndDay, votingEndDay, ''],
    ]

    setStageDescription(selectedStage)
    setSelectedToolbarStage(selectedStage)
    setVerbIndicator(verbIndicatorArray[electionPos][selectedPos])
    setDaysIndicator(endOfStageArray[electionPos][selectedPos])
  }

  return (
    <MultiStatisticItem {...props}>
      <StatisticItemSpacedContent key={duration}>
        <StatisticBigLabel>
          <StatisticBigLabel strong={true} style={{ textTransform: 'capitalize' }}>
            {stageDescription}
          </StatisticBigLabel>
          <StatisticBigLabel strong={false}>{verbIndicator}</StatisticBigLabel>
          <StatisticBigLabel>{daysIndicator}</StatisticBigLabel>
        </StatisticBigLabel>
        <StatisticLabel>{remainDays} days until next round</StatisticLabel>
      </StatisticItemSpacedContent>

      <ProgressBarLayout layout={progressBarAttr}>
        <TooltipProgressBar
          start={0}
          end={inactiveProgress / 100}
          isCurrent={props.electionStage === 'inactive'}
          barType="inactive"
          updateDesc={updateDescription}
          tooltipText={`Idle stage lasts ${inactiveDays} days and ends on ${inactiveEndDay} CET (block #${inactiveEndBlock.toLocaleString(
            'en-gb'
          )} block). After that time, a new round of elections begins`}
        />
        <TooltipProgressBar
          start={0}
          end={announcingProgress / 100}
          isCurrent={props.electionStage === 'announcing'}
          barType="announcing"
          updateDesc={updateDescription}
          tooltipText={`Announcing stage lasts ${announcingDays} days and ends on ${announcingEndDay} CET (block #${announcingEndBlock.toLocaleString(
            'en-gb'
          )} block). During this time members can announce that they will stand as candidates for the next council`}
        />
        <TooltipProgressBar
          start={0}
          end={votingProgress / 100}
          isCurrent={props.electionStage === 'voting'}
          barType="voting"
          updateDesc={updateDescription}
          tooltipText={`Voting stage lasts ${votingDays} days and ends on ${votingEndDay} CET (block #${votingEndBlock.toLocaleString(
            'en-gb'
          )} block). During this time voters can submit votes in favor of candidates`}
        />
        <TooltipProgressBar
          start={0}
          end={revealingProgress / 100}
          isCurrent={props.electionStage === 'revealing'}
          barType="revealing"
          updateDesc={updateDescription}
          tooltipText={`Revealing stage lasts ${revealingDays} days and ends on ${revealingEndDay} CET (block #${revealingEndBlock.toLocaleString(
            'en-gb'
          )} block). During this time, voters can reveal their sealed votes. Any valid vote which is unsealed is counted, and in the end a winning set of candidates is selected`}
        />
      </ProgressBarLayout>
    </MultiStatisticItem>
  )
}

interface TooltipProgressBarProps extends ProgressBarProps {
  barType: string
  tooltipText?: string
  isCurrent: boolean
  updateDesc: (electionStage: string, inout: boolean) => void
}

const TooltipProgressBar = (props: TooltipProgressBarProps) => {
  const [referenceElementRef, setReferenceElementRef] = useState<HTMLElement | null>(null)
  const [popperElementRef, setPopperElementRef] = useState<HTMLDivElement | null>(null)
  const [isTooltipActive, setTooltipActive] = useState(false)
  const [barHeight, setBarHeight] = useState<'small' | 'big' | 'medium'>('small')
  const [arrowPos, setArrowPos] = useState<number>()

  const placement = props.end === 0 || props.end === 1 ? 'bottom' : props.end < 0.5 ? 'bottom-start' : 'bottom-end'
  const { styles, attributes } = usePopper(referenceElementRef, popperElementRef, {
    placement: placement,
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

      if (placement === 'bottom-start') {
        setArrowPos(Math.floor(props.end * barWidth))
      } else if (placement === 'bottom-end') {
        setArrowPos(Math.floor(barWidth - props.end * barWidth))
      } else {
        setArrowPos(Math.floor(barWidth))
      }
    }
  }, [referenceElementRef, props.end])

  const mouseIsOver = () => {
    setBarHeight('medium')
    setTooltipActive(true)
    props.updateDesc(props.barType, true)
  }
  const mouseLeft = () => {
    setBarHeight('small')
    setTooltipActive(false)
    props.updateDesc(props.barType, false)
  }

  const tooltipHandlers = {
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      setTooltipActive(true)
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
      <ProgressBar
        {...props}
        color={props.isCurrent ? Colors.Blue[500] : Colors.Blue[200]}
        size={barHeight}
        ref={setReferenceElementRef}
        {...tooltipHandlers}
      />
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
const ProgressBarLayout = styled.div<{ layout?: string }>`
  display: grid;
  grid-template-columns: ${({ layout }) => (layout ? layout : '1fr 14fr 3fr 3fr')};
  gap: 4px;
  width: 100%;
  max-width: 100%;
  margin-top: 8px;
  place-items: center;
  height: 20px;
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

import { clamp } from 'lodash'
import React, { useState, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { usePopper } from 'react-popper'
import styled from 'styled-components'

import { List, ListItem } from '@/common/components/List'
import { ProgressBar, ProgressBarProps } from '@/common/components/Progress'
import {
  MultiStatisticItem,
  StatisticItemSpacedContent,
  StatisticLabel,
  StatisticItemProps,
} from '@/common/components/statistics'
import { TooltipText } from '@/common/components/Tooltip'
import { TextSmall } from '@/common/components/typography'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { AN_HOUR, A_DAY, A_MINUTE, BorderRad, Colors, Transitions, ZIndex } from '@/common/constants'
import { useResponsive } from '@/common/hooks/useResponsive'
import { splitDuration, MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { useCouncilConstants } from '@/council/hooks/useCouncilConstants'
import { useCouncilPeriodInformation } from '@/council/hooks/useCouncilPeriodInformation'

import { ElectionProgressCardItem } from './ElectionProgressCardItem'

interface ElectionProgressBarProps extends StatisticItemProps {
  electionStage: string
}

const blockDurationToMs = (blockDuration: number) => blockDuration * MILLISECONDS_PER_BLOCK
const blockToDate = (duration: number) => {
  const now = Date.now()
  const msDuration = blockDurationToMs(duration)
  const date = new Date(now + msDuration)
  return `${date.toLocaleString('en-gb', { timeZone: 'Europe/Paris', dateStyle: 'short', timeStyle: 'short' })} CET`
}
const blockDurationToDays = (blockDuration: number) => Math.floor(blockDurationToMs(blockDuration) / A_DAY)

const Duration = ({ duration }: { duration: number }) => {
  const format = splitDuration([
    [A_DAY, 'd'],
    [AN_HOUR, 'h'],
    [A_MINUTE, 'm'],
  ])

  const formatDurationDate = (duration: number): [string | number, string][] => {
    if (duration * MILLISECONDS_PER_BLOCK < A_MINUTE) {
      return [['< 1', 'm']]
    }
    return format(duration * MILLISECONDS_PER_BLOCK)
  }

  return <DurationValue value={formatDurationDate(duration)} />
}

export const ElectionProgressBar = (props: ElectionProgressBarProps) => {
  const { size } = useResponsive()

  const periodInformation = useCouncilPeriodInformation()
  const currentBlock = periodInformation?.currentBlock ?? 0
  const remainingPeriod = periodInformation?.remainingPeriod ?? 0

  const endDayOfStage = useMemo(() => <Duration duration={remainingPeriod} />, [remainingPeriod])

  const [stageDescription, setStageDescription] = useState(props.electionStage)
  const [verbIndicator, setVerbIndicator] = useState('ends in')
  const [daysIndicator, setDaysIndicator] = useState<any>(endDayOfStage)
  const [selectedToolbarStage, setSelectedToolbarStage] = useState('')

  useEffect(() => {
    if (selectedToolbarStage === '') updateDescription(selectedToolbarStage, false)
    else updateDescription(selectedToolbarStage, true)
  }, [endDayOfStage])

  let announcingDays = 0
  let votingDays = 0
  let revealingDays = 0
  let inactiveDays = 0

  let progressBarAttr = '1fr 14fr 3fr 3fr'

  const constants = useCouncilConstants()

  const [inactiveEndBlock, announcingEndBlock, votingEndBlock, revealingEndBlock] = periodInformation?.periodEnds ?? []
  const endDates = useMemo(
    () => periodInformation?.periodEnds.map((block) => blockToDate(block - currentBlock)),
    [periodInformation?.currentStage]
  )
  const [inactiveEndDay, announcingEndDay, votingEndDay, revealingEndDay] = endDates ?? []

  const progresses = periodInformation?.periodEnds.map((end, index) => {
    const start = periodInformation.periodStarts[index]
    return clamp(((currentBlock - start) * 100) / (end - start), 0, 100)
  })
  const [inactiveProgress, announcingProgress, votingProgress, revealingProgress] = progresses ?? []
  const remainDays = periodInformation && blockDurationToDays(revealingEndBlock - currentBlock)

  if (
    constants?.election.votingPeriod != undefined &&
    constants?.election.revealingPeriod != undefined &&
    constants?.idlePeriod != undefined
  ) {
    // calculate the days per each stage
    announcingDays = blockDurationToDays(constants?.announcingPeriod)
    votingDays = blockDurationToDays(constants?.election.votingPeriod)
    revealingDays = blockDurationToDays(constants?.election.revealingPeriod)
    inactiveDays = blockDurationToDays(constants?.idlePeriod)

    // calculate progress bar layout
    progressBarAttr = `${inactiveDays > 0 ? inactiveDays : 1}fr ${announcingDays > 0 ? announcingDays : 1}fr ${
      votingDays > 0 ? votingDays : 1
    }fr ${revealingDays > 0 ? revealingDays : 1}fr`
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

    const endOfStageArray = [
      [
        '',
        endDayOfStage,
        <Duration duration={announcingEndBlock - currentBlock} />,
        <Duration duration={votingEndBlock - currentBlock} />,
      ],
      [inactiveEndDay, '', endDayOfStage, <Duration duration={votingEndBlock - currentBlock} />],
      [inactiveEndDay, announcingEndDay, '', endDayOfStage],
      [inactiveEndDay, announcingEndDay, votingEndDay, ''],
    ]

    setStageDescription(selectedStage)
    setSelectedToolbarStage(selectedStage)
    setVerbIndicator(selectedPos > electionPos ? 'begins in' : 'ended on')
    setDaysIndicator(endOfStageArray[electionPos][selectedPos])
  }

  return (
    <MultiStatisticItem size={size === 'xxs' || size === 'xs' ? 's' : 'l'} {...props}>
      <StatisticItemSpacedContent key={remainingPeriod} size={size}>
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
          tooltipText={`Idle stage lasts ${inactiveDays} days and ends on ${inactiveEndDay} (block #${inactiveEndBlock?.toLocaleString(
            'en-gb'
          )} block). After that time, a new round of elections begins`}
        />
        <TooltipProgressBar
          start={0}
          end={announcingProgress / 100}
          isCurrent={props.electionStage === 'announcing'}
          barType="announcing"
          updateDesc={updateDescription}
          tooltipText={`Announcing stage lasts ${announcingDays} days and ends on ${announcingEndDay} (block #${announcingEndBlock?.toLocaleString(
            'en-gb'
          )} block). During this time members can announce that they will stand as candidates for the next council`}
        />
        <TooltipProgressBar
          start={0}
          end={votingProgress / 100}
          isCurrent={props.electionStage === 'voting'}
          barType="voting"
          updateDesc={updateDescription}
          tooltipText={`Voting stage lasts ${votingDays} days and ends on ${votingEndDay} (block #${votingEndBlock?.toLocaleString(
            'en-gb'
          )} block). During this time voters can submit votes in favor of candidates`}
        />
        <TooltipProgressBar
          start={0}
          end={revealingProgress / 100}
          isCurrent={props.electionStage === 'revealing'}
          barType="revealing"
          updateDesc={updateDescription}
          tooltipText={`Revealing stage lasts ${revealingDays} days and ends on ${revealingEndDay} (block #${revealingEndBlock?.toLocaleString(
            'en-gb'
          )} block). During this time, voters can reveal their sealed votes. Any valid vote which is unsealed is counted, and in the end a winning set of candidates is selected`}
        />
      </ProgressBarLayout>
      {(size === 'xxs' || size === 'xs') && (
        <>
          <StatisticMidLabel>Stages</StatisticMidLabel>
          <List>
            <ListItem key="inactive" borderless>
              <ElectionProgressCardItem
                title="Inactive"
                progress={inactiveProgress / 100}
                text={`Idle stage lasts ${inactiveDays} days and ends on ${inactiveEndDay} (block #${inactiveEndBlock?.toLocaleString(
                  'en-gb'
                )} block). After that time, a new round of elections begins`}
              />
            </ListItem>
            <ListItem key="announcing" borderless>
              <ElectionProgressCardItem
                title="Announcing"
                progress={announcingProgress / 100}
                text={`Announcing stage lasts ${announcingDays} days and ends on ${announcingEndDay} (block #${announcingEndBlock?.toLocaleString(
                  'en-gb'
                )} block). During this time members can announce that they will stand as candidates for the next council`}
              />
            </ListItem>
            <ListItem key="voting" borderless>
              <ElectionProgressCardItem
                title="Voting"
                progress={votingProgress / 100}
                text={`Voting stage lasts ${votingDays} days and ends on ${votingEndDay} (block #${votingEndBlock?.toLocaleString(
                  'en-gb'
                )} block). During this time voters can submit votes in favor of candidates`}
              />
            </ListItem>
            <ListItem key="Revealing" borderless>
              <ElectionProgressCardItem
                title="Revealing"
                progress={revealingProgress / 100}
                text={`Revealing stage lasts ${revealingDays} days and ends on ${revealingEndDay} (block #${revealingEndBlock?.toLocaleString(
                  'en-gb'
                )} block). During this time, voters can reveal their sealed votes. Any valid vote which is unsealed is counted, and in the end a winning set of candidates is selected`}
              />
            </ListItem>
          </List>
        </>
      )}
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
  font-weight: 700;
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
const StatisticMidLabel = styled(TextSmall)`
  color: ${Colors.Black[500]};
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 700;
  padding: 16px 4px 8px 4px;
`

import BN from 'bn.js'
import React, { ReactElement, useState, useMemo } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { MultiStatisticItem, StatisticItemSpacedContent, StatisticLabel } from '@/common/components/statistics'
import { StatisticItemProps } from '@/common/components/statistics'
import { toNumber } from '@/common/utils'
import { ProgressBar, ProgressBarProps } from '@/common/components/Progress'
import { A_SECOND, AN_HOUR, A_DAY, A_MINUTE } from '@/common/constants'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { intersperse} from '@/common/utils'
import { Colors, Fonts } from '@/common/constants'
import { useCouncilConstants } from '@/council/hooks/useCouncilConstants'
import { usePopper } from 'react-popper'
import { TooltipPopupContainer, TooltipText } from '@/common/components/Tooltip'
import { Placement } from '@popperjs/core'

interface ElectionProgressBarProps extends StatisticItemProps {
  electionStage: string
  value?: number | BN
  currentBlock? : number | BN
}

export const ElectionProgressBar = (props: ElectionProgressBarProps) => {
  const duration = toNumber(props.value)
  const currentBlock = toNumber(props.currentBlock)

  const _seconds = Math.floor(duration / (A_SECOND / MILLISECONDS_PER_BLOCK))
  const _minutes = Math.floor(duration / (A_MINUTE / MILLISECONDS_PER_BLOCK) )
  const _hours = Math.floor(duration / (AN_HOUR / MILLISECONDS_PER_BLOCK) )
  const days = Math.floor(duration / (A_DAY / MILLISECONDS_PER_BLOCK) )

  const seconds = _seconds - _minutes * 60
  const minutes = _minutes - _hours * 60
  const hours = _hours - days * 24

  let announcingProgress = 0;
  let votingProgress = 0;
  let revealingProgress = 0;
  let nextRoundProgress = 0;

  let announcingColor = Colors.Blue[500];
  let votingColor = Colors.Blue[500];
  let revealingColor = Colors.Blue[500];
  let nextRoundColor = Colors.Blue[500];

  let remainDays = 0;
  let announcingDays = 0;
  let votingDays = 0;
  let revealingDays = 0;
  let nextRoundDays = 0;

  let announcingEndDay = "";
  let votingEndDay = "";
  let revealingEndDay = "";
  let nextRoundEndDay = "";

  let announcingEndBlock = 0;
  let votingEndBlock = 0;
  let revealingEndBlock = 0;
  let nextRoundEndBlock = 0;

  const constants = useCouncilConstants();

  console.log(`duration: ${duration}, constants: ${JSON.stringify(constants)}, currentBlock = ${currentBlock}`)

  if (!isNaN(duration) && 
      constants?.budgetRefillPeriod !== undefined && 
      constants?.election.votingPeriod != undefined && 
      constants?.election.revealingPeriod != undefined && 
      constants?.idlePeriod != undefined) {    

      // calculate the days per each stage
      announcingDays = Math.floor(constants?.announcingPeriod / constants?.budgetRefillPeriod);
      votingDays = Math.floor(constants?.election.votingPeriod / constants?.budgetRefillPeriod);
      revealingDays = Math.floor(constants?.election.revealingPeriod / constants?.budgetRefillPeriod);
      nextRoundDays = Math.floor(constants?.idlePeriod / constants?.budgetRefillPeriod);
    
    if (props.electionStage === 'announcing') {
      announcingProgress = Math.floor(100 - 100 * duration / constants?.announcingPeriod);
      remainDays = Math.floor((duration + constants?.election.votingPeriod + constants?.election.revealingPeriod + constants?.idlePeriod + constants?.budgetRefillPeriod - 1) / constants?.budgetRefillPeriod);

      // calculate the end of day of each stage
      const date = new Date();

      date.setSeconds(date.getSeconds() + _seconds);
      announcingEndDay = date.toISOString();

      date.setSeconds(date.getSeconds() + Math.floor(constants?.election.votingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)));
      votingEndDay = date.toISOString();

      date.setSeconds(date.getSeconds() + Math.floor(constants?.election.revealingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)));
      revealingEndDay = date.toISOString();

      date.setSeconds(date.getSeconds() + Math.floor(constants?.idlePeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)));
      nextRoundEndDay = date.toISOString();

      // calculate the end of blocks of each stage
      announcingEndBlock = currentBlock + duration;
      votingEndBlock = announcingEndBlock + constants?.election.votingPeriod;
      revealingEndBlock = votingEndBlock + constants?.election.revealingPeriod;
      nextRoundEndBlock = revealingEndBlock + constants?.idlePeriod;
    }
    else if (props.electionStage === 'voting') {
      announcingProgress = 100;
      announcingColor = Colors.Blue[200];

      votingProgress = Math.floor(100 - 100 * duration / constants?.election.votingPeriod);
      remainDays = Math.floor((duration + constants?.election.revealingPeriod + constants?.idlePeriod + constants?.budgetRefillPeriod - 1) / constants?.budgetRefillPeriod);

      // calculate the end of day of each stage
      const date = new Date();

      date.setSeconds(date.getSeconds() + _seconds);
      votingEndDay = date.toISOString();

      const previousDate = date;
      previousDate.setSeconds(previousDate.getSeconds() - Math.floor(constants?.election.votingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)));
      announcingEndDay = date.toISOString();

      date.setSeconds(date.getSeconds() + Math.floor(constants?.election.revealingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)));
      revealingEndDay = date.toISOString();

      date.setSeconds(date.getSeconds() + Math.floor(constants?.idlePeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)));
      nextRoundEndDay = date.toISOString();

      // calculate the end of blocks of each stage
      votingEndBlock = currentBlock + duration;
      announcingEndBlock = votingEndBlock - constants?.election.votingPeriod;
      revealingEndBlock = votingEndBlock + constants?.election.revealingPeriod;
      nextRoundEndBlock = revealingEndBlock + constants?.idlePeriod;
    }
    else if (props.electionStage === 'revealing') {
      announcingProgress = 100;
      votingProgress = 100;

      announcingColor = Colors.Blue[200];
      votingColor = Colors.Blue[200];

      revealingProgress = Math.floor(100 - 100 * duration / constants?.election.revealingPeriod);
      remainDays = Math.floor((duration + constants?.idlePeriod + constants?.budgetRefillPeriod - 1) / constants?.budgetRefillPeriod);

      // calculate the end of day of each stage
      const date = new Date();

      date.setSeconds(date.getSeconds() + _seconds);
      revealingEndDay = date.toISOString();

      const previousDate = date;
      previousDate.setSeconds(previousDate.getSeconds() - Math.floor(constants?.election.revealingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)));
      votingEndDay = date.toISOString();

      previousDate.setSeconds(previousDate.getSeconds() - Math.floor(constants?.election.votingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)));
      announcingEndDay = date.toISOString();

      date.setSeconds(date.getSeconds() + Math.floor(constants?.idlePeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)));
      nextRoundEndDay = date.toISOString();

      // calculate the end of blocks of each stage
      revealingEndBlock = currentBlock + duration;
      votingEndBlock = revealingEndBlock - constants?.election.revealingPeriod;
      announcingEndBlock = votingEndBlock - constants?.election.votingPeriod;
      nextRoundEndBlock = revealingEndBlock + constants?.idlePeriod;
    }
    else {
      announcingProgress = 100;
      votingProgress = 100;
      revealingProgress = 100;

      announcingColor = Colors.Blue[200];
      votingColor = Colors.Blue[200];
      revealingColor = Colors.Blue[200];

      revealingProgress = Math.floor(100 - 100 * duration / constants?.idlePeriod);

      // calculate the end of day of each stage
      const date = new Date();

      date.setSeconds(date.getSeconds() + _seconds);
      nextRoundEndDay = date.toISOString();

      date.setSeconds(date.getSeconds() - Math.floor(constants?.idlePeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)));
      revealingEndDay = date.toISOString();

      date.setSeconds(date.getSeconds() - Math.floor(constants?.election.revealingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)));
      votingEndDay = date.toISOString();

      date.setSeconds(date.getSeconds() - Math.floor(constants?.election.votingPeriod / (A_SECOND / MILLISECONDS_PER_BLOCK)));
      announcingEndDay = date.toISOString();


      // calculate the end of blocks of each stage
      nextRoundEndBlock = currentBlock + duration;
      revealingEndBlock = nextRoundEndBlock - constants?.idlePeriod;
      votingEndBlock = revealingEndBlock - constants?.election.revealingPeriod;
      announcingEndBlock = votingEndBlock - constants?.election.votingPeriod;

    }
  }
  
  return (
    <MultiStatisticItem {...props}>
      <StatisticItemSpacedContent key={duration}>
        <StatisticBigLabel>
          <StatisticBigLabel strong={true} style={{textTransform: 'capitalize'}}>
            {props.electionStage} 
          </StatisticBigLabel>
          <StatisticBigLabel strong={false}>
            ends in
          </StatisticBigLabel>
          <StatisticBigLabel>
            {
              intersperse(
                [ 
                  [days.toString().padStart(2, '0'), 'day'], 
                  [hours.toString().padStart(2, '0'), 'hours'],
                  [minutes.toString().padStart(2, '0'), 'minutes'],
                  [seconds.toString().padStart(2, '0'), 'seconds']
                ]
                  .flatMap(([amount, unit]) => (amount ? <Period key={unit} amount={amount} unit={''} tiny={false} /> : [])),
                (index) => <Separator key={index} tiny={true} />
              )
            }
          </StatisticBigLabel>
        </StatisticBigLabel>
        <StatisticLabel>
          {remainDays} days until next round
        </StatisticLabel>
      </StatisticItemSpacedContent>

      <ProgressBarLayout>
        <TooltipProgressBar start={0} end={announcingProgress / 100} color={announcingColor} 
          tooltipText={`Announcing stage lasts ${announcingDays} days and ends on ${announcingEndDay} (block # ${announcingEndBlock} block). During this time members can announce that they will stand as candidates for the next council`}
          placement='bottom-start'
        />
        <TooltipProgressBar start={0} end={votingProgress / 100} color={votingColor} 
          tooltipText={`Voting stage lasts ${votingDays} days and ends on ${votingEndDay} (block # ${votingEndBlock} block). During this time voters can submit votes in favor of candidates`}
          placement='bottom-start'
        />
        <TooltipProgressBar start={0} end={revealingProgress / 100} color={revealingColor} 
          tooltipText={`Revealing stage lasts ${revealingDays} days and ends on ${revealingEndDay} (block # ${revealingEndBlock} block). During this time, voters can reveal their sealed votes. Any valid vote which is unsealed is counter, and in the end a winning set of candidates is selected`}
          placement='bottom-end'
        />
        <TooltipProgressBar start={0} end={nextRoundProgress / 100} color={nextRoundColor} 
          tooltipText={`Idle stage lasts ${nextRoundDays} days and ends on ${nextRoundEndDay} (block # ${nextRoundEndBlock} block). After that time, a new round of elections begins`}
          placement='bottom-end'
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
  const [barHeight, setBarHeight] = useState<'small' | 'big' | 'medium'>('small');
  
  let movement = 0;
  if (props.placement === 'bottom-start')
    movement = 30;
  else
    movement = -30;

  const { styles, attributes } = usePopper(referenceElementRef, popperElementRef, {
    placement: props.placement ?? 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [movement, 0]
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top-start'],
          boundary: 'clippingParents',
        },
      },
    ],
  })

  const mouseIsOver = () => {
    setBarHeight("medium");
    setTooltipActive(true)
  }
  const mouseLeft = () => {
    console.log(`mouseLeft is called`);
    setBarHeight("small");
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
      <ProgressBar {...props} size={barHeight} ref={setReferenceElementRef} {...tooltipHandlers}/>
      {isTooltipActive &&
        (ReactDOM.createPortal(
              <TooltipPopupContainer
                ref={setPopperElementRef}
                style={styles.popper}
                {...attributes.popper}
                {...popUpHandlers}
                isTooltipActive={isTooltipActive}
              >
                <TooltipText>
                  {props?.tooltipText}
                </TooltipText>
              </TooltipPopupContainer>,
              document.body
            ))}
    </>
  )
}

const StatisticBigLabel = styled.div<{strong?: boolean}>`
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

import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'

import { BlockIcon } from '@/common/components/icons'
import { BlocksInfo, formatDuration, NumberOfBlocks } from '@/common/components/statistics'
import { Colors, Fonts, SECONDS_PER_BLOCK } from '@/common/constants'
import { plural } from '@/common/helpers'
import { formatTokenValue } from '@/common/model/formatters'
import { intersperse, isDefined } from '@/common/utils'

interface DurationValueProps {
  value: [number | string, string][]
  tiny?: boolean
  blocksLeft?: number
}

export const DurationValue = ({ value, tiny, blocksLeft }: DurationValueProps) => {
  const [countDown, setCountDown] = useState<number | undefined>(blocksLeft)

  useEffect(() => {
    if (!countDown) {
      return
    }

    const interval = setInterval(
      () =>
        setCountDown((oldTimeLeft) => {
          const newTimeLeft = (oldTimeLeft as number) - 1
          if (Math.floor(newTimeLeft) <= 0) {
            clearInterval(interval)
          }

          return Math.floor(newTimeLeft)
        }),
      1000 * SECONDS_PER_BLOCK
    )

    return () => clearInterval(interval)
  }, [])

  const formattedCountDown = countDown ? formatDuration(countDown ?? 0) : []
  const valueToShow = isDefined(countDown) ? formattedCountDown : value

  return (
    <>
      {valueToShow.length > 0 ? (
        intersperse(
          valueToShow
            .flatMap(([amount, unit]) => (amount ? <Period key={unit} amount={amount} unit={unit} tiny={tiny} /> : []))
            .slice(0, 2),
          (index) => <Separator key={index} tiny={tiny} />
        )
      ) : (
        <Days>{isDefined(countDown) ? 'Pending' : 'None'}</Days>
      )}
      {blocksLeft && (
        <BlocksInfo gap={8}>
          <BlockIcon />
          <NumberOfBlocks lighter>
            {formatTokenValue(blocksLeft)} block{plural(value)}
          </NumberOfBlocks>
        </BlocksInfo>
      )}
    </>
  )
}

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

import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useWatchMouse } from '@/common/hooks/useWatchMouse'
import { isDefined } from '@/common/utils'

interface NumberRange {
  start: number
  end: number
}
export interface RangeSlider {
  value: NumberRange
  min?: number
  max: number
  handleGap?: number
  onChange: (range: NumberRange) => void
}
export const RangeSlider = ({ value, min = 0, max, handleGap = 1, onChange }: RangeSlider) => {
  const [cursor, setCursor] = useState<number>()
  const [grabbedSide, setGrabbedSide] = useState<number>()

  const track = useRef<HTMLDivElement>(null)

  const watchMouse = useWatchMouse({
    onMouseMove({ buttons, clientX }) {
      if (buttons === 0) {
        watchMouse(false)
      } else if (track.current) {
        const { x, width } = track.current.getBoundingClientRect()
        const newCursor = (clientX - x) / width

        if (0 <= newCursor && newCursor <= 1) {
          setCursor(newCursor)
        } else if (newCursor < 0 && cursor !== 0) {
          setCursor(0)
        } else if (newCursor > 1 && cursor !== 1) {
          setCursor(1)
        }
      }
    },

    onMouseUp() {
      watchMouse(false)
      setGrabbedSide(undefined)
    },
  })

  const { start, end } = useMemo(
    () => ({
      start: value.start / (max - min),
      end: value.end / (max - min),
    }),
    [value, max, min]
  )

  const cssValue = useMemo(() => ({ '--start': `${start}`, '--end': `${end}` } as CSSProperties), [start, end])

  useEffect(() => {
    if (isDefined(cursor)) {
      const side = grabbedSide ?? Math.abs(cursor - end) - Math.abs(cursor - start)

      if (!grabbedSide) {
        setGrabbedSide(side)
      }

      const point = Math.round(cursor * (max - min))
      if (side > 0) {
        const newStart = point + handleGap <= value.end ? point : value.end - handleGap
        if (newStart !== value.start) {
          onChange({ ...value, start: newStart })
        }
      } else {
        const newEnd = point - handleGap >= value.start ? point : value.start + handleGap
        if (newEnd !== value.end) {
          onChange({ ...value, end: newEnd })
        }
      }
    }
  }, [cursor])

  return (
    <SliderContainer>
      <TextMedium>{min}</TextMedium>
      <Track ref={track} style={cssValue} onMouseDown={() => watchMouse(true)}>
        <Thumb left />
        <Thumb right />
      </Track>
      <TextMedium>{max}</TextMedium>
    </SliderContainer>
  )
}

const SliderContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  align-items: center;
  user-select: none;
`

const thumbSize = 12

const Track = styled.div`
  height: ${thumbSize}px;
  position: relative;
  margin: 0 ${thumbSize / 2}px;
  cursor: pointer;

  &::after,
  &::before {
    display: block;
    content: '';
    height: 6px;
    margin: auto;

    position: absolute;
    top: 0;
    bottom: 0;
  }

  &::after {
    background-color: ${Colors.Blue[500]};
    left: calc(var(--start, 0) * 100%);
    right: calc((1 - var(--end, 0)) * 100%);
  }

  &::before {
    background-color: ${Colors.Black[75]};
    border-radius: 3px;
    left: 0;
    right: 0;
  }
`

const Thumb = styled.button`
  background-color: ${Colors.Black[900]};
  border-radius: 50%;
  pointer-events: none;
  width: ${thumbSize}px;

  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 1;

  ${({ right }: { left?: boolean; right?: boolean }) =>
    right
      ? css`
          right: calc((1 - var(--end, 0)) * 100%);
          transform: translateX(50%);
        `
      : css`
          left: calc(var(--start, 0) * 100%);
          transform: translateX(-50%);
        `}
`

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import { ButtonGhost } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { TextExtraSmall } from '@/common/components/typography'

import { CountBadge } from '../CountBadge'

interface Props {
  items: React.ReactNode[] | React.ReactNode
  title?: string
  counter?: number
  className?: string
}

export const HorizontalScroller = React.memo(({ items, className, title, counter }: Props) => {
  const [wrapperWidth, setWrapperWidth] = useState<number>()
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calcContentMaxHeight = () => {
      setWrapperWidth(wrapperRef.current?.clientWidth)
    }

    calcContentMaxHeight()

    window.addEventListener('resize', calcContentMaxHeight)

    return () => window.removeEventListener('resize', calcContentMaxHeight)
  }, [wrapperRef, wrapperWidth])

  const scrollNumber = useMemo(() => {
    const childrenWidth = (wrapperRef.current?.children[0]?.clientWidth ?? 0) + 16
    return Math.trunc((wrapperWidth || 1) / childrenWidth) * childrenWidth
  }, [wrapperRef, wrapperWidth])

  const scrollRight = useCallback(() => {
    wrapperRef.current?.scrollBy({ left: scrollNumber, behavior: 'smooth' })
  }, [wrapperRef, scrollNumber])

  const scrollLeft = useCallback(() => {
    wrapperRef.current?.scrollBy({ left: scrollNumber * -1, behavior: 'smooth' })
  }, [wrapperRef, scrollNumber])

  return (
    <Wrapper>
      <HeaderWrapper>
        <Title bold lighter>
          {title}
          {counter && <CounterBadge count={counter} />}
        </Title>
        <ButtonWrapper>
          <ButtonGhost size="small" square onClick={scrollLeft}>
            <Arrow direction="left" />
          </ButtonGhost>
          <ButtonGhost size="small" square onClick={scrollRight}>
            <Arrow direction="right" />
          </ButtonGhost>
        </ButtonWrapper>
      </HeaderWrapper>
      <ItemsWrapper ref={wrapperRef} className={className}>
        {items}
      </ItemsWrapper>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 10px 8px;
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ItemsWrapper = styled.div`
  display: flex;
  column-gap: 16px;
  flex-wrap: nowrap;
  overflow-x: hidden;
  height: min-content;
  width: 100%;
  padding: 24px 0 24px 16px;
`

const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 5px;
  padding-right: 16px;
`

const Title = styled(TextExtraSmall)`
  text-transform: uppercase;
  padding-left: 16px;
`

const CounterBadge = styled(CountBadge)`
  margin-left: 12px;
`

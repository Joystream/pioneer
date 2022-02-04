import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { ButtonGhost } from '@/common/components/buttons'
import { CountBadge } from '@/common/components/CountBadge'
import { Arrow } from '@/common/components/icons'
import { TextExtraSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface Props {
  items: React.ReactNode[] | React.ReactNode
  title?: string
  className?: string
  count?: number
}

export const HorizontalScroller = React.memo(({ items, className, title, count }: Props) => {
  const [wrapperWidth, setWrapperWidth] = useState<number>()
  const [scrollNumber, setScrollNumber] = useState<number>(16)
  const [isTooSmallForScroll, setIsTooSmallForScroll] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calcContentMaxHeight = () => {
      setWrapperWidth(wrapperRef.current?.clientWidth)
    }

    calcContentMaxHeight()

    window.addEventListener('resize', calcContentMaxHeight)

    return () => window.removeEventListener('resize', calcContentMaxHeight)
  }, [wrapperRef, wrapperWidth])

  useLayoutEffect(() => {
    const childrenWidth = (wrapperRef.current?.children[0]?.clientWidth ?? 0) + 16
    const scrollNumber = Math.trunc((wrapperWidth || 1) / childrenWidth) * childrenWidth

    if ((wrapperWidth || 1) > childrenWidth * (wrapperRef.current?.children?.length || 1)) {
      setIsTooSmallForScroll(true)
    } else {
      setIsTooSmallForScroll(false)
    }

    setScrollNumber(scrollNumber)
  }, [wrapperRef, wrapperWidth, items])

  const scrollRight = useCallback(() => {
    wrapperRef.current?.scrollBy({ left: scrollNumber, behavior: 'smooth' })
  }, [wrapperRef, scrollNumber])

  const scrollLeft = useCallback(() => {
    wrapperRef.current?.scrollBy({ left: scrollNumber * -1, behavior: 'smooth' })
  }, [wrapperRef, scrollNumber])

  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>
          {title}
          {!!count && <CountBadge count={count} />}
        </Title>
        {!isTooSmallForScroll && (
          <ButtonWrapper>
            <ButtonGhost size="small" square onClick={scrollLeft}>
              <Arrow direction="left" />
            </ButtonGhost>
            <ButtonGhost size="small" square onClick={scrollRight}>
              <Arrow direction="right" />
            </ButtonGhost>
          </ButtonWrapper>
        )}
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
  padding: 10px 0;
`

const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 5px;
`

const Title = styled(TextExtraSmall)`
  text-transform: uppercase;
  color: ${Colors.Black[500]};
  display: flex;

  > *:last-child {
    margin-left: 5px;
  }
`

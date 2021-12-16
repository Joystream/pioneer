import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import { ButtonGhost } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'

interface Props {
  items: React.ReactNode[]
  className?: string
}

export const HorizontalScroller = React.memo(({ items, className }: Props) => {
  const [wrapperWidth, setWrapperWidth] = useState()
  const wrapperRef = useRef<any>()

  useEffect(() => {
    const calcContentMaxHeight = () => {
      wrapperRef && setWrapperWidth(wrapperRef.current?.clientWidth)
    }

    calcContentMaxHeight()

    window.addEventListener('resize', () => calcContentMaxHeight())

    return () => window.removeEventListener('resize', calcContentMaxHeight)
  }, [wrapperRef, wrapperWidth])

  const scrollNumber = useMemo(() => {
    const childrenWidth = wrapperRef.current?.children[0]?.clientWidth + 16
    return Math.trunc((wrapperWidth || 1) / childrenWidth) * childrenWidth
  }, [wrapperRef, wrapperWidth])

  const scrollRight = useCallback(() => {
    wrapperRef.current.scrollBy({ left: scrollNumber, behavior: 'smooth' })
  }, [wrapperRef, scrollNumber])

  const scrollLeft = useCallback(() => {
    wrapperRef.current.scrollBy({ left: scrollNumber * -1, behavior: 'smooth' })
  }, [wrapperRef, scrollNumber])

  return (
    <Wrapper ref={wrapperRef} className={className}>
      {items}
      <ButtonWrapper>
        <ButtonGhost size="small" square onClick={scrollLeft}>
          <Arrow direction="left" />
        </ButtonGhost>
        <ButtonGhost size="small" square onClick={scrollRight}>
          <Arrow direction="right" />
        </ButtonGhost>
      </ButtonWrapper>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  display: flex;
  column-gap: 16px;
  flex-wrap: nowrap;
  overflow-x: hidden;
  height: min-content;
  width: 100%;
  padding: 40px 8px 15px 8px;
  position: relative;
`

const ButtonWrapper = styled.div`
  position: fixed;
  top: 5px;
  right: 20px;
  display: flex;
  column-gap: 5px;
`

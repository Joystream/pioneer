import React, { ImgHTMLAttributes, useRef, useState } from 'react'
import styled from 'styled-components'

import { ReportIcon } from '@/common/components/icons/ReportIcon'

export const UserImage = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleOut = (e: any) => {
    if (e.relatedTarget !== buttonRef.current) {
      setIsHovered(false)
    }
  }

  return (
    <Wrapper onPointerOver={() => setIsHovered(true)} onPointerOut={handleOut}>
      <Image {...props} />
      {isHovered && (
        <Button ref={buttonRef}>
          <StyledReportIcon />
        </Button>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: fit-content;
`

const Image = styled.img`
  position: relative;
`

const StyledReportIcon = styled(ReportIcon)`
  pointer-events: none;
`

const Button = styled.button`
  height: 30px;
  width: 30px;
  cursor: pointer;
  border: none;
  border-radius: 2px;
  outline: none;
  background-color: #fff;
  display: grid;
  place-items: center;
  position: absolute;
  right: 8px;
  top: 8px;
`

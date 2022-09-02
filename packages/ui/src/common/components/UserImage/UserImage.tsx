import React, { ImgHTMLAttributes, useMemo, useRef } from 'react'
import styled from 'styled-components'

import { ReportIcon } from '@/common/components/icons/ReportIcon'
import { ModeratedItem } from '@/common/components/ModeratedItem'
import { Tooltip } from '@/common/components/Tooltip'
import { useImageReport } from '@/common/hooks/useImageReport'

export interface UserImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  customFallbackComponent?: React.ReactNode
}

export const UserImage = (props: UserImageProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { blacklistedImages, sendReport } = useImageReport()
  const blacklistImage = useMemo(() => blacklistedImages.find((url) => url === props.src), [blacklistedImages.length])

  return (
    <>
      {blacklistImage ? (
        props.customFallbackComponent ? (
          props.customFallbackComponent
        ) : (
          <ModeratedItem title="This image was removed by a moderator" />
        )
      ) : (
        <Wrapper ref={wrapperRef}>
          <Image {...props} />
          {sendReport && (
            <ButtonWrapper id="report-btn-wrapper">
              <Tooltip hideOnComponentLeave offset={[0, 5]} tooltipText="Report image">
                <Button onClick={() => sendReport(props.src ?? '')}>
                  <StyledReportIcon />
                </Button>
              </Tooltip>
            </ButtonWrapper>
          )}
        </Wrapper>
      )}
    </>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: fit-content;

  :hover #report-btn-wrapper {
    display: block;
  }
`

const Image = styled.img`
  position: relative;
`

const StyledReportIcon = styled(ReportIcon)`
  pointer-events: none;
`

const ButtonWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  display: none;
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
`

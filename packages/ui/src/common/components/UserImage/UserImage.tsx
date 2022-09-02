import React, { ImgHTMLAttributes, useMemo } from 'react'
import styled from 'styled-components'

import { ReportIcon } from '@/common/components/icons/ReportIcon'
import { ModeratedItem } from '@/common/components/ModeratedItem'
import { Tooltip } from '@/common/components/Tooltip'
import { useImageReport } from '@/common/hooks/useImageReport'
import { useModal } from '@/common/hooks/useModal'
import { ReportContentModalCall } from '@/common/modals/ReportContentModal'

export interface UserImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  customFallbackComponent?: React.ReactNode
}

export const UserImage = (props: UserImageProps) => {
  const { blacklistedImages, sendReport } = useImageReport()
  const { showModal } = useModal()

  const src = props.src
  const blacklistImage = useMemo(() => blacklistedImages.some((url) => url === src), [blacklistedImages.length])

  return (
    <>
      {blacklistImage ? (
        props.customFallbackComponent ? (
          props.customFallbackComponent
        ) : (
          <ModeratedItem title="This image was removed by a moderator" />
        )
      ) : (
        <Wrapper>
          <Image {...props} />
          {sendReport && src && (
            <ButtonWrapper>
              <Tooltip hideOnComponentLeave offset={[0, 5]} tooltipText="Report image">
                <Button
                  onClick={() =>
                    showModal<ReportContentModalCall>({ modal: 'ReportContentModal', data: { report: src } })
                  }
                >
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

const ButtonWrapper = styled.span`
  position: absolute;
  right: 8px;
  top: 8px;
  display: none;
`

const Wrapper = styled.span`
  display: block;
  position: relative;
  width: fit-content;

  :hover ${ButtonWrapper} {
    display: block;
  }
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
`

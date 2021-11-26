import { AnimatePresence } from 'framer-motion'
import React, { ReactNode, useCallback, useEffect } from 'react'

import { PageHeaderRow, PageHeaderWrapper } from '@/app/components/PageLayout'
import { ButtonsGroup } from '@/common/components/buttons'
import { HintButton } from '@/common/components/buttons/HintButton'
import { PageTitle } from '@/common/components/page/PageTitle'
import { VideoHint } from '@/common/components/VideoHint'
import { videoHints, VideoHintType } from '@/common/constants/videoHints'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useToggle } from '@/common/hooks/useToggle'

interface PageHeaderWithHintProps {
  title: string
  hintType: VideoHintType
  buttons?: ReactNode
  tabs?: ReactNode
}

export const PageHeaderWithHint = ({ title, hintType, buttons, tabs }: PageHeaderWithHintProps) => {
  const [hintFinished, setHintFinished] = useLocalStorage<boolean>(hintType + '-hint')
  const [experiencedCloseTooltip, setExperiencedCloseTooltip] = useLocalStorage<boolean>('experience-close-tooltip')
  const [showCloseTooltip, toggleCloseTooltip] = useToggle(false)
  const [isHintVisible, toggleHint] = useToggle(!hintFinished)

  useEffect(() => {
    if (!isHintVisible && !hintFinished) {
      setHintFinished(true)
    }
  }, [isHintVisible])

  const closeHint = useCallback(() => {
    toggleHint()

    if (!experiencedCloseTooltip) {
      toggleCloseTooltip()
      setExperiencedCloseTooltip(true)
    }
  }, [experiencedCloseTooltip])

  return (
    <PageHeaderWrapper>
      <PageHeaderRow>
        <PageTitle>{title}</PageTitle>
        <ButtonsGroup>
          {buttons}
          <HintButton
            isActive={isHintVisible}
            onClick={toggleHint}
            tooltip={showCloseTooltip ? 'Click here to see video again' : undefined}
            onTooltipClose={() => toggleCloseTooltip()}
            isOnTop={showCloseTooltip}
          />
        </ButtonsGroup>
      </PageHeaderRow>
      {tabs}
      <AnimatePresence>
        {isHintVisible && <VideoHint videoURI={videoHints[hintType]} onClose={closeHint} />}
      </AnimatePresence>
    </PageHeaderWrapper>
  )
}

import { AnimatePresence } from 'framer-motion'
import React, { useCallback, useEffect, useMemo } from 'react'

import { PageHeader, PageHeaderProps } from '@/app/components/PageHeader'
import { HintButton } from '@/common/components/buttons/HintButton'
import { VideoHint } from '@/common/components/VideoHint'
import { videoHints, VideoHintType } from '@/common/constants/videoHints'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useToggle } from '@/common/hooks/useToggle'

interface PageHeaderWithHintProps extends PageHeaderProps {
  hintType: VideoHintType
}

export const PageHeaderWithHint = ({ title, hintType, buttons, tabs }: PageHeaderWithHintProps) => {
  //TODO has to be uncomment when movies will be ready

  // const [hintFinished, setHintFinished] = useLocalStorage<boolean>(hintType + '-hint')
  // const [experiencedCloseTooltip, setExperiencedCloseTooltip] = useLocalStorage<boolean>('experience-close-tooltip')
  // const [showCloseTooltip, toggleCloseTooltip] = useToggle(false)
  // const [isHintVisible, toggleHint] = useToggle(!hintFinished)

  // useEffect(() => {
  //   if (!isHintVisible && !hintFinished) {
  //     setHintFinished(true)
  //   }
  // }, [isHintVisible])

  // const closeHint = useCallback(() => {
  //   toggleHint()
  //
  //   if (!experiencedCloseTooltip) {
  //     toggleCloseTooltip()
  //     setExperiencedCloseTooltip(true)
  //   }
  // }, [experiencedCloseTooltip])

  const compiledButtons = useMemo(
    () => (
      <>
        {buttons}
        {/*<HintButton*/}
        {/*  isActive={isHintVisible}*/}
        {/*  onClick={toggleHint}*/}
        {/*  tooltip={showCloseTooltip ? 'Click here to see video again' : undefined}*/}
        {/*  onTooltipClose={() => toggleCloseTooltip()}*/}
        {/*  isOnTop={showCloseTooltip}*/}
        {/*/>*/}
      </>
    ),
    // [isHintVisible, showCloseTooltip]
    []
  )
  //
  // const video = useMemo(
  //   () => (
  //     <AnimatePresence>
  //       {isHintVisible && <VideoHint videoURI={videoHints[hintType]} onClose={closeHint} />}
  //     </AnimatePresence>
  //   ),
  //   [hintType, closeHint, isHintVisible]
  // )

  return (
    <PageHeader
      title={title}
      tabs={tabs}
      buttons={compiledButtons}
      // video={video}
    />
  )
}

import React from 'react'

import { PageHeader, PageHeaderProps } from '@/app/components/PageHeader'
import { VideoHintType } from '@/common/constants/videoHints'

interface PageHeaderWithHintProps extends PageHeaderProps {
  hintType: VideoHintType
}

export const PageHeaderWithHint = ({ title, buttons, tabs }: PageHeaderWithHintProps) => {
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

  // const compiledButtons = useMemo(
  //   () => (
  //     <>
  //       {buttons}
  //       <HintButton
  //         isActive={isHintVisible}
  //         onClick={toggleHint}
  //         tooltip={showCloseTooltip ? 'Click here to see video again' : undefined}
  //         onTooltipClose={() => toggleCloseTooltip()}
  //         isOnTop={showCloseTooltip}
  //       />
  //     </>
  //   ),
  //   [isHintVisible, showCloseTooltip]
  // )
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
      buttons={buttons}
      // buttons={compiledButtons}
      // video={video}
    />
  )
}

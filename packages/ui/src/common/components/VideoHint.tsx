import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

import { Close, CloseButton } from '@/common/components/buttons'
import { Colors, RemoveScrollbar } from '@/common/constants'

interface VideoHintProps {
  videoURI: string
  onClose: () => void
}

export const VideoHint = ({ videoURI, onClose }: VideoHintProps) => {
  return (
    <VideoHintContainer
      initial={{ minHeight: '0px' }}
      animate={{ minHeight: '450px' }}
      exit={{ minHeight: 0 }}
      transition={{ duration: 0.25 }}
    >
      <VideoHintWrapper>
        <VideoHintInnerWrapper>
          <CloseButton onClick={onClose} />
          <iframe src={videoURI} title="Video preview" frameBorder="0" allowFullScreen />
        </VideoHintInnerWrapper>
      </VideoHintWrapper>
    </VideoHintContainer>
  )
}

const VideoHintContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-height: 450px;
`

const VideoHintWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% + 48px);
  max-width: calc(100% + 48px);
  height: 100%;
  max-height: 100%;
  background-color: ${Colors.Black[700]};
  transform: translate(-50%, -50%);
  overflow: hidden;

  ${RemoveScrollbar};

  iframe {
    width: 100%;
    max-width: 660px;
  }

  ${Close} {
    position: absolute;
    right: 16px;
    top: 16px;
  }
`
const VideoHintInnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 36px;
  width: 100%;
  height: 100%;
`

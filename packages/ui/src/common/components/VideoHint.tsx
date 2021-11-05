import React from 'react'
import styled from 'styled-components'

import { Close, CloseButton } from '@/common/components/buttons'
import { Colors } from '@/common/constants'

interface VideoHintProps {
  onClose: () => void
}

export const VideoHint = ({ onClose }: VideoHintProps) => {
  return (
    <VideoHintWrapper>
      <CloseButton onClick={onClose} />
      <iframe
        src="https://www.youtube.com/embed/cC-tTakpJEs"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </VideoHintWrapper>
  )
}

const VideoHintWrapper = styled.div`
  background: ${Colors.Black[700]};
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 600px;
  position: relative;

  iframe {
    padding: 20px;
    width: 70%;
  }

  ${Close} {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`

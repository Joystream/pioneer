import { AnimatePresence, ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion'
import React, { useMemo } from 'react'
import styled, { StyledComponent } from 'styled-components'

import { useApi } from '@/api/hooks/useApi'
import { Tooltip } from '@/common/components/Tooltip'
import { Colors } from '@/common/constants'
import { Rotate } from '@/common/constants/animations'

export const ConnectionStatusDot = () => {
  const { connectionState, qnConnectionState } = useApi()

  const [tooltipText, DotElement] = useMemo((): [
    string,
    StyledComponent<ForwardRefComponent<HTMLDivElement, HTMLMotionProps<'div'>>, any>
  ] => {
    if (connectionState === 'connecting' || qnConnectionState === 'connecting') {
      return ['Connecting...', ConnectingDot]
    }

    if (connectionState === 'connected' && qnConnectionState === 'connected') {
      return ['Pioneer has a connection with all nodes and is fully operational.', ConnectedDot]
    }

    if (qnConnectionState === 'error') {
      return [
        'Pioneer failed to connect to the QueryNode. This will result in lack of data on site. Try to refresh the page or contact maintainer if it does not help.',
        ErrorDot,
      ]
    }

    return [
      // 'Pioneer is currently experiencing connection issues with the Joystream node and may not work properly. We recommend you refrain from creating proposals, forum posts, etc., until Pioneer is fully operational.',
      'Pioneer failed to connect to the chain node. This will impact chain oriented feature like execution of transactions. Try to refresh the page or contact maintainer if it does not help.',
      ErrorDot,
    ]
  }, [connectionState, qnConnectionState])

  return (
    <Tooltip tooltipText={tooltipText}>
      <AnimatePresence>
        <DotElement
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
    </Tooltip>
  )
}

const ConnectingDot = styled(motion.div)`
  height: 15px;
  width: 15px;
  background-color: transparent;
  border-radius: 50%;
  border: 2px solid ${Colors.Black[400]};
  position: relative;
  animation: ${Rotate} 1s linear infinite;
  ::after {
    display: block;
    content: ' ';
    width: 15px;
    height: 6px;
    top: -5px;
    position: absolute;
    background-color: ${Colors.Black[900]};
  }
`

const ConnectedDot = styled(motion.div)`
  height: 6px;
  width: 7px;
  margin: 7px;
  background-color: ${Colors.Green[400]};
  border-radius: 50%;
  box-shadow: 0 0 3px 6px ${Colors.Green[400]}51, 0 0 3px 6px ${Colors.Green[400]}31;
`

const ErrorDot = styled(motion.div)`
  height: 17px;
  width: 17px;
  border-radius: 50%;
  background-color: ${Colors.Negative[500]};

  ::after {
    content: '!';
    display: block;
    color: white;
    text-align: center;
    width: 90%;
    font-family: fantasy;
  }
`

import React, { useMemo } from 'react'
import styled from 'styled-components'

import { useApi } from '@/api/hooks/useApi'
import { Tooltip } from '@/common/components/Tooltip'
import { Colors } from '@/common/constants'

export const ConnectionStatusDot = () => {
  const { connectionState } = useApi()

  const [tooltipText, dot] = useMemo((): [string, React.ReactElement] => {
    if (connectionState === 'connecting') {
      return ['Connecting...', <ConnectingDot />]
    }

    if (connectionState === 'connected') {
      return ['Pioneer has a connection with all nodes and is fully operational.', <ErrorDot />]
      // return ['Pioneer has a connection with all nodes and is fully operational.', <ConnectedDot />]
    }

    return ['Fallback', <ConnectedDot />]
  }, [connectionState])

  return <Tooltip tooltipText={tooltipText}>{dot}</Tooltip>
}

const ConnectingDot = styled.div`
  height: 15px;
  width: 15px;
  background-color: transparent;
  border-radius: 50%;
  border: 2px solid ${Colors.Black[400]};
`

const ConnectedDot = styled.div`
  height: 6px;
  width: 6px;
  margin: 7px;
  background-color: ${Colors.Green[400]};
  border-radius: 50%;
  box-shadow: 0 0 3px 6px ${Colors.Green[400]}51, 0 0 3px 6px ${Colors.Green[400]}31;
`

const ErrorDot = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: ${Colors.Negative[500]};

  ::after {
    content: '!';
    display: block;
    color: white;
    text-align: center;
    width: 100%;
  }
`

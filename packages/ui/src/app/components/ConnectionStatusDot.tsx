import { AnimatePresence, ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion'
import React, { useMemo } from 'react'
import styled, { StyledComponent } from 'styled-components'

import { useApi } from '@/api/hooks/useApi'
import { Tooltip } from '@/common/components/Tooltip'
import { Colors } from '@/common/constants'
import { Rotate } from '@/common/constants/animations'
import { useObservable } from '@/common/hooks/useObservable'
import { useQueryNodeStateSubscription } from '@/common/hooks/useQueryNode'

const MAX_INDEXER_BLOCKS_BEHIND_NODE_HEAD = 20

interface ConnectionStatusDotProps {
  onlyPerformance?: boolean
  className?: string
}

export const ConnectionStatusDot = ({ onlyPerformance = false, className }: ConnectionStatusDotProps) => {
  const { api, connectionState, qnConnectionState, history } = useApi()
  const { queryNodeState } = useQueryNodeStateSubscription()
  const header = useObservable(() => api?.rpc.chain.subscribeNewHeads(), [api?.isConnected])

  const qn = useMemo(() => {
    if (queryNodeState && header) {
      const head = header.toJSON().number as number
      const indexerHead = Number(queryNodeState.indexerHead)
      const delay = head - indexerHead
      const isLate = delay > MAX_INDEXER_BLOCKS_BEHIND_NODE_HEAD
      const status = isLate ? 'delayed' : 'connected'
      return { ...queryNodeState, delay, isLate, status, maxDelay: MAX_INDEXER_BLOCKS_BEHIND_NODE_HEAD }
    } else return { ...queryNodeState, status: 'connecting' }
  }, [header, queryNodeState])

  const [tooltipText, DotElement] = useMemo((): [
    string,
    StyledComponent<ForwardRefComponent<HTMLDivElement, HTMLMotionProps<'div'>>, any> | null
  ] => {
    if (qn.status === 'late') {
      // We should not infer connection issues from indexer delays. => add 'warning' state with yellow dot
      // to signal that values could be outdated and finalized blocks may be picked up late.
      return [
        'Pioneer is currently experiencing connection issues with the Joystream node and may not work properly. We recommend you refrain from creating proposals, forum posts, etc., until Pioneer is fully operational.',
        ErrorDot, // WarningDot
      ]
    }

    if (onlyPerformance) {
      return ['', null]
    }

    if (connectionState === 'connecting' || qnConnectionState === 'connecting') {
      return ['Api: Connecting...', ConnectingDot]
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
      'Pioneer failed to connect to the chain node. This will impact chain oriented feature like execution of transactions. Try to refresh the page or contact maintainer if it does not help.',
      ErrorDot,
    ]
  }, [connectionState, qnConnectionState, qn])

  if (!DotElement) {
    return null
  }

  const QNStatus = () => <div>QN: {qn.indexerHead ? qn.indexerHead + ` (${qn.status})` : qn.status}</div>

  const formattedStatus = (
    <>
      <div>{tooltipText}</div>
      <QNStatus />
      {history?.slice(0, 9).map(({ time, state }, i) => (
        <div key={`log-item-${i}`}>
          {time.getHours()}:{time.getMinutes()} api {state}
        </div>
      ))}
    </>
  )

  return (
    <span className={className}>
      <Tooltip tooltipText={formattedStatus}>
        <AnimatePresence>
          <DotElement
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </Tooltip>
    </span>
  )
}

const ConnectingDot = styled(motion.div).attrs({
  id: 'connecting-dot',
})`
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

const ConnectedDot = styled(motion.div).attrs({
  id: 'connected-dot',
})`
  height: 6px;
  width: 7px;
  margin: 7px;
  background-color: ${Colors.Green[400]};
  border-radius: 50%;
  box-shadow: 0 0 3px 6px ${Colors.Green[400]}51, 0 0 3px 6px ${Colors.Green[400]}31;
`

const ErrorDot = styled(motion.div).attrs({
  id: 'error-dot',
})`
  height: 17px;
  width: 17px;
  border-radius: 50%;
  background-color: ${Colors.Negative[500]};

  ::after {
    content: '!';
    display: block;
    color: white;
    text-align: center;
    width: 96%;
    font-family: fantasy;
  }
`

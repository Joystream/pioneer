import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ArrowRightIcon, FileIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { Modal, ModalBody, ModalHeader } from '@/common/components/Modal'
import { StatisticItem, Statistics } from '@/common/components/statistics'
import { StatisticButton } from '@/common/components/statistics/StatisticButton'
import { TextBig } from '@/common/components/typography'
import { useRuntimeBytecode } from '@/proposals/hooks/useRuntimeBytecode'

import { RuntimeUpgrade } from '../../types/ProposalDetails'

import { ProposalPropertiesContent } from './ProposalDetails'

interface RuntimeUpgradeProps {
  details: RuntimeUpgrade
}

export const RuntimeUpgradeComponent: ProposalPropertiesContent<'runtimeUpgrade'> = ({
  details,
}: RuntimeUpgradeProps) => {
  const [downloadOpen, setDownloadOpen] = useState(false)
  return (
    <>
      <Statistics>
        <StatisticButton
          title="Blob"
          onClick={() => {
            setDownloadOpen(true)
          }}
          icon={<ArrowRightIcon />}
        >
          <TextBig>
            <FileIcon /> File Preview
          </TextBig>
        </StatisticButton>
      </Statistics>
      {details.newBytecodeId && downloadOpen && (
        <RuntimeDownloadModal id={details.newBytecodeId} onClose={() => setDownloadOpen(false)} />
      )}
    </>
  )
}

interface RuntimeDownloadProps {
  id: string
  onClose: () => void
}

const RuntimeDownloadModal = ({ id, onClose }: RuntimeDownloadProps) => {
  const { isLoading, runtimeBytecode } = useRuntimeBytecode(id)

  return (
    <Modal modalSize="xs" onClose={onClose}>
      <ModalHeader icon={<FileIcon />} onClick={onClose} title="Download Bytecode" />
      <ModalBody>{isLoading ? <Loading /> : <Link to="">Download the file</Link>}</ModalBody>
    </Modal>
  )
}

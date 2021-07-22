import React, { useMemo, useState } from 'react'

import { ArrowRightIcon, FileIcon } from '@/common/components/icons'
import { StyledLink } from '@/common/components/Link'
import { Loading } from '@/common/components/Loading'
import { Modal, ModalBody, ModalHeader } from '@/common/components/Modal'
import { Statistics } from '@/common/components/statistics'
import { StatisticButton } from '@/common/components/statistics/StatisticButton'
import { TextInlineBig } from '@/common/components/typography'
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
          <FileIcon />
          <TextInlineBig bold value>
            File Preview
          </TextInlineBig>
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
  const downloadHref = useMemo(() => {
    if (!runtimeBytecode) return ''
    const base64string = Buffer.from(runtimeBytecode.bytecode.replace(/^0x/, ''), 'hex').toString('base64')
    return `data:application/octet-stream;base64,${base64string}`
  }, [runtimeBytecode?.bytecode])

  return (
    <Modal modalSize="xs" onClose={onClose}>
      <ModalHeader icon={<FileIcon />} onClick={onClose} title="Download Bytecode" />
      <ModalBody>
        {isLoading || !downloadHref ? (
          <Loading />
        ) : (
          <StyledLink href={downloadHref} download={`bytecode_${id}.wasm`}>
            Download the file
          </StyledLink>
        )}
      </ModalBody>
    </Modal>
  )
}

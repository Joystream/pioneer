import React, { useMemo, useState } from 'react'

import { ArrowRightIcon, FileIcon } from '@/common/components/icons'
import { StyledLink } from '@/common/components/Link'
import { StatisticItem, Statistics } from '@/common/components/statistics'
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
  const [download, setDownload] = useState(false)
  return (
    <Statistics>
      {download && details.newBytecodeId ? (
        <RuntimeDownload id={details.newBytecodeId} onClose={() => setDownload(false)} />
      ) : (
        <StatisticButton
          title="Blob"
          onClick={() => {
            setDownload(true)
          }}
          icon={<ArrowRightIcon />}
        >
          <FileIcon />
          <TextInlineBig bold value>
            File Preview
          </TextInlineBig>
        </StatisticButton>
      )}
    </Statistics>
  )
}

interface RuntimeDownloadProps {
  id: string
  onClose: () => void
}

const RuntimeDownload = ({ id }: RuntimeDownloadProps) => {
  const { isLoading, runtimeBytecode } = useRuntimeBytecode(id)
  const downloadHref = useMemo(() => {
    if (!runtimeBytecode) return ''
    const base64string = Buffer.from(runtimeBytecode.bytecode.replace(/^0x/, ''), 'hex').toString('base64')
    return `data:application/octet-stream;base64,${base64string}`
  }, [runtimeBytecode?.bytecode])

  return (
    <StatisticItem title="Blob">
      <FileIcon />
      {isLoading || !downloadHref ? (
        <TextInlineBig bold value>
          Downloading file...
        </TextInlineBig>
      ) : (
        <TextInlineBig bold value>
          <StyledLink href={downloadHref} download={`bytecode_${id}.wasm`}>
            Save
          </StyledLink>
        </TextInlineBig>
      )}
    </StatisticItem>
  )
}

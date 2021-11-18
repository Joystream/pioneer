import React, { useEffect } from 'react'

import { ArrowRightIcon, FileIcon } from '@/common/components/icons'
import { StatisticButton } from '@/common/components/statistics/StatisticButton'
import { TextInlineBig } from '@/common/components/typography'
import { downloadFile } from '@/common/utils/downloadFile'
import { useRuntimeBytecode } from '@/proposals/hooks/useRuntimeBytecode'

interface Props {
  label: string
  value: string
}

export const RuntimeBlob = ({ label, value: newBytecodeId }: Props) => {
  const { state, runtimeBase64string, fetch } = useRuntimeBytecode(newBytecodeId)

  const download = () =>
    downloadFile(`bytecode_${newBytecodeId}.wasm`, `data:application/octet-stream;base64,${runtimeBase64string}`)

  useEffect(() => {
    if (state === 'loaded') {
      download()
    }
  }, [state])

  const onClick = () => {
    if (state !== 'loaded') {
      fetch()
    } else {
      download()
    }
  }

  return (
    <StatisticButton title={label} onClick={onClick} disabled={state === 'loading'} icon={<ArrowRightIcon />}>
      <FileIcon />
      <TextInlineBig bold value>
        {state === 'loading' ? 'Downloading file...' : 'File Preview'}
      </TextInlineBig>
    </StatisticButton>
  )
}

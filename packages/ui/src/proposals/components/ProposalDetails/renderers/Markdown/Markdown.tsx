import React, { useState } from 'react'

import { ArrowRightIcon, FileIcon } from '@/common/components/icons'
import { StatisticButton } from '@/common/components/statistics/StatisticButton'
import { TextInlineBig } from '@/common/components/typography'

import { OpeningDescriptionPreview } from './components'

interface Props {
  label: string
  value: string
}

export const Markdown = ({ label, value }: Props) => {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false)

  return (
    <>
      <StatisticButton
        title="Description"
        onClick={() => {
          setDescriptionVisible(true)
        }}
        icon={<ArrowRightIcon />}
      >
        <FileIcon />
        <TextInlineBig bold value>
          {label}
        </TextInlineBig>
      </StatisticButton>
      {isDescriptionVisible && (
        <OpeningDescriptionPreview description={value} onClose={() => setDescriptionVisible(false)} />
      )}
    </>
  )
}

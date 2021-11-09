import React from 'react'

import {Label} from '@/common/components/typography'

interface Props {
  label: string
  value: string
}

export const NormalTextDetails = ({
  label,
  value,
}: Props) => {
  return (
    <>
      <Label>{label}</Label>
      <div>{value}</div>
    </>
  )
}

export default NormalTextDetails

import React from 'react'

interface Props {
  text?: string
}

export const Loading = ({ text }: Props) => <h3>{text ?? 'Loading...'}</h3>

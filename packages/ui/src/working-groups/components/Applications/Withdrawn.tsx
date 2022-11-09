import React from 'react'

export const Withdrawn = (props: { current: number; total: number }) => {
  const { current, total } = props
  const withdrawn = total - current
  return current && withdrawn > 0 ? <> / {withdrawn}</> : <></>
}

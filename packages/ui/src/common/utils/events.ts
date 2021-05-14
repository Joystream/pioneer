import React from 'react'

export const stopEvent = <E extends React.SyntheticEvent<any>>(e: E): void => {
  e.preventDefault()
  e.stopPropagation()
}

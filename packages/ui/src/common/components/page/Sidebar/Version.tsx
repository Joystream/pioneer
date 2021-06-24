import React from 'react'
import styled from 'styled-components'

export function Version() {
  return <VersionText>Version: {GIT_VERSION}&nbsp;</VersionText>
}

const VersionText = styled.div`
  display: flex;
  position: absolute;
  bottom: 8px;
  left: 16px;
  justify-content: center;
  align-items: center;
`

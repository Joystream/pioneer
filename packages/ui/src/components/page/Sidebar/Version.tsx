import React from 'react'
import styled from 'styled-components'

export function Version() {
  return <VersionText>Version: {GIT_VERSION}&nbsp;</VersionText>
}

const VersionText = styled.div`
  display: grid;
  grid-area: barversion;
  justify-content: center;
  align-items: center;
`

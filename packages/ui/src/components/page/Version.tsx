import styled from 'styled-components'
import React from 'react'

/* global GIT_VERSION */

export function Version() {
  return <VersionText>Version: {GIT_VERSION}</VersionText>
}

const VersionText = styled.div`
  position: absolute;
  bottom: 12px;
  left: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

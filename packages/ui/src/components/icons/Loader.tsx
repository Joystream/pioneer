import React from 'react'
import styled from 'styled-components'
import { BorderRad, Colors } from '../../constants/styles'

export function Loader() {
  return <LoaderComponent />
}

export const LoaderComponent = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${Colors.Black[900]};
  border-right: 4px solid transparent;
  border-radius: ${BorderRad.round};
  animation: spinLoader 1s infinite linear;

  @keyframes spinLoader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

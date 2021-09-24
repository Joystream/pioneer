import React from 'react'
import styled from 'styled-components'

import { Colors, BorderRad, Transitions } from '../constants'

export function LoadingAnimation({ className }: { className?: string }) {
  return (
    <LoaderComponent viewBox="0 0 24 24" fill="none" className={className}>
      <path className="loading-stroke-1" d="M4 12a8 8 0 1 1 8 8" />
      <path className="loading-stroke-2" d="M4 12a8 8 0 1 1 8 8" />
    </LoaderComponent>
  )
}

export const LoaderComponent = styled.svg`
  width: 24px;
  height: 24px;
  border-radius: ${BorderRad.round};

  .loading-stroke-1,
  .loading-stroke-2 {
    stroke-linecap: round;
    fill: none;
    transform-origin: 50% 50%;
    stroke-dasharray: 40;
    stroke-dashoffset: 12;
  }
  .loading-stroke-1 {
    stroke: ${Colors.Blue[300]};
    animation: spinLoader ${Transitions.showResult} cubic-bezier(0.3, 1.65, 0.7, -0.65) infinite;
  }
  .loading-stroke-2 {
    stroke: ${Colors.Blue[500]};
    animation: spinLoader ${Transitions.showResult} cubic-bezier(0.1, 1.2, 0.3, -0.6) infinite;
  }

  @keyframes spinLoader {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

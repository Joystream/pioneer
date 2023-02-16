import React from 'react'
import styled from 'styled-components'

import { Colors, Transitions } from '../../../constants'

import { SymbolProps } from './common'

export function LinkSymbol({ className, color }: SymbolProps) {
  return (
    <LinkSymbolStyle
      viewBox={className == 'sidebarLinkSymbol' ? '0 0 16 16' : '0 0 24 24'}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      color="currentColor"
      className={className}
    >
      {className == 'sidebarLinkSymbol' ? (
        <path
          className="primaryPart"
          d="M9 1H8V3H9H11.5858L5.29289 9.29289L4.58579 10L6 11.4142L6.70711 10.7071L13 4.41421V7V8H15V7V2L14 1H9ZM2 3L1 4V14L2 15H12L13 14V11V10H11V11V13H3V5H5H6V3H5H2Z"
          fill={color ?? Colors.Blue[500]}
          fillRule="evenodd"
          clipRule="evenodd"
        />
      ) : (
        <>
          <path
            className="blackPart"
            d="M1.1001 3.99998L2.0001 3.09998H12.8001V4.89998H2.9001V21.1H19.1001V11.2H20.9001V22L20.0001 22.9H2.0001L1.1001 22V3.99998Z"
            fill={color ?? Colors.Black[900]}
          />
          <path
            className="primaryPart"
            d="M15.4999 1.09998H21.9999L22.8999 1.99998V8.49998H21.0999V4.17277L10.6363 14.6364L9.36353 13.3636L19.8271 2.89998H15.4999V1.09998Z"
            fill={color ?? Colors.Blue[500]}
          />
        </>
      )}
    </LinkSymbolStyle>
  )
}

export const LinkSymbolStyle = styled.svg`
  height: 16px;
  width: 16px;
  position: relative;

  .blackPart {
    fill: ${Colors.Black[900]};
    transition: ${Transitions.all};
  }
  .primaryPart {
    fill: ${Colors.Blue[500]};
    transition: ${Transitions.all};
  }
`

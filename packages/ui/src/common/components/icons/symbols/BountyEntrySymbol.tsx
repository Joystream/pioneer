import React from 'react'
import styled from 'styled-components'

import { Colors, Transitions } from '@/common/constants'

interface SymbolProps {
  className?: string
}

export function BountyEntrySymbol({ className }: SymbolProps) {
  return (
    <Symbol
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      color="currentColor"
      className={className}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.84628 6.35418C6.69652 4.43791 8.07685 2 10.3116 2H13.8374C16.0721 2 17.4524 4.43792 16.3026 6.35418C15.7831 7.22014 14.8472 7.75 13.8374 7.75H10.3116C9.30169 7.75 8.36586 7.22014 7.84628 6.35418ZM10.3116 4C9.63144 4 9.21134 4.74198 9.56126 5.32518C9.7194 5.58874 10.0042 5.75 10.3116 5.75H13.8374C14.1447 5.75 14.4295 5.58874 14.5877 5.32518C14.9376 4.74197 14.5175 4 13.8374 4H10.3116Z"
          fill={Colors.Blue[500]}
        />
        <path
          d="M13.3271 11H10.6714C9.79549 11 9.05045 11.3571 8.6101 11.9166C7.90787 12.8088 7.23282 13.7916 6.74088 14.7631C6.23777 15.7566 6 16.5946 6 17.2353C6 17.841 6.14137 18.7164 6.78211 19.4316C7.38512 20.1047 8.75959 21 12 21C15.2404 21 16.6149 20.1047 17.2179 19.4316C17.8586 18.7164 18 17.841 18 17.2353C18 16.5949 17.7622 15.7572 17.259 14.7637C16.7669 13.7923 16.0917 12.8095 15.3894 11.9173C14.9487 11.3573 14.2032 11 13.3271 11ZM13.3271 9C14.7322 9 16.0919 9.57611 16.961 10.6803C18.4613 12.5864 20 15.0682 20 17.2353C20 18.9647 19.22 23 12 23C4.78 23 4 18.9647 4 17.2353C4 15.0679 5.53812 12.5859 7.03851 10.6796C7.90734 9.57577 9.26668 9 10.6714 9H13.3271Z"
          fill="black"
        />
      </svg>
    </Symbol>
  )
}

const Symbol = styled.svg`
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

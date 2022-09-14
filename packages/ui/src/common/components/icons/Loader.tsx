import React from 'react'
import styled from 'styled-components'

import { BorderRad, Colors } from '../../constants'

interface LoaderProps {
  className?: string
  withoutMargin?: boolean
}

export function Loader({ className, withoutMargin }: LoaderProps) {
  return (
    <LoaderComponent viewBox="0 0 24 24" fill="none" withoutMargin={withoutMargin} className={className}>
      <path
        d="M22.9092 11.4546H18.5455C17.9431 11.4546 17.4546 11.9431 17.4546 12.5455C17.4546 13.1479 17.9431 13.6364 18.5455 13.6364H22.9092C23.5116 13.6364 24.0001 13.1479 24.0001 12.5455C24.0001 11.9431 23.5117 11.4546 22.9092 11.4546Z"
        fill={Colors.Black[500]}
      />
      <path
        d="M18.9423 4.06013L15.8566 7.14579C15.4306 7.57171 15.4306 8.26246 15.8566 8.6885C16.0696 8.90158 16.3488 9.00811 16.6279 9.00811C16.9072 9.00811 17.1864 8.90169 17.3994 8.6885L20.485 5.60285C20.9111 5.17692 20.9111 4.48617 20.485 4.06013C20.0591 3.63409 19.3683 3.63409 18.9423 4.06013Z"
        fill={Colors.Black[500]}
      />
      <path
        opacity="0.9"
        d="M12.0001 0.54541C11.3977 0.54541 10.9092 1.03389 10.9092 1.63632V5.99998C10.9092 6.60242 11.3977 7.0909 12.0001 7.0909C12.6025 7.0909 13.091 6.60242 13.091 5.99998V1.63632C13.091 1.03389 12.6025 0.54541 12.0001 0.54541Z"
        fill={Colors.Black[500]}
      />
      <path
        opacity="0.8"
        d="M5.05756 4.06013C4.63163 3.63409 3.94088 3.63409 3.51484 4.06013C3.0888 4.48617 3.0888 5.17681 3.51484 5.60285L6.60038 8.6885C6.81335 8.90158 7.09257 9.00811 7.3718 9.00811C7.65091 9.00811 7.93025 8.90158 8.1431 8.6885C8.56914 8.26258 8.56914 7.57182 8.1431 7.14579L5.05756 4.06013Z"
        fill={Colors.Black[500]}
      />
      <path
        opacity="0.7"
        d="M5.45457 11.4546H1.09091C0.488476 11.4546 0 11.9431 0 12.5455C0 13.1479 0.488476 13.6364 1.09091 13.6364H5.45457C6.05701 13.6364 6.54549 13.1479 6.54549 12.5455C6.54549 11.9431 6.05701 11.4546 5.45457 11.4546Z"
        fill={Colors.Black[500]}
      />
      <path
        opacity="0.5"
        d="M6.5999 16.4024L3.51435 19.4881C3.08831 19.9141 3.08831 20.6047 3.51435 21.0308C3.72732 21.2437 4.00654 21.3503 4.28577 21.3503C4.56499 21.3503 4.84422 21.2437 5.05707 21.0308L8.14261 17.9451C8.56865 17.5191 8.56865 16.8285 8.14261 16.4024C7.71669 15.9764 7.02593 15.9764 6.5999 16.4024Z"
        fill={Colors.Black[500]}
      />
      <path
        opacity="0.4"
        d="M11.9996 19.0909C11.3972 19.0909 10.9087 19.5794 10.9087 20.1819V22.3637C10.9087 22.9661 11.3972 23.4546 11.9996 23.4546C12.602 23.4546 13.0905 22.9661 13.0905 22.3637V20.1819C13.0905 19.5794 12.602 19.0909 11.9996 19.0909Z"
        fill={Colors.Black[500]}
      />
    </LoaderComponent>
  )
}

export const LoaderComponent = styled.svg<LoaderProps>`
  width: 100%;
  height: 24px;
  border-radius: ${BorderRad.round};
  animation: spinLoader 1s infinite linear;
  justify-self: start;
  place-self: center;
  margin: ${({ withoutMargin }) => (withoutMargin ? '0' : '100px 0')};

  @keyframes spinLoader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

import * as React from 'react'
import { SVGProps } from 'react'

export const ApplicationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 1.85 3.85 1h16l.85.85v20l-.85.85h-16L3 21.85v-20Zm13.85 13v-2h-10v2h10Zm0 4v-2h-10v2h10ZM10.983 6.437c0 .505-.242.954-.62 1.245.438.176.765.464.998.793.37.523.49 1.132.49 1.532v.276l-.255.123c-.333.162-1.193.444-2.246.444s-1.913-.282-2.246-.444l-.254-.123v-.276c0-.4.12-1.01.489-1.532.233-.33.56-.617.999-.793-.378-.29-.62-.74-.62-1.245 0-.876.73-1.587 1.632-1.587.902 0 1.633.71 1.633 1.587Z"
      fill="#000"
    />
  </svg>
)

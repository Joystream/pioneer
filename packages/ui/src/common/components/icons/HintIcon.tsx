import React from 'react'

import { Icon } from './Icon'

interface HintIconProps {
  className?: any
}

export const HintIcon = React.memo(({ className }: HintIconProps) => (
  <Icon
    size="16"
    viewBox="0 0 10 16"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      d="M10 5.10473C10 8.42142 6.96429 10.1302 6.96429 13.8125H3.03571C3.03571 10.1302 0 8.42142 0 5.10473C0 2.02161 2.49857 0.324219 4.99714 0.324219C7.49857 0.324219 10 2.02374 10 5.10473ZM6.60714 15.5246H3.39286C3.19571 15.5246 3.03571 15.6836 3.03571 15.8795C3.03571 16.0755 3.19571 16.2345 3.39286 16.2345H6.60714C6.80429 16.2345 6.96429 16.0755 6.96429 15.8795C6.96429 15.6836 6.80429 15.5246 6.60714 15.5246ZM6.78571 17.9466H3.21429L4.25071 19.1244C4.38643 19.2777 4.58214 19.3664 4.78857 19.3664H5.21214C5.41786 19.3664 5.61429 19.2777 5.74929 19.1244L6.78571 17.9466Z"
      fill="currentColor"
    />
  </Icon>
))

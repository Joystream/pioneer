import React from 'react'

import { Icon } from './Icon'

interface HintIconProps {
  className?: any
}

export const HintIcon = React.memo(({ className }: HintIconProps) => (
  <Icon
    size="32"
    viewBox="0 0 30 31"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      d="M20 10.9574C20 14.2667 16.9643 15.9717 16.9643 19.6458H13.0357C13.0357 15.9717 10 14.2667 10 10.9574C10 7.88112 12.4986 6.1875 14.9971 6.1875C17.4986 6.1875 20 7.88325 20 10.9574ZM16.6071 21.3542H13.3929C13.1957 21.3542 13.0357 21.5128 13.0357 21.7083C13.0357 21.9038 13.1957 22.0625 13.3929 22.0625H16.6071C16.8043 22.0625 16.9643 21.9038 16.9643 21.7083C16.9643 21.5128 16.8043 21.3542 16.6071 21.3542ZM16.7857 23.7708H13.2143L14.2507 24.946C14.3864 25.099 14.5821 25.1875 14.7886 25.1875H15.2121C15.4179 25.1875 15.6143 25.099 15.7493 24.946L16.7857 23.7708Z"
      fill="currentColor"
    />
  </Icon>
))

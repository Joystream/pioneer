import React from 'react'

import { Icon } from '../Icon'

interface Props {
  className?: any
}

export const LockIcon = React.memo(({ className }: Props) => (
  <Icon
    preserveAspectRatio="xMidYMid meet"
    color="currentColor"
    className={className}
    size="16"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M19.5 10.875H17.9062V5.625C17.9062 3.96797 16.5633 2.625 14.9062 2.625H9.09375C7.43672 2.625 6.09375 3.96797 6.09375 5.625V10.875H4.5C4.08516 10.875 3.75 11.2102 3.75 11.625V20.625C3.75 21.0398 4.08516 21.375 4.5 21.375H19.5C19.9148 21.375 20.25 21.0398 20.25 20.625V11.625C20.25 11.2102 19.9148 10.875 19.5 10.875ZM7.78125 5.625C7.78125 4.90078 8.36953 4.3125 9.09375 4.3125H14.9062C15.6305 4.3125 16.2188 4.90078 16.2188 5.625V10.875H7.78125V5.625ZM18.5625 19.6875H5.4375V12.5625H18.5625V19.6875Z"
      fill="black"
    />
    <path
      d="M11.344 17.6719V16.4297C11.1505 16.2908 11.0061 16.0941 10.9316 15.8679C10.857 15.6417 10.8561 15.3976 10.9291 15.1709C11.0021 14.9442 11.1451 14.7465 11.3376 14.6062C11.53 14.466 11.7621 14.3904 12.0002 14.3904C12.2384 14.3904 12.4704 14.466 12.6629 14.6062C12.8554 14.7465 12.9984 14.9442 13.0714 15.1709C13.1443 15.3976 13.1435 15.6417 13.0689 15.8679C12.9944 16.0941 12.85 16.2908 12.6565 16.4297V17.6719C12.6565 17.775 12.5721 17.8594 12.469 17.8594H11.5483C11.4802 17.8541 11.344 17.8093 11.344 17.6719Z"
      fill="#3F38FF"
    />
  </Icon>
))

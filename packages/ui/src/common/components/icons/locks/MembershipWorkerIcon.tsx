import React from 'react'

import { Colors } from '@/common/constants'

import { Icon, StyledIcon } from '../Icon'

export const MembershipWorkerIcon = React.memo(({ className }: StyledIcon) => (
  <Icon
    size="20"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <g clipPath="url(#clip0_133_99)">
      <path d="M2.87363 21.6984C2.87281 21.5008 2.87198 21.6428 2.87363 21.6984V21.6984Z" fill="#EEEEEE" />
      <path d="M21.1255 21.8531C21.1281 21.799 21.1264 21.4777 21.1255 21.8531V21.8531Z" fill="#EEEEEE" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 3H10V5H14V3ZM8 1.21808V6.67262L16 6.67264V1.21809L8 1.21808Z"
        fill={Colors.Blue[600]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.2001 6.80006H5.80012V21.8667H18.2001V6.80006ZM4.00012 5.00006V23.6667H20.0001V5.00006H4.00012Z"
        fill={Colors.Black[900]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.95486 18.0148C9.61686 18.2377 10.7121 18.5 11.9999 18.5C13.2876 18.5 14.3829 18.2377 15.0448 18.0148C14.9629 17.5482 14.7825 17.0018 14.458 16.5296C14.0149 15.8845 13.2844 15.3399 11.9999 15.3399C10.7153 15.3399 9.98481 15.8845 9.54167 16.5296C9.21723 17.0018 9.0368 17.5482 8.95486 18.0148ZM8.05804 15.5103C8.8149 14.4086 10.0844 13.5399 11.9999 13.5399C13.9153 13.5399 15.1848 14.4086 15.9417 15.5103C16.6659 16.5646 16.8999 17.7929 16.8999 18.6V19.1562L16.4023 19.405C15.7486 19.7319 14.0646 20.3 11.9999 20.3C9.93514 20.3 8.25112 19.7319 7.59736 19.405L7.09985 19.1562V18.6C7.09985 17.7929 7.33376 16.5646 8.05804 15.5103Z"
        fill={Colors.Black[900]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0003 12.8C12.7735 12.8 13.4003 12.1732 13.4003 11.4C13.4003 10.6268 12.7735 10 12.0003 10C11.2271 10 10.6003 10.6268 10.6003 11.4C10.6003 12.1732 11.2271 12.8 12.0003 12.8ZM12.0003 14.6C13.7676 14.6 15.2003 13.1673 15.2003 11.4C15.2003 9.6327 13.7676 8.20001 12.0003 8.20001C10.233 8.20001 8.80029 9.6327 8.80029 11.4C8.80029 13.1673 10.233 14.6 12.0003 14.6Z"
        fill={Colors.Black[900]}
      />
    </g>
    <defs>
      <clipPath id="clip0_133_99">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </Icon>
))

import React from 'react'

import { Colors } from '@/common/constants'

import { Icon, StyledIcon } from '../Icon'

export const CouncilCandidateIcon = React.memo(({ className }: StyledIcon) => (
  <Icon
    size="20"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.0001 9.89998C2.39258 9.89998 1.9001 10.3925 1.9001 11C1.9001 11.6075 2.39258 12.1 3.0001 12.1C3.60761 12.1 4.1001 11.6075 4.1001 11C4.1001 10.3925 3.60761 9.89998 3.0001 9.89998ZM0.100098 11C0.100098 9.39835 1.39847 8.09998 3.0001 8.09998C4.60172 8.09998 5.9001 9.39835 5.9001 11C5.9001 11.9612 5.43242 12.8132 4.7122 13.3409C4.73476 13.3574 4.75609 13.3742 4.77615 13.3908C4.94414 13.5301 5.06725 13.6974 5.15642 13.8427C5.33508 14.1338 5.46961 14.4902 5.57026 14.8305C5.77325 15.517 5.9001 16.353 5.9001 17H4.1001C4.1001 16.5424 4.00309 15.8784 3.84415 15.341C3.78852 15.1529 3.73258 15.0056 3.6833 14.9H2.31689C2.26762 15.0056 2.21168 15.1529 2.15604 15.341C1.99711 15.8784 1.9001 16.5424 1.9001 17H0.100098C0.100098 16.353 0.226946 15.517 0.429939 14.8305C0.530586 14.4902 0.665113 14.1338 0.843774 13.8427C0.932942 13.6974 1.05605 13.5301 1.22405 13.3908C1.24411 13.3742 1.26543 13.3574 1.28799 13.3409C0.567772 12.8132 0.100098 11.9612 0.100098 11ZM8 13H16L19 23H17L15 15H9L7 23H5L8 13ZM19.9001 11C19.9001 10.3925 20.3926 9.89998 21.0001 9.89998C21.6076 9.89998 22.1001 10.3925 22.1001 11C22.1001 11.6075 21.6076 12.1 21.0001 12.1C20.3926 12.1 19.9001 11.6075 19.9001 11ZM21.0001 8.09998C19.3985 8.09998 18.1001 9.39835 18.1001 11C18.1001 11.9612 18.5678 12.8132 19.288 13.3409C19.2654 13.3574 19.2441 13.3742 19.224 13.3908C19.0561 13.5301 18.9329 13.6974 18.8438 13.8427C18.6651 14.1338 18.5306 14.4902 18.4299 14.8305C18.2269 15.517 18.1001 16.353 18.1001 17H19.9001C19.9001 16.5424 19.9971 15.8784 20.156 15.341C20.2117 15.1529 20.2676 15.0056 20.3169 14.9H21.6833C21.7326 15.0056 21.7885 15.1529 21.8442 15.341C22.0031 15.8784 22.1001 16.5424 22.1001 17H23.9001C23.9001 16.353 23.7733 15.517 23.5703 14.8305C23.4696 14.4902 23.3351 14.1338 23.1564 13.8427C23.0673 13.6974 22.9441 13.5301 22.7761 13.3908C22.7561 13.3742 22.7348 13.3574 22.7122 13.3409C23.4324 12.8132 23.9001 11.9612 23.9001 11C23.9001 9.39835 22.6017 8.09998 21.0001 8.09998Z"
      fill={Colors.Black[900]}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0001 4.8C11.3926 4.8 10.9001 5.29249 10.9001 5.9C10.9001 6.50751 11.3926 7 12.0001 7C12.6076 7 13.1001 6.50751 13.1001 5.9C13.1001 5.29249 12.6076 4.8 12.0001 4.8ZM9.1001 5.9C9.1001 4.29837 10.3985 3 12.0001 3C13.6017 3 14.9001 4.29837 14.9001 5.9C14.9001 6.72625 14.5546 7.47179 14.0001 8.00001C15.6017 8.00001 16.9001 9.29837 16.9001 10.9V11.9H15.1001V10.9C15.1001 10.2925 14.6076 9.8 14.0001 9.8H10.0001C9.39258 9.8 8.9001 10.2925 8.9001 10.9V11.9H7.1001V10.9C7.1001 9.29838 8.39847 8 10.0001 8C9.44564 7.47179 9.1001 6.72625 9.1001 5.9Z"
      fill={Colors.Blue[500]}
    />
  </Icon>
))

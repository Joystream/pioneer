import React from 'react'

import { Icon } from './Icon'

interface Props {
  className?: string
}

export const NoResultsTile = React.memo(({ className }: Props) => {
  return (
    <Icon className={className} width="108" height="108" viewBox="0 0 108 108" fill="none">
      <rect x="0.5" y="0.5" width="107" height="107" rx="1.5" fill="#F9FAFC" stroke="#E8EDF6" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 59V56.0976V53.0423V42H34.2827H37.7487H41.8546H41.8549H48.1759H57.774H69.145V59H41.8549H41.8546H32ZM69.1451 56.0976V59H79V42H74.8938H71.4278H69.1451V53.0423V56.0976Z"
        fill="#5D6B80"
      />
      <path
        opacity="0.7"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36 48V45.6098V43.0936V34H37.8942H40.7702H44.1772H44.1774H49.4226H57.3869H66.8224V48H44.1774H44.1772H36ZM66.8226 45.6098V48H75V34H71.5927H68.7167H66.8226V43.0936V45.6098Z"
        fill="#5D6B80"
      />
      <path
        opacity="0.4"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40 34V32.9756V31.8973V28H41.5056H43.7917H46.4998H46.5H50.6692H56.9999H64.4999V34H46.5H46.4998H40ZM64.5 32.9756V34H71V28H68.2917H66.0056H64.5V31.8973V32.9756Z"
        fill="#5D6B80"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58 75.7685L45.2315 63L42 66.2315L54.7685 79L58 75.7685Z"
        fill="#3F38FF"
      />
      <rect x="34.9043" y="45.4" width="3.76344" height="3.5" fill="white" />
      <rect x="34.9043" y="52.7001" width="3.76344" height="3.5" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49 57C49 64.1797 43.1797 70 36 70C28.8203 70 23 64.1797 23 57C23 49.8203 28.8203 44 36 44C43.1797 44 49 49.8203 49 57Z"
        fill="#3F38FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.8945 53.7073V59H41.7491H41.7494H48.847C48.9477 58.3481 48.9999 57.6801 48.9999 57C48.9999 49.8203 43.1796 44 35.9999 44C34.5653 44 33.185 44.2324 31.8945 44.6615V48.1359V53.7073Z"
        fill="black"
      />
      <path d="M27 57C27 52.0294 31.0294 48 36 48" stroke="white" strokeWidth="2" />
    </Icon>
  )
})

import React from 'react'

import { Colors } from '@/common/constants'

import { Icon } from './Icon'

export const SearchProcessIcon = React.memo(({ className }: { className?: string }) => (
  <Icon size="108" viewBox="0 0 108 108" fill="none" className={className}>
    <rect width="108" height="108" rx="54" fill={Colors.Black[700]} />
    <path d="M87.1748 89.981V80.0815" stroke={Colors.Blue[500]} strokeWidth="0.5" />
    <path d="M90.0034 92.8093V80.0814" stroke={Colors.Blue[500]} strokeWidth="0.5" />
    <path d="M92.8317 94.2233V81.4954" stroke={Colors.Blue[500]} strokeWidth="0.5" />
    <path d="M95.6601 97.0515V84.3235" stroke={Colors.Blue[500]} strokeWidth="0.5" />
    <path d="M98.4885 99.8796V87.1517" stroke={Colors.Blue[500]} strokeWidth="0.5" />
    <path d="M80 90.8333V106H13V15H80V49.599" stroke={Colors.Blue[500]} strokeWidth="3" />
    <path d="M13.5 100H7V9H74V15" stroke={Colors.Blue[500]} strokeWidth="3" />
    <path
      d="M29.5 30.7715H64.0882M29.5 42.1547H64.0882M29.5 53.0431H57M29.5 64.4263H52"
      stroke={Colors.Blue[500]}
      strokeWidth="3"
    />
    <path d="M29.5 76.1543H53M29.5 87.0426H45.5" stroke={Colors.Blue[500]} strokeWidth="3" />
    <circle
      cx="71.6183"
      cy="67.3691"
      r="20"
      transform="rotate(-45 71.6183 67.3691)"
      stroke={Colors.Blue[500]}
      strokeWidth="3"
    />
    <path
      d="M81.5178 57.4696C83.6913 59.6431 85.089 62.4714 85.4954 65.5182C85.9018 68.5649 85.2942 71.6608 83.7664 74.3279C82.2386 76.995 79.8755 79.0852 77.0418 80.276C74.208 81.4667 71.0612 81.6918 68.0868 80.9164C65.1125 80.1411 62.476 78.4084 60.5842 75.9859C58.6924 73.5633 57.6504 70.5854 57.6191 67.5119C57.5877 64.4383 58.5688 61.4398 60.4108 58.9792C62.2528 56.5185 64.8535 54.7325 67.8114 53.8967"
      stroke={Colors.Blue[500]}
    />
    <path
      d="M82.5786 83.9844L95.6601 97.0659L96.3672 97.773C97.1173 98.5231 98.1348 98.9445 99.1956 98.9445C100.256 98.9445 101.274 98.5231 102.024 97.773C102.774 97.0228 103.196 96.0054 103.196 94.9445C103.196 93.8837 102.774 92.8662 102.024 92.1161L88.9426 79.0346"
      stroke={Colors.Blue[500]}
      strokeWidth="3"
    />
  </Icon>
))

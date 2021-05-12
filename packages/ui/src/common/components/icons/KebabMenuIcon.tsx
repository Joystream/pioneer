import React from 'react'
import styled from 'styled-components'

import { Icon } from './Icon'

export const KebabMenuIcon = React.memo(() => (
  <Icon size="24" viewBox="0 0 24 24" fill="none" color="currentColor">
    <circle cx="12" cy="5" r="2" fill="#424242" />
    <circle cx="12" cy="12" r="2" fill="#424242" />
    <circle cx="12" cy="19" r="2" fill="#424242" />
  </Icon>
))

export const KebabMenuIconStyles = styled(Icon)``

import styled from 'styled-components'

import { Colors, RemoveScrollbar, Shadows, Transitions } from '../../constants'
import { ActivitiesList } from '../Activities'
import { ActivityItem } from '../Activities/ActivityComponent'
import { Close } from '../buttons'

export const NotificationsHeader = styled.div`
  position: relative;
  padding: 0 16px;

  ${Close} {
    position: absolute;
    top: 0;
    right: 16px;
  }
`

export const NotificationsPanel = styled.aside`
  display: flex;
  position: absolute;
  left: 226px;
  top: 0;
  flex-direction: column;
  row-gap: 12px;
  width: 286px;
  max-width: 286px;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  padding-top: 16px;
  background-color: ${Colors.White};
  box-shadow: ${Shadows.common};
  overflow: hidden;
  transition: ${Transitions.all};
  z-index: -1;

  ${ActivitiesList} {
    grid-row-gap: 0;
    padding-bottom: 16px;
  }
  ${ActivityItem} {
    padding: 12px 16px;
  }
`

export const NotificationsBody = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  ${RemoveScrollbar};
`

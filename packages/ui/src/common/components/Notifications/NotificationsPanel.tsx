import styled from 'styled-components'

import { Colors, ZIndex } from '../../constants'

export const NotificationsPanel = styled.div`
  height: 100vh;
  max-width: 280px;
  position: fixed;
  top: 0;
  left: 226px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 42px 1fr;
  grid-gap: 30px;
  z-index: ${ZIndex.Modal};
  background-color: ${Colors.White};
  box-shadow: 0 0 16px ${Colors.Black[900.25]};
  grid-template-areas: 'sidepaneheader' 'notificationsbody';
  padding-left: 10px;
  padding-right: 10px;
`

export const NotificationsBody = styled.div`
  overflow: scroll;
  grid-area: notificationsbody;
`

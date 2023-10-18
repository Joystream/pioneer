import { MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'

import { Animations, Colors, RemoveScrollbar, Shadows, ZIndex } from '../../constants'
import { ButtonsGroup } from '../buttons'

export const SidePaneHeader = styled.div`
  display: grid;
  grid-area: sidepaneheader;
  grid-row-gap: 20px;
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 12px 24px 0;
  background-color: ${Colors.White};
`

export const SidePanelTop = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 20px;
  grid-column-gap: 14px;
  align-items: center;
  width: 100%;
  max-height: 28px;
`

export const SidePaneTitle = styled.h5``

export const SidePaneBody = styled.div`
  display: flex;
  grid-area: sidepanebody;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: ${Colors.Black[50]};
  border-top: 1px solid ${Colors.Black[200]};
  border-bottom: 1px solid ${Colors.Black[200]};
  overflow-y: scroll;
  ${RemoveScrollbar};
`

export const EmptyBody = styled.div`
  padding: 24px;
`

export const SidePaneTopButtonsGroup = styled(ButtonsGroup)`
  position: absolute;
  right: 36px;
`

export const SidePane = styled.div<{ topSize?: 'xs' | 's' | 'm' }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(auto, ${({ topSize }) => (topSize === 's' ? '132px' : '192px')}) 1fr auto;
  grid-template-areas:
    'sidepaneheader'
    'sidepanebody'
    'modalfooter';
  grid-area: modal;
  position: relative;
  background-color: ${Colors.White};
  width: 100%;
  max-width: 552px;
  height: 100vh;
  overflow: hidden;
  ${Animations.showSidePane};

  ${({ topSize }) => {
    switch (topSize) {
      case 'xs':
        return css`
          grid-template-rows: auto 1fr;

          ${SidePaneHeader} {
            padding: 12px 24px;
          }
        `
      case 's':
        return css`
          ${SidePaneHeader} {
            align-content: space-between;
          }
        `
    }
  }};
`

export const SidePaneGlass = styled.div<{ onClick?: MouseEventHandler<HTMLDivElement> }>`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: ${Colors.Black[900]};
  z-index: ${ZIndex.modal};

  ${({ onClick }) =>
    onClick
      ? css`
          background-color: ${Colors.Black[700.85]};
          ${Animations.showModalBackground};
        `
      : css`
          pointer-events: none;
          & > ${SidePane} {
            box-shadow: ${Shadows.common};
            pointer-events: auto;
          }
        `}
`

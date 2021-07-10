import { css } from 'styled-components'

import { Transitions } from './styles'

export const Animations = css`
  .DropDown {
    &-enter {
      max-height: 0px;
      overflow: hidden;
    }
    &-enter-active {
      max-height: 500px;
      overflow: hidden;
    }
    &-exit {
      max-height: 500px;
      overflow: hidden;
    }
    &-exit-active {
      max-height: 0px;
      overflow: hidden;
    }
  }
  .Tooltip {
    &-enter {
      transform: translateY(8px);
      opacity: 0;
    }
    &-enter-active {
      transform: translateY(0px);
      opacity: 1;
    }
    &-exit {
      transform: translateY(0px);
      opacity: 1;
    }
    &-exit-active {
      transform: translateY(8px);
      opacity: 0;
    }
  }
  .NotificationsPanel {
    &-enter {
      transform: translateX(-100%);
    }
    &-enter-active {
      transform: translateX(0%);
    }
    &-exit {
      transform: translateX(0%);
    }
    &-exit-active {
      transform: translateX(-100%);
    }
  }
  .ActiveTypeIcon {
    &-enter {
      opacity: 0;
    }
    &-enter-active {
      opacity: 1;
    }
    &-exit {
      opacity: 1;
    }
    &-exit-active {
      opacity: 0;
    }
  }
  .UnreadIndicator {
    &-enter {
      opacity: 0;
    }
    &-enter-active {
      opacity: 1;
      animation: UnreadIndicatorAnimation ${Transitions.durationXL} ease;
    }
    &-exit {
      opacity: 1;
    }
    &-exit-active {
      opacity: 0;
    }
    @keyframes UnreadIndicatorAnimation {
      0% {
        transform: translateY(0px);
      }
      20% {
        opacity: 1;
        transform: translateY(-8px);
      }
      40% {
        transform: translateY(4px);
      }
      60% {
        transform: translateY(-4px);
      }
      80% {
        transform: translateY(2px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
`

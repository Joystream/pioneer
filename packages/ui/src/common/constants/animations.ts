import { css, keyframes } from 'styled-components'

import { Colors, Transitions } from './styles'

export const Animations = css`
  .DropDown {
    &-enter {
      max-height: 0;
      overflow: hidden;
    }
    &-enter-active {
      max-height: 100vh;
      overflow: hidden;
    }
    &-exit {
      max-height: 100vh;
      overflow: hidden;
    }
    &-exit-active {
      max-height: 0;
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

export const Glow = keyframes`
  0% { background-color: transparent; }
  50% { background-color: ${Colors.LogoPurple}22;
    box-shadow: 0px -5px 14px 14px ${Colors.LogoPurple}22;
  }
  100% { background-color: transparent; }
`

export const Pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`

export const Rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`

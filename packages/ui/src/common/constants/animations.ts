import { css } from 'styled-components'

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
`

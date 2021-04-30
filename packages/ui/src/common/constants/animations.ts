import { css } from 'styled-components'

export const Animations = css`
  .DropDown {
    &-enter {
      max-height: 0px;
      overflow: hidden;
      opacity: 0;
    }
    &-enter-active {
      max-height: 500px;
      overflow: hidden;
      opacity: 1;
    }
    &-exit {
      max-height: 500px;
      overflow: hidden;
      opacity: 1;
    }
    &-exit-active {
      max-height: 0px;
      overflow: hidden;
      opacity: 0;
    }
  }
`

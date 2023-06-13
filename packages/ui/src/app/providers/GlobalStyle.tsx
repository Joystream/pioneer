import { createGlobalStyle } from 'styled-components'

import { Colors, Fonts } from '../../common/constants'
import { Animations } from '../../common/constants/animations'
import InterBold from '../assets/fonts/Inter-Bold.woff2'
import InterRegular from '../assets/fonts/Inter-Regular.woff2'
import GroteskBold from '../assets/fonts/Px-Grotesk-Bold.woff2'
import GroteskRegular from '../assets/fonts/Px-Grotesk-Regular.woff2'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Inter";
    src: url(${InterRegular}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Inter";
    src: url(${InterBold}) format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Grotesk";
    src: url(${GroteskRegular}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Grotesk";
    src: url(${GroteskBold}) format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }
  *::selection, *:before::selection, *:after::selection {
    color: ${Colors.Blue[50]};
    background-color: ${Colors.Blue[500]};
  }

  body, html {
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: ${Colors.White};
    font-family: ${Fonts.Grotesk};
    font-size: 14px;
    color: ${Colors.Black[900]};
    overscroll-behavior-y: none;
    overflow: hidden;
  }
  body > #app {
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  button {
    font-family: ${Fonts.Grotesk};
    font-size: 1rem;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 0;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  p {
    margin: 0;
    padding: 0;
    font-family: ${Fonts.Inter};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${Fonts.Grotesk};
    margin: 0;
    padding: 0;
    font-weight: 700;
  }

  h1 {
    font-size: 40px;
    line-height: 48px
  }
  h2 {
    font-size: 32px;
    line-height: 40px
  }
  h3 {
    font-size: 24px;
    line-height: 32px
  }
  h4 {
    font-size: 20px;
    line-height: 28px
  }
  h5 {
    font-size: 16px;
    line-height: 24px
  }
  h6 {
    font-size: 14px;
    line-height: 20px
  }
  a {
    text-decoration: none;
    font-family: ${Fonts.Grotesk};
  }
  input {
    font-family: ${Fonts.Grotesk};

    &::placeholder {
      font-family: ${Fonts.Inter};
    }
  }

  h1, h2, h3, h4, h5, h6, p, span, ul, ol, li, a, div, i, button, input {
    &::selection {
      color: ${Colors.Blue[50]};
      background-color: ${Colors.Blue[500]};
      -webkit-text-stroke-color: ${Colors.Blue[50]};
    }
  }
  blockquote {
    margin: 0;
  }
  ${Animations};
`

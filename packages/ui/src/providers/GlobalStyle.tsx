import InterRegular from '../assets/fonts/Inter-Regular.woff2'
import InterBold from '../assets/fonts/Inter-Bold.woff2'
import GroteskRegular from '../assets/fonts/Px-Grotesk-Regular.woff2'
import GroteskBold from '../assets/fonts/Px-Grotesk-Bold.woff2'
import { createGlobalStyle } from 'styled-components'
import { Colors, Fonts } from '../constants'

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
  body, html {
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: ${Colors.White};
    font-family: ${Fonts.Title};
    font-size: 14px;
    color: ${Colors.Black[900]};
    overscroll-behavior-y: none;
    overflow: hidden;
  }
  body > #app {
    height: 100%;
    overflow-y: scroll;
  }
  button {
    font-family: ${Fonts.Title};
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
    font-family: ${Fonts.Body};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${Fonts.Title};
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
    line-height: 424px
  }
  h6 {
    font-size: 14px;
    line-height: 20px
  }
  a {
    text-decoration: none;
    font-family: ${Fonts.Title};
  }
  input {
    font-family: ${Fonts.Title};
    
    &::placeholder {
      font-family: ${Fonts.Body};
    }
  }
`

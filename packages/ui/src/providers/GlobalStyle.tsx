import { createGlobalStyle } from 'styled-components'
import { Colors, Fonts } from '../constants'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body, html {
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: ${Colors.White};
    font-family: ${Fonts.Body};
    font-size: 14px;
    color: ${Colors.Black[900]};
  }
  button {
    font-family: ${Fonts.Body};
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
  }

  h1, h2, h3, h4, h5, h6 {
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
`

import { createGlobalStyle } from 'styled-components'

import { Colors, Fonts } from '../../constants'

export const MarkdownPreviewStyles = createGlobalStyle`
  .markdown-preview {
    width: 100%;

    h1, h2, h3, h4, h5, h6 {
      margin-top: 24px;
      font-family: ${Fonts.Grotesk};
      font-weight: 700;
      color: ${Colors.Black[900]};
    }
    h1 {
      font-size: 24px;
      line-height: 32px;
    }
    h2 {
      font-size: 20px;
      line-height: 28px;
    }
    h3 {
      font-size: 16px;
      line-height: 24px;
    }
    h4 {
      font-size: 14px;
      line-height: 20px;
    }
    h5, h6 {
      font-size: 10px;
      line-height: 16px;
    }

    p {
      margin-top: 8px;
      font-family: ${Fonts.Inter};
      font-size: 16px;
      line-height: 1.5;
      font-weight: 400;
      color: ${Colors.Black[600]};
    }
    
    li {
      position: relative;
      font-family: ${Fonts.Inter};
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
      color: ${Colors.Black[500]};
    }

    ul {
      display: grid;
      grid-row-gap: 8px;
      width: 100%;
      padding-left: 24px;
      list-style: none;

      li {
        &:before {
          content: url("data:image/svg+xml;charset=UTF-8, <svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='16' width='16' viewBox='0 0 16 16'><path d='M8.13804 9.3253L3.67065 4.85791L2.66669 5.86187L8.13804 11.3332L13.6094 5.86187L12.6054 4.85791L8.13804 9.3253Z' fill='rgb(64, 75, 90)' /></svg>");
          position: absolute;
          top: 50%;
          left: -26px;
          width: 16px;
          height: 16px;
          transform: translateY(-50%) rotate(-90deg);
        }
      }
    }
    ol {
      display: grid;
      grid-row-gap: 8px;
      width: 100%;
      padding-left: 24px;
      list-style: none;

      li {
        &:before {
          content: url("data:image/svg+xml;charset=UTF-8, <svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='16' width='16' viewBox='0 0 16 16'><path d='M8.13804 9.3253L3.67065 4.85791L2.66669 5.86187L8.13804 11.3332L13.6094 5.86187L12.6054 4.85791L8.13804 9.3253Z' fill='rgb(64, 75, 90)' /></svg>");
          position: absolute;
          top: 50%;
          left: -26px;
          width: 16px;
          height: 16px;
          transform: translateY(-50%) rotate(-90deg);
        }
      }
    }
  }

  .markdown-preview a {
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 8px;
    text-decoration: underline;
    color: ${Colors.Black[900]};
    transition: all 0.25s ease;

    &:hover {
      text-decoration: none;
      color: ${Colors.Blue[500]};
    }
  }
`

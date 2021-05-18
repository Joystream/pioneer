import { createGlobalStyle } from 'styled-components'

import { Colors } from '../../constants'

export const MarkdownPreviewStyles = createGlobalStyle`
  .markdown-preview {
    width: 100%;
    margin-bottom: 30px;
  }

  .markdown-preview h3,
  .markdown-preview h4,
  .markdown-preview h5,
  .markdown-preview h6 {
    margin-bottom: 8px;
    font-weight: 700;
    color: ${Colors.Black[900]};
  }

  .markdown-preview h3 {
    font-size: 24px;
    line-height: 32px;
  }

  .markdown-preview h4 {
    font-size: 20px;
    line-height: 28px;
  }

  .markdown-preview h5 {
    font-size: 16px;
    line-height: 24px;
  }

  .markdown-preview p {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    margin-bottom: 8px;
    color: ${Colors.Black[600]};
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

  .markdown-preview ul,
  .markdown-preview ol {
    list-style: none;
    margin: 0 0 8px 0;
    padding-left: 30px;
  }

  .markdown-preview li {
    position: relative;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: ${Colors.Black[500]};

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: -28px;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      background: url('data:image/svg+xml;utf8,<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.36778 6.09505L0.900391 10.5624L1.90436 11.5664L7.37571 6.09505L1.90436 0.623699L0.900391 1.62766L5.36778 6.09505Z" fill="#404B5A"/></svg>') no-repeat center;
    }
  }
`

import React, { useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { BorderRad, Colors, Fonts, Transitions } from '../../constants'

export interface MarkdownPreviewStylesProps {
  size?: 'xs' | 's' | 'm'
  isReply?: boolean
}

const normalFontSize = ({ size }: MarkdownPreviewStylesProps) => {
  switch (size) {
    case 'xs':
      return '12px'
    case 's':
      return '14px'
    default:
      return '16px'
  }
}

const normalColor = ({ isReply }: MarkdownPreviewStylesProps) => Colors.Black[isReply ? 600 : 500]

export const MarkdownPreviewStyles = createGlobalStyle<MarkdownPreviewStylesProps>`
  .markdown-preview {
    width: 100%;
  }

  .markdown-preview > *:nth-child(1) {
    margin-top: 0;
  }

  .markdown-preview h1,
  .markdown-preview h2,
  .markdown-preview h3,
  .markdown-preview h4,
  .markdown-preview h5,
  .markdown-preview h6 {
    margin-top: 24px;
    font-family: ${Fonts.Grotesk};
    font-weight: 700;
    color: ${Colors.Black[900]};
  }

  .markdown-preview h1 {
    font-size: 24px;
    line-height: 32px;
  }

  .markdown-preview h2 {
    font-size: 20px;
    line-height: 28px;
  }

  .markdown-preview h3 {
    font-size: ${normalFontSize};
    line-height: 24px;
  }

  .markdown-preview h4 {
    margin-top: 20px;
    font-size: 14px;
    line-height: 20px;
  }

  .markdown-preview h5,
  .markdown-preview h6 {
    margin-top: 12px;
    font-size: 10px;
    line-height: 16px;
  }

  .markdown-preview p {
    margin-top: 8px;
    font-family: ${Fonts.Inter};
    font-size: ${normalFontSize};
    line-height: 1.5;
    font-weight: 400;
    color: ${normalColor};
  }

  .markdown-preview li {
    position: relative;
    font-family: ${Fonts.Inter};
    font-size: ${normalFontSize};
    line-height: 24px;
    font-weight: 400;
    color: ${Colors.Black[500]};
  }

  .markdown-preview ul {
    display: grid;
    grid-row-gap: 8px;
    width: 100%;
    margin: 0;
    padding-left: 24px;
    list-style: none;
  }

  .markdown-preview ol {
    display: grid;
    grid-row-gap: 8px;
    width: 100%;
    margin: 0;
    padding-left: 24px;
    list-style: none;
    counter-reset: ol-list-counter;
  }

  .markdown-preview ol li {
    counter-increment: ol-list-counter;
  }

  .markdown-preview ol li::before {
    content: counter(ol-list-counter)'.';
    position: absolute;
    left: -20px;
    font-family: ${Fonts.Grotesk};
    font-size: ${normalFontSize};
    line-height: 24px;
    font-weight: 700;
    color: ${normalColor};
  }

  .markdown-preview pre {
    width: 100%;
    margin: 8px 0;
    padding: 16px;
    border-radius: ${BorderRad.s};
    background-color: ${Colors.Black[700]};
    white-space: pre-wrap;
  }

  .markdown-preview .in-block-code {
    font-size: 12px;
    line-height: 20px;
    color: ${Colors.Black[300]};
    background-color: ${Colors.Black[700]};
  }

  .markdown-preview .inline-code {
    font-size: 12px;
    line-height: 24px;
    padding: 4px 8px;
    color: ${Colors.Black[300]};
    background-color: ${Colors.Black[700]};
    border-radius: ${BorderRad.s};
  }

  .markdown-preview a {
    font-family: ${Fonts.Grotesk};
    text-decoration: underline;
    text-underline-offset: 1px;
    color: ${Colors.Black[900]};
    cursor: pointer;
    transition: ${Transitions.all};

    &:hover, &:focus {
      color: ${Colors.Blue[500]};
    }
    &:active {
      text-decoration-color: transparent;
      background-color: ${Colors.Blue[50]};
    }
  }

  .markdown-preview ul > li:before {
    content: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="16" width="16" viewBox="0 0 16 16"><path d="M8.13804 9.3253L3.67065 4.85791L2.66669 5.86187L8.13804 11.3332L13.6094 5.86187L12.6054 4.85791L8.13804 9.3253Z" fill="rgb(64, 75, 90)"></path></svg>');
    position: absolute;
    top: 50%;
    left: -26px;
    width: 16px;
    height: 16px;
    transform: translateY(-50%) rotate(-90deg);
  }
  .markdown-preview blockquote {
    margin: 0;
    padding: 0;
  }
`

interface MarkdownCollapsibleContainerProps {
  isCollapsed: boolean
  children?: React.ReactNode
}

export const MarkdownCollapsibleContainer = ({ isCollapsed, children }: MarkdownCollapsibleContainerProps) => {
  const ownRef = useRef<HTMLDivElement>(null)

  return (
    <CollapsibleMarkdownContainer
      isCollapsed={isCollapsed}
      ref={ownRef}
      ownHeight={ownRef && ownRef.current?.scrollHeight}
    >
      {children}
    </CollapsibleMarkdownContainer>
  )
}

interface CollapsibleMarkdownContainerProps {
  isCollapsed: boolean
  ownHeight?: number
}

const CollapsibleMarkdownContainer = styled.div<CollapsibleMarkdownContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: ${({ isCollapsed, ownHeight }) => {
    return isCollapsed ? '164px' : ownHeight + 'px'
  }};
  overflow: hidden;
  mask-image: ${({ isCollapsed }) =>
    isCollapsed
      ? 'linear-gradient(180deg, black, black calc(100% - 64px), transparent 100%)'
      : 'linear-gradient(180deg, black, black 100%, transparent)'};
  mask-size: 100%;
  transition: ${Transitions.all};
`

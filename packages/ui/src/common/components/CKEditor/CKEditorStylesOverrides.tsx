import { createGlobalStyle } from 'styled-components'

import { BorderRad, Colors, Transitions, ZIndex } from '../../constants'

const EDITOR_LINE_HEIGHT = 1.5
const EDITOR_LINE_SPACING = 1

export const CKEditorStylesOverrides = createGlobalStyle<{ minRows: number; maxRows: number }>`

  .ck.ck-editor {
    width: 100%;
  }

  .ckeditor-anchor:not(.ck-content) {
    display: none;
  }

  .ck.ck-content {
    line-height: ${EDITOR_LINE_HEIGHT}em;
    width: 100%;
  }

  .ck.ck-editor__main > .ck.ck-content {
    max-height: ${({ maxRows }) => maxRows * (EDITOR_LINE_HEIGHT + EDITOR_LINE_SPACING) + EDITOR_LINE_SPACING}em;
    min-height: ${({ minRows }) => minRows * (EDITOR_LINE_HEIGHT + EDITOR_LINE_SPACING) + EDITOR_LINE_SPACING}em;
    resize: vertical;
  }

  .ck.ck-content p,
  .ck.ck-content ul,
  .ck.ck-content ol {
    margin: ${EDITOR_LINE_SPACING}em 0;
  }

  .ck.ck-editor__editable_inline {
    transition: ${Transitions.all};
  }

  .ck.ck-content ol {
    padding-inline-start: 2em;
  }

  .ck.ck-content ul {
    padding-inline-start: 2em;
    list-style-type: initial;
  }
  .ck.ck-sticky-panel__content,
  .ck .ck-editor__top {
    background-color: ${Colors.Black[100]};
    border-radius: ${BorderRad.s};
  }
  .ck.ck-button:not(.ck-disabled):hover, a.ck.ck-button:not(.ck-disabled):hover {
    color: ${Colors.Blue[500]};
  }
  .ck.ck-button:not(.ck-disabled):active, a.ck.ck-button:not(.ck-disabled):active,
  .ck.ck-button.ck-on, a.ck.ck-button.ck-on {
    color: ${Colors.Blue[600]};
  }
  .ck.ck-button.ck-disabled, a.ck.ck-button.ck-disabled {
    color: ${Colors.Black[300]};
    cursor: not-allowed;
  }

  .ck.ck-button,
  a.ck.ck-button {
    transition: ${Transitions.all};
    cursor: pointer;
  }

  .ck.ck-list__item .ck-button .custom-item-type {
    font-size: 8px;
    margin-left: 8px;
    background: ${Colors.Blue[200]};
    border-radius: ${BorderRad.m};
    padding: 2px 4px;
  }

  .ck.ck-list__item .ck-button.ck-on {
    background: ${Colors.Blue[100]};
    color: ${Colors.Blue[500]};
    -webkit-text-stroke-width: 0.05em;
    -webkit-text-stroke-color: ${Colors.Blue[500]};
  }
  .ck.ck-list__item .ck-button.ck-on:hover:not(.ck-disabled) {
    color: ${Colors.Blue[500]};
    background: ${Colors.Blue[100]};
  }
  .ck.ck-list__item .ck-button:hover:not(.ck-disabled) {
    background-color: ${Colors.White};
  }
  img {
      max-height: 400px;
  }

  :root {
    --ck-focus-ring: 1px solid ${Colors.Blue[300]};
    --ck-z-modal: calc(${ZIndex.modal} + 10);
    --ck-color-button-default-hover-background: transparent;
    --ck-color-button-default-active-background: transparent;
    --ck-color-toolbar-background: ${Colors.Black[100]};
    --ck-color-button-on-background: ${Colors.Black[200]};
    --ck-color-button-on-hover-background: ${Colors.Black[300]};
    --ck-color-button-on-active-background: ${Colors.Black[300]};
    --ck-color-base-border: ${Colors.Black[300]};
    --ck-color-button-save: ${Colors.Blue[500]};
    --ck-color-button-cancel: ${Colors.Red[500]};
    --ck-color-focus-outer-shadow: transparent;
    --ck-color-mention-background: ${Colors.Blue[100]};
    --ck-color-mention-text: ${Colors.Blue[500]};
  }
`

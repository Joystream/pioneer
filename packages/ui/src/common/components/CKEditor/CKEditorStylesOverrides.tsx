import { createGlobalStyle } from 'styled-components'

import { Colors, Transitions, ZIndex } from '../../constants'

export const CKEditorStylesOverrides = createGlobalStyle`
  .ck.ck-editor {
    width: 100%;
  }

  .ck.ck-content {
    line-height: 1.5em;
  }

  .ck.ck-content p,
  .ck.ck-content ul,
  .ck.ck-content ol {
    margin: 1em 0;
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

  :root {
    --ck-focus-ring: 1px solid ${Colors.Blue[300]};
    --ck-z-modal: calc(${ZIndex.modal} + 10);
  }
`

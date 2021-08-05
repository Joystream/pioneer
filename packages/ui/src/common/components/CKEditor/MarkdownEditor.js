import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import InlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Image from '@ckeditor/ckeditor5-image/src/image'
import Indent from '@ckeditor/ckeditor5-indent/src/indent'
import Link from '@ckeditor/ckeditor5-link/src/link'
import List from '@ckeditor/ckeditor5-list/src/list'
import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown'
import Mention from '@ckeditor/ckeditor5-mention/src/mention'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation'

export const MarkdownEditor = ClassicEditor

export const InlineMarkdownEditor = InlineEditor

// Plugins to include in the build.
const plugins = [
  Markdown,
  Essentials,
  Autoformat,
  Bold,
  Italic,
  Strikethrough,
  BlockQuote,
  Heading,
  Image,
  Indent,
  Link,
  List,
  Mention,
  MentionToLink,
  Paragraph,
  PasteFromOffice,
  TextTransformation,
]

ClassicEditor.builtinPlugins = plugins
InlineEditor.builtinPlugins = plugins

// See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#customizing-the-output
function MentionToLink(editor) {
  editor.conversion.for('downcast').attributeToElement({
    model: 'mention',
    view: (modelAttributeValue, { writer }) =>
      modelAttributeValue && writer.createAttributeElement('a', {
        class: 'mention',
        href: `#mention?member-id=${modelAttributeValue.memberId}`,
      }),
    converterPriority: 'high',
  })
}

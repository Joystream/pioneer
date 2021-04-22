/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
// @ts-ignore
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
// @ts-ignore
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
// @ts-ignore
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
// @ts-ignore
import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown'

export const MarkdownEditor = ClassicEditor

// Plugins to include in the build.
// @ts-ignore
ClassicEditor.builtinPlugins = [
  Markdown,
  Essentials,
  // UploadAdapter,
  // Autoformat,
  Bold,
  Italic,
  // BlockQuote,
  // CKFinder,
  // CloudServices,
  // EasyImage,
  Heading,
  Image,
  // ImageCaption,
  // ImageStyle,
  // ImageToolbar,
  // ImageUpload,
  // Indent,
  // Link,
  // List,
  // MediaEmbed,
  // Paragraph,
  // PasteFromOffice,
  // Table,
  // TableToolbar,
  // TextTransformation
]
/* eslint-enable @typescript-eslint/ban-ts-comment */

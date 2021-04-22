import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown'

export const MarkdownEditor = ClassicEditor

// Plugins to include in the build.
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

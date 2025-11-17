import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  imagePlugin,
  linkPlugin,
  toolbarPlugin, // Required for the toolbar UI!
  BoldItalicUnderlineToggles, // Toolbar contents
  ListsToggle,
  BlockTypeSelect,
  UndoRedo,
  CodeToggle,
  InsertImage,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  markdownShortcutPlugin,
  tablePlugin,
  InsertTable,
  InsertSandpack,
  linkDialogPlugin, imageDialogState$,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { cn } from '@/lib/utils';
import { useContent } from '@/context/GenerationContext';
import CustomImageDialog from '@/components/Layout/Dashboard/Generate/Editor/CustomImageDialog';

export default function Editor({ markdown, setMarkdown }) {
  const { setGeneratedContent } = useContent();
  return (
    <MDXEditor
      markdown={markdown}
      onChange={setGeneratedContent}
      plugins={[
        // Toolbar with basic controls
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <ListsToggle options={["number", "bullet", "check"]} />
              <CodeToggle />
              <InsertImage />
              <InsertTable/>
              <InsertSandpack/>
              {/* You can add more buttons here */}
            </>
          ),
          toolbarClassName: 'toolbar-className',
        }),
        imagePlugin({
          ImageDialog: CustomImageDialog,
        }),
        headingsPlugin(),
        linkDialogPlugin({
          linkAutocompleteSuggestions: ['https://virtuoso.dev', 'https://mdxeditor.dev'],
        }),
        linkPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'javaScript' }),
        // sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),
        directivesPlugin({ directiveDescriptors: [ AdmonitionDirectiveDescriptor] }),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
        markdownShortcutPlugin(),
        listsPlugin(),
        quotePlugin(),
        imagePlugin(),
        linkPlugin(),
        tablePlugin(),
      ]}
      contentEditableClassName={cn('container-full !h-[100%] p-2 overflow-y-auto prose markdown markdown-content-area')}
      className={cn('container-full rounded-md bg-white overflow-hidden')}
    />
  );
}
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
  markdownShortcutPlugin, tablePlugin, InsertTable, InsertSandpack,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { cn } from '@/lib/utils';
import { useContent } from '@/context/GenerationContext';

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
              <ListsToggle />
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
          // 🚨 CRITICAL: Use the imageEditor option to inject your custom UI

          // Set the default placeholder if needed (optional)
          // imageUploadHandler: yourOptionalUploadHandlerFunction,
        }),
        // Core features
        headingsPlugin(),
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
      contentEditableClassName={cn('container-full !h-[100%] p-2 overflow-y-auto  markdown markdown-content-area')}
      className={cn('container-full rounded-md bg-white overflow-hidden')}
    />
  );
}
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { Markdown } from 'tiptap-markdown';
import { Toolbar } from './Toolbar';
import { MathNode } from './MathExtension';

const lowlight = createLowlight(common);

interface Props { content: string; onChange: (c: string) => void }

type MarkdownStorage = { markdown: { getMarkdown: () => string } };

export const Editor: React.FC<Props> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Table,
      TableRow,
      TableHeader,
      TableCell,
      MathNode,
      Placeholder.configure({ placeholder: 'اكتب هنا...' }),
      Markdown.configure({ tightLists: true }),
    ],
    content,
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: { class: 'editor-content', dir: 'rtl' },
    },
    onUpdate: ({ editor }) => {
      onChange((editor.storage as unknown as MarkdownStorage).markdown.getMarkdown());
    },
  });

  if (!editor) return null;

  const text = editor.getText();
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <Toolbar editor={editor} />
      <div
        style={{ flex: 1, overflowY: 'auto', cursor: 'text' }}
        onClick={(e) => { if (e.target === e.currentTarget) editor.commands.focus('end'); }}
      >
        <EditorContent editor={editor} />
      </div>
      <div style={{
        padding: '6px 16px',
        background: 'var(--panel)',
        borderTop: '1px solid var(--border)',
        color: 'var(--muted)',
        fontSize: '13px',
      }}>
        الكلمات: {words} | الأحرف: {text.length}
      </div>
    </div>
  );
};
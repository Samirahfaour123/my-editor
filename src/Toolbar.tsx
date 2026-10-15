import React from 'react';
import type { Editor } from '@tiptap/react';

interface Props { editor: Editor }

export const Toolbar: React.FC<Props> = ({ editor }) => {
  const chain = () => editor.chain().focus();

  const btn = (
    label: React.ReactNode,
    active: boolean,
    action: () => void,
    disabled = false,
  ) => (
    <button
      type="button"
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()} // يبقي التركيز داخل المحرر
      onClick={action}
      style={{
        background: active ? 'var(--accent)' : 'var(--bg)',
        color: active ? 'var(--bg)' : 'var(--text)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        padding: '6px 12px',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        fontSize: '14px',
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      background: 'var(--panel)',
      borderBottom: '1px solid var(--border)',
    }}>
      {btn(<b>H1</b>, editor.isActive('heading', { level: 1 }), () => chain().toggleHeading({ level: 1 }).run())}
      {btn(<b>H2</b>, editor.isActive('heading', { level: 2 }), () => chain().toggleHeading({ level: 2 }).run())}
      {btn(<b>B</b>, editor.isActive('bold'), () => chain().toggleBold().run())}
      {btn(<i>I</i>, editor.isActive('italic'), () => chain().toggleItalic().run())}
      {btn('• قائمة', editor.isActive('bulletList'), () => chain().toggleBulletList().run())}
      {btn('1. مرقمة', editor.isActive('orderedList'), () => chain().toggleOrderedList().run())}
      {btn('☑ مهام', editor.isActive('taskList'), () => chain().toggleTaskList().run())}
      {btn('” اقتباس', editor.isActive('blockquote'), () => chain().toggleBlockquote().run())}
      {btn('</>', editor.isActive('codeBlock'), () => chain().toggleCodeBlock().run())}
      {btn('▦ جدول', editor.isActive('table'), () =>
        chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run())}
      {btn('↶', false, () => chain().undo().run(), !editor.can().undo())}
      {btn('↷', false, () => chain().redo().run(), !editor.can().redo())}
    </div>
  );
};
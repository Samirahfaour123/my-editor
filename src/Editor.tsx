import React, { useRef } from 'react';
import { Toolbar } from './Toolbar';
import { Preview } from './Preview';

interface Props { content: string; onChange: (c: string) => void }

export const Editor: React.FC<Props> = ({ content, onChange }) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;

  const insert = (prefix: string, suffix = '') => {
    const ta = ref.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.slice(start, end) || 'نص جديد';
    onChange(content.slice(0, start) + prefix + selected + suffix + content.slice(end));
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <Toolbar onInsertText={insert} />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', borderLeft: '1px solid var(--border)' }}>
          <textarea
            ref={ref}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="اكتب هنا..."
            style={{
              flex: 1,
              padding: '16px',
              background: 'var(--bg)',
              color: 'var(--text)',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              fontFamily: 'monospace',
              resize: 'none',
              lineHeight: 1.6,
              direction: 'rtl',
            }}
          />
          <div style={{
            padding: '6px 16px',
            background: 'var(--panel)',
            borderTop: '1px solid var(--border)',
            color: 'var(--muted)',
            fontSize: '13px',
          }}>
            الكلمات: {words} | الأحرف: {content.length}
          </div>
        </div>
        <Preview content={content} />
      </div>
    </div>
  );
};
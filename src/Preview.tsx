import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';

interface Props { content: string }

export const Preview: React.FC<Props> = ({ content }) => (
  <div style={{
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg)',
    color: 'var(--text)',
    overflowY: 'auto',
    direction: 'rtl',
    textAlign: 'right',
    transition: 'background-color 0.3s, color 0.3s',
  }}>
    <div style={{
      padding: '10px 16px',
      background: 'var(--panel)',
      borderBottom: '1px solid var(--border)',
      fontSize: '14px',
      fontWeight: 'bold',
      color: 'var(--muted)',
    }}>
      معاينة Markdown
    </div>
    <div className="markdown-preview" style={{ padding: '20px', flex: 1 }}>
      {content.trim() ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      ) : (
        <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
          ستظهر المعاينة هنا...
        </p>
      )}
    </div>
  </div>
);
import React from 'react';

interface Props {
  docTitle: string;
  onTitleChange: (t: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<Props> = ({ docTitle, onTitleChange, theme, onToggleTheme }) => (
  <header style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 28px',
    background: 'var(--panel)',
    color: 'var(--text)',
    borderBottom: '1px solid var(--border)',
    direction: 'rtl',
    transition: 'background-color 0.3s',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '20px' }}>📝</span>
      <input
        value={docTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="عنوان المستند"
        style={{
          width: '280px',
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--text)',
          background: 'transparent',
          border: 'none',
          borderBottom: '1px dashed var(--border)',
          outline: 'none',
        }}
      />
    </div>
    <div style={{ display: 'flex', gap: '12px' }}>
      <button onClick={onToggleTheme} style={{
        padding: '8px 16px',
        background: 'var(--bg)',
        color: 'var(--text)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        cursor: 'pointer',
      }}>
        {theme === 'dark' ? '☀️ فاتح' : '🌙 داكن'}
      </button>
      <button style={{
        padding: '8px 16px',
        background: '#0284c7',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 500,
      }}>
        مشاركة 🔗
      </button>
    </div>
  </header>
);
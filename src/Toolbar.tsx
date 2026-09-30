import React from 'react';

interface Props { onInsertText: (prefix: string, suffix?: string) => void }

const btn: React.CSSProperties = {
  background: 'var(--bg)',
  color: 'var(--text)',
  border: '1px solid var(--border)',
  borderRadius: '6px',
  padding: '6px 12px',
  cursor: 'pointer',
  fontSize: '14px',
};

export const Toolbar: React.FC<Props> = ({ onInsertText }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'var(--panel)',
    borderBottom: '1px solid var(--border)',
  }}>
    <button style={btn} onClick={() => onInsertText('# ')}><b>H1</b></button>
    <button style={btn} onClick={() => onInsertText('## ')}><b>H2</b></button>
    <button style={btn} onClick={() => onInsertText('**', '**')}><b>B</b></button>
    <button style={btn} onClick={() => onInsertText('*', '*')}><i>I</i></button>
    <button style={btn} onClick={() => onInsertText('- ')}>• قائمة</button>
    <button style={btn} onClick={() => onInsertText('> ')}>” اقتباس</button>
    <button style={btn} onClick={() => onInsertText('```\n', '\n```')}>{'</>'}</button>
  </div>
);
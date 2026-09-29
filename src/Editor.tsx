import React, { useState } from 'react';
import { Toolbar } from './Toolbar';

export const Editor: React.FC = () => {
  const [content, setContent] = useState<string>('# مرحباً بك في المحرر التعاوني!\n\nابدأ بكتابة نص Markdown هنا...');

  const handleInsertText = (prefix: string, suffix: string = '') => {
    setContent((prev) => `${prev}\n${prefix}نص جديد${suffix}`);
  };

  return (
    <div style={styles.container}>
      <Toolbar onInsertText={handleInsertText} />
      <textarea
        style={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="اكتب هنا..."
      />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
  },
  textarea: {
    flex: 1,
    width: '100%',
    padding: '16px',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    fontFamily: 'monospace',
    resize: 'none',
    lineHeight: '1.6',
  },
};
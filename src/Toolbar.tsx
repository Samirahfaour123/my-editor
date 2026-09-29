import React from 'react';

interface ToolbarProps {
  onInsertText: (prefix: string, suffix?: string) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onInsertText }) => {
  return (
    <div style={styles.toolbar}>
      <button 
        type="button" 
        style={styles.button} 
        onClick={() => onInsertText('# ')} 
        title="عنوان رئيسي"
      >
        <b>H1</b>
      </button>

      <button 
        type="button" 
        style={styles.button} 
        onClick={() => onInsertText('## ')} 
        title="عنوان فرعي"
      >
        <b>H2</b>
      </button>

      <div style={styles.divider} />

      <button 
        type="button" 
        style={styles.button} 
        onClick={() => onInsertText('**', '**')} 
        title="خط عريض"
      >
        <b>B</b>
      </button>

      <button 
        type="button" 
        style={styles.button} 
        onClick={() => onInsertText('*', '*')} 
        title="خط مائل"
      >
        <i>I</i>
      </button>

      <div style={styles.divider} />

      <button 
        type="button" 
        style={styles.button} 
        onClick={() => onInsertText('- ')} 
        title="قائمة نقطية"
      >
        • قائمة
      </button>

      <button 
        type="button" 
        style={styles.button} 
        onClick={() => onInsertText('> ')} 
        title="اقتباس"
      >
        ” اقتباس
      </button>

      <button 
        type="button" 
        style={styles.button} 
        onClick={() => onInsertText('```\n', '\n```')} 
        title="كتلة كود"
      >
        {'</>'}
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#1e293b',
    borderBottom: '1px solid #334155',
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#334155',
    color: '#f8fafc',
    border: '1px solid #475569',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: '1px',
    height: '20px',
    backgroundColor: '#475569',
    margin: '0 4px',
  },
};
import React from 'react';

interface Doc { id: string; title: string }
interface Props {
  documents: Doc[];
  activeDocId: string;
  onSelectDoc: (id: string) => void;
  onCreateDoc: () => void;
}

export const Sidebar: React.FC<Props> = ({ documents, activeDocId, onSelectDoc, onCreateDoc }) => (
  <aside style={{
    width: '250px',
    background: 'var(--panel)',
    borderLeft: '1px solid var(--border)',
    height: '100%',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    direction: 'rtl',
    transition: 'background-color 0.3s',
  }}>
    <div>
      <button onClick={onCreateDoc} style={{
        width: '100%',
        padding: '10px',
        background: '#0284c7',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginBottom: '20px',
      }}>
        ➕ مستند جديد
      </button>

      <p style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 'bold' }}>
        المستندات الخاصة بك
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {documents.map(doc => (
          <button key={doc.id} onClick={() => onSelectDoc(doc.id)} style={{
            width: '100%',
            padding: '8px 12px',
            background: activeDocId === doc.id ? 'var(--bg)' : 'transparent',
            color: activeDocId === doc.id ? 'var(--accent)' : 'var(--muted)',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            textAlign: 'right',
            fontSize: '14px',
          }}>
            📄 {doc.title}
          </button>
        ))}
      </div>
    </div>

    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
      <button style={{
        width: '100%',
        padding: '8px',
        background: 'transparent',
        color: 'var(--muted)',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'right',
        fontSize: '13px',
      }}>
        🌐 الرسم البياني
      </button>
    </div>
  </aside>
);
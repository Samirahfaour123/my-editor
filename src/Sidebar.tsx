import React from 'react';

interface SidebarProps {
  documents: { id: string; title: string }[];
  activeDocId: string;
  onSelectDoc: (id: string) => void;
  onCreateDoc: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  documents,
  activeDocId,
  onSelectDoc,
  onCreateDoc,
}) => {
  return (
    <aside style={{
      width: '250px',
      backgroundColor: '#1e293b',
      borderLeft: '1px solid #334155',
      height: 'calc(100vh - 57px)',
      padding: '16px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      direction: 'rtl'
    }}>
      <div>
        {/* زر إنشاء مستند جديد */}
        <button
          onClick={onCreateDoc}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#0284c7',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span>➕</span> مستند جديد
        </button>

        {/* قائمة المستندات */}
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px' }}>
            المستندات الخاصة بكِ
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => onSelectDoc(doc.id)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: activeDocId === doc.id ? '#334155' : 'transparent',
                  color: activeDocId === doc.id ? '#38bdf8' : '#94a3b8',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'right',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>📄</span> {doc.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* أسفل القائمة: أزرار سريعة */}
      <div style={{ borderTop: '1px solid #334155', paddingTop: '12px' }}>
        <button style={{
          width: '100%',
          padding: '8px',
          backgroundColor: 'transparent',
          color: '#94a3b8',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'right',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>🌐</span> الرسم البياني (Graph View)
        </button>
      </div>
    </aside>
  );
};
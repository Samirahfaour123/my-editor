import React from 'react';

interface HeaderProps {
  docTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ docTitle }) => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 28px',
      backgroundColor: '#1e293b',
      color: '#ffffff',
      borderBottom: '1px solid #334155',
      fontFamily: 'sans-serif',
      direction: 'rtl'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '20px' }}>📝</span>
        <h1 style={{ fontSize: '18px', margin: 0, fontWeight: '600' }}>
          {docTitle}
        </h1>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#0284c7',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          مشاركة 🔗
        </button>
      </div>
    </header>
  );
};
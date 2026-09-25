import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

function App() {
  // حالة المستندات والصفحة الحالية
  const [documents, setDocuments] = useState([
    { id: '1', title: 'الصفحة الرئيسية للمشروع' },
    { id: '2', title: 'ملاحظات الاجتماع الأسبوعي' },
  ]);
  const [activeDocId, setActiveDocId] = useState('1');

  // إضافة مستند جديد
  const handleCreateDoc = () => {
    const newDoc = {
      id: Date.now().toString(),
      title: `مستند جديد ${documents.length + 1}`,
    };
    setDocuments([...documents, newDoc]);
    setActiveDocId(newDoc.id);
  };

  const activeDoc = documents.find((doc) => doc.id === activeDocId);

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc', direction: 'rtl' }}>
      <Header docTitle={activeDoc ? activeDoc.title : 'محرر Markdown'} />
      
      <div style={{ display: 'flex' }}>
        <Sidebar
          documents={documents}
          activeDocId={activeDocId}
          onSelectDoc={(id) => setActiveDocId(id)}
          onCreateDoc={handleCreateDoc}
        />
        
        {/* منطقة المحرر الرئيسية (سنضيف شريط الأدوات والمحرر فيها بعد ذلك) */}
        <main style={{ flex: 1, padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
          <h2>منطقة التحرير والمحتوى 📝</h2>
          <p>أنتِ الآن تتصفحين: <strong style={{ color: '#38bdf8' }}>{activeDoc?.title}</strong></p>
        </main>
      </div>
    </div>
  );
}

export default App;
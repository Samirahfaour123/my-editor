import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Editor } from './Editor';

function App() {
  const [documents, setDocuments] = useState([
    { id: '1', title: 'الصفحة الرئيسية للمشروع' },
    { id: '2', title: 'ملاحظات الاجتماع الأسبوعي' },
  ]);
  const [activeDocId, setActiveDocId] = useState('1');

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
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc', direction: 'rtl', display: 'flex', flexDirection: 'column' }}>
      <Header docTitle={activeDoc ? activeDoc.title : 'محرر Markdown'} />
      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 60px)' }}>
        <Sidebar
          documents={documents}
          activeDocId={activeDocId}
          onSelectDoc={(id) => setActiveDocId(id)}
          onCreateDoc={handleCreateDoc}
        />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Editor />
        </main>
      </div>
    </div>
  );
}

export default App;
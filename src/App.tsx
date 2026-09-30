import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Editor } from './Editor';

type Doc = { id: string; title: string; content: string };

const STORAGE_KEY = 'collab-md-docs';
const THEME_KEY = 'collab-md-theme';

const defaultDocs: Doc[] = [
  { id: '1', title: 'الصفحة الرئيسية', content: '# مرحباً بك!\n\nاكتبي **Markdown** هنا.' },
  { id: '2', title: 'ملاحظات الاجتماع', content: '' },
];

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function App() {
  const [documents, setDocuments] = useState<Doc[]>(() => load(STORAGE_KEY, defaultDocs));
  const [activeDocId, setActiveDocId] = useState(() => load(STORAGE_KEY, defaultDocs)[0]?.id ?? '');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => load(THEME_KEY, 'dark'));

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(documents)); }, [documents]);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  }, [theme]);

  const activeDoc = documents.find(d => d.id === activeDocId) ?? documents[0];

  const update = (patch: Partial<Doc>) => {
    if (!activeDoc) return;
    setDocuments(docs => docs.map(d => d.id === activeDoc.id ? { ...d, ...patch } : d));
  };

  const createDoc = () => {
    const doc: Doc = { id: Date.now().toString(), title: `مستند ${documents.length + 1}`, content: '' };
    setDocuments([...documents, doc]);
    setActiveDocId(doc.id);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      color: 'var(--text)',
      direction: 'rtl',
      display: 'flex',
      flexDirection: 'column',
      transition: 'background-color 0.3s, color 0.3s',
    }}>
      <Header
        docTitle={activeDoc?.title ?? ''}
        onTitleChange={(t) => update({ title: t })}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 62px)' }}>
        <Sidebar
          documents={documents}
          activeDocId={activeDoc?.id ?? ''}
          onSelectDoc={setActiveDocId}
          onCreateDoc={createDoc}
        />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {activeDoc && <Editor content={activeDoc.content} onChange={(c) => update({ content: c })} />}
        </main>
      </div>
    </div>
  );
}

export default App;
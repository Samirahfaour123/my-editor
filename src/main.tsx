// استيراد مكتبة React الأساسية
import React from 'react';

// استيراد ReactDOM للتعامل مع المتصفح
import ReactDOM from 'react-dom/client';

// استيراد ملف App الرئيسي (المكون الجذري)
import App from './App';

// استيراد ملف التنسيقات العام
import './index.css';

// نجد الصندوق الفارغ في index.html (id="root")
// العلامة ! تعني: أثق أنه موجود (لأن TypeScript يشك)
ReactDOM.createRoot(document.getElementById('root')!).render(

  // StrictMode: يفعّل تنبيهات إضافية لمساعدة المطور
  <React.StrictMode>

    {/* نضع مكون App داخل الصندوق */}
    <App />

  </React.StrictMode>
);
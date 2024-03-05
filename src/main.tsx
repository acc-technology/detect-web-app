import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#514390' },
        components: {
          Layout: { bodyBg: '#514390', headerBg: 'white', siderBg: '#514390' },
          Menu: { darkItemBg: '#514390', darkItemSelectedBg: '#e4c38b' },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
);

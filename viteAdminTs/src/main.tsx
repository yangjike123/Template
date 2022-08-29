import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import './index.css'
import { Provider } from "react-redux";
import zhCN from "antd/es/locale/zh_CN";
import { HashRouter } from "react-router-dom";
import { ConfigProvider, message } from "antd";
import { initModels, initRequest } from "./utils/index";
import models from "./models";
import { ELocalStorage } from './cofing/Enum';
const { VITE_APP_BASE_URL } = import.meta.env;
initRequest(
  VITE_APP_BASE_URL,
  (status: string | number, messages: { message: string }) => {
    if (401 == status) {
      location.reload(); //刷新页面重新登录
      localStorage.removeItem(ELocalStorage.Token);
    } else {
      message.error(messages.message);
    }
  },
  false //是否打印request记录
);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={initModels(models, true /*是否打印dva17记录 */)}>
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        <App />
      </HashRouter>
    </ConfigProvider>
  </Provider>
)

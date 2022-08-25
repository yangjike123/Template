import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider, message } from "antd";
import { HashRouter, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import "moment/dist/locale/zh-cn"; // 时间组件引入中文语言包
import { initModels, initRequest } from "./utils";
import models from "./models";
import { ELocalStorage } from "./cofing/Enum";
const { VITE_APP_BASE_URL } = import.meta.env;
// console.log(import.meta.env,"+env");
//import.meta.env.MODE: {string} 应用运行的模式。
//import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由base 配置项决定。
//import.meta.env.PROD: {boolean} 应用是否运行在生产环境。
//import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。

initRequest(
  VITE_APP_BASE_URL,
  (status, messages) => {
    if (401 == status) {
      location.reload(); //刷新页面重新登录
      localStorage.removeItem(ELocalStorage.Token);
    } else {
      message.error(messages.message); //TODO.请求异常
    }
  },
  false //是否打印request记录
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={initModels(models, true /*是否打印dva17记录 */)}>
    <ConfigProvider locale={zhCN}>
      {/* <React.StrictMode> */}
        <HashRouter>
          <App />
        </HashRouter>
      {/* </React.StrictMode> */}
    </ConfigProvider>
  </Provider>
);

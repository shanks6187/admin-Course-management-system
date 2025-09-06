import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@ant-design/v5-patch-for-react-19';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Cloud from 'leancloud-storage';
import { ID, KEY, BASE } from '@/config'
import { Provider } from 'react-redux';
import store from './store';

Cloud.init({  //全局初始化，当前项目的任何组件都可以调用leancloud-storage的方法
  appId: ID,
  appKey: KEY,
  serverURL: BASE
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>  
  //  StrictMode 是一种开发模式下的调试工具，
  // 用于检测组件中潜在的副作用问题（如未清理的订阅、非纯函数等）。
  // 它的核心特性之一是：
  // 在 开发环境 中，会对组件进行 “双重渲染”（mount → unmount → mount），
  // 从而让 useEffect、useLayoutEffect 等钩子的回调函数 执行两次
  // （模拟重复挂载的场景，暴露副作用问题）。


  <HashRouter>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b'
        }
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </HashRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

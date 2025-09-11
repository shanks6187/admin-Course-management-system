import React, { useState } from 'react';
import AppHeader from '@/layout/components/AppHeader'
import AddSider from '@/layout/components/AppSider'
import AppBreadcrumb from '@/layout/components/AppBreadcrumb'
import { SmileOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const { Content, Footer, Sider } = Layout;


const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const checkList = useSelector<RootState,string[]>((store) =>  store.user.userInfo!.checkList );
  let { pathname } = useLocation()


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" style={{ height: '32px', fontSize: '20px', margin: '16px', overflow: 'hidden', color: '#26c8fe', whiteSpace: 'nowrap', textAlign: 'center' }}>{collapsed ? <SmileOutlined /> : '后台管理系统'}</div>
        <AddSider></AddSider>
      </Sider>
      <Layout>
        <AppHeader></AppHeader>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ margin: '10px 0' }}>
            <AppBreadcrumb />

          </div>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {checkList.includes(pathname) || pathname=='/' ? <Outlet></Outlet> : "你没有访问权限"}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
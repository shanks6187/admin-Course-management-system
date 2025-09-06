import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, Link, href } from 'react-router-dom';
import { appBreadcrumbRoutes } from '@/router/utils'

// 路由映射表，key为路径，value为显示名称
const routeMap= appBreadcrumbRoutes ()

const AppBreadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  // 逐步拼接路径
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = '/' + pathSnippets.slice(0, index + 1).join('/');
    
    return {
      title: routeMap[url] ,
      // title: routeMap[url] || url , 
      href: url=='/Course'?'/Course/'+pathSnippets[1]:url,
    };
  });

  // 首页单独处理
  const items = [
    { title: '首页',href:'#/dashboard'},
    ...breadcrumbItems.map(item => ({
      title: item.title,
      href: `#${item.href}`,
    })),
  ];

  return <Breadcrumb separator=">" items={items} />;
};

export default AppBreadcrumb;
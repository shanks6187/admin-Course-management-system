import React, { useEffect, useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { mainRoutes } from '@/router'
import { useLocation, useNavigate } from 'react-router-dom';
import { IMenuType } from '@/router/inder';


export default function App() {
  let [selectKey, setselectKey] = useState<string>('')
  let [openKeys, setopenKeys] = useState('')
  let navigate = useNavigate()
  let location = useLocation()
  useEffect(() => {
    
    if (location.pathname === '/') {
      setselectKey('/dashboard')
    } else {
      setselectKey(location.pathname)
    }
    let h = location.pathname.split("/")[1]
    setopenKeys(`/${h}`)
  }, [])
  useEffect(() => {
    if (location.pathname === '/') {
      setselectKey('/dashboard')
    } else {
      setselectKey(location.pathname)
    }
    let h = location.pathname.split("/")[1]
    setopenKeys(`/${h}`)
  }, [location.pathname])


  function handleClick({ key }: { key: string }) {
    navigate(key)
    setselectKey(key)
  }
  function OpenChange(openKeys: string[]) {
    setopenKeys(openKeys[1])
  }
  function convertRoutesToMenuItems(routes: any[]): MenuProps['items'] {
    return routes.map(route => {
      if (route.children && Array.isArray(route.children)) {
        return {
          key: route.key,
          label: route.label,
          children: convertRoutesToMenuItems(route.children),
          icon: route.icon,
          hiddent: route.hiddent
        };
      }
      return {
        key: route.key,
        label: route.label,
        icon: route.icon,
        hiddent: route.hiddent
      };
    });
  }

  const menuItems = convertRoutesToMenuItems(mainRoutes);
  let handleRouter = (routes: any) => {
    return routes.filter((item: any) => {
      if (item.children) {
        item.children = handleRouter(item.children)
      }
      return !item.hiddent
    })
  }
  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={handleClick}
      items={handleRouter(menuItems)}
      selectedKeys={[selectKey]}
      openKeys={[openKeys]}
      onOpenChange={OpenChange}
    />
  );
}

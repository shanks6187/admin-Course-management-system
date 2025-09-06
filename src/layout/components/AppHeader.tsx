import * as React from 'react';
import { Layout, theme, Dropdown, message, Row, Col } from 'antd';
import { SettingOutlined, UserDeleteOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { loginfail } from '@/store/modules/user';

const { Header, Content, Footer, Sider } = Layout;
export interface IHeaderProps {
}

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

export default function AppHeader(props: IHeaderProps) {

  let user = useSelector((store: RootState) => store.user)


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dispatch = useDispatch()

  const items: MenuProps['items'] = [
    {
      label: '个人设置',
      key: '2',
      icon: <SettingOutlined />,
    },
    {
      label: '退出登录',
      key: '3',
      icon: <UserDeleteOutlined />,
      danger: true,
    },
  ];
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key == '3') {
      dispatch(loginfail())
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Header style={{ padding: "0 20px", background: colorBgContainer }} >
      <Row justify={'end'} align={'middle'} style={{ height: '100%' }}>
        <Col>
          <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
            {user.userInfo ? user.userInfo.username as string : '尚未登录'}
          </Dropdown.Button>
        </Col>
      </Row>

    </Header>
  );
}
import { courseGet, IcoursePostType } from '@/api/course';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Col, Drawer, Dropdown, Image, Popconfirm, RadioChangeEvent, Row, Space, Switch, Table, Tag } from 'antd';
import { DrawerProps } from 'antd/lib';
import { useEffect, useRef, useState } from 'react';
import Roleform from '@/views/Manager/components/Roleform'
import { roleGet, RoleType } from '@/api/user';


const columns = [
  {
    dataIndex: 'objectId',
    title: '角色ID',
  },
  {
    dataIndex: 'name',
    title: '角色名称',
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'btn',
    dataIndex: 'btn',
    render:(_:any,record:any)=>(
        <Space size="middle">
          <Button type='primary'>编辑</Button>
          <Button type='primary' danger>删除</Button>
        </Space>
    )
  },


];

export default function () {
  const actionRef = useRef<ActionType | any>('');
  const [open, setOpen] = useState(false);
  const [Listdata, setdata] = useState<RoleType[]>([]);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

  useEffect(() => {
    roleGet().then(res => {
      console.log(res);
      
      setdata(res.data.results)
    })
  }, [])

  const showDrawer = () => {
    setOpen(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onshowtips = () => {
    setOpen(true);
  }

  const updateUserList = (value:RoleType)=>{
    setdata(prev => [...prev, value]);
  }

  return (<>
    <Drawer
      title="权限管理"
      placement={placement}
      width={500}
      onClose={onClose}
      open={open}
    >
      <Roleform updateUserList={updateUserList}></Roleform>
      {/* 给子组件传递一个方法需要在组件内定义类型 */}
    </Drawer>
    <Row align={'middle'}>
      <Col>
        <Space>
          <Button type='primary' onClick={onshowtips}>新增角色</Button>
          <Popconfirm title="确定不是手抖了？" description="删除后数据无法找回" okText="确定" cancelText="取消">
            <Button type='primary' danger>批量删除</Button>
          </Popconfirm>
          
        </Space>
      </Col>
    </Row>
    <Table dataSource={Listdata} columns={columns} />;
  </>

  );
};
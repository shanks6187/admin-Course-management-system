import { courseGet, IcoursePostType } from '@/api/course';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Col, Drawer, Dropdown, Image, Popconfirm, RadioChangeEvent, Row, Space, Switch, Table, Tag } from 'antd';
import { DrawerProps } from 'antd/lib';
import { useEffect, useRef, useState } from 'react';
import Roleform from '@/views/Manager/components/Roleform'
import { RolebatchDelete, roleDelete, roleGet, RoleType } from '@/api/user';
import { TableRowSelection } from 'antd/es/table/interface';


export default function () {
  const actionRef = useRef<ActionType | any>('');
  const [open, setOpen] = useState(false);
  const [Listdata, setdata] = useState<RoleType[]>([]);
  const [RuleData ,setRuleData] = useState<RoleType |null>(null)
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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
    render:(_:any,record:RoleType,index:number)=>(
        <Space size="middle">
          <Button type='primary' onClick={()=>{
            setRuleData(record)
            setOpen(true);
          }}>编辑</Button>
          
          <Popconfirm title="确定不是手抖了？" description="删除后数据无法找回" okText="确定" cancelText="取消" onConfirm={()=>handleyes(record,index)}>
            <Button type='primary' danger>删除</Button>
          </Popconfirm>
        </Space>
    )
  },
];

  useEffect(() => {
    roleGet().then(res => {
      console.log(res);
      
      setdata(res.data.results)
    })
  }, [])

  const onClose = () => {
    setOpen(false);
  };

  const handleyes = (record:RoleType,index:number)=>{
      console.log(record,index);
      roleDelete(record.objectId).then(res=>{
        // roleGet().then(res => {
        //   console.log(res);
        //   setdata(res.data.results)
        // })
        Listdata.splice(index,1)
        setdata([...Listdata])
      })
  }

  const onshowtips = () => {
    setRuleData(null)
    setOpen(true);
  }

  //修改视图
  const updateUserList = (value:RoleType)=>{
    console.log(value);
    let istrue = true
    for(let i=0;i<Listdata.length;i++){
      console.log(Listdata[i].objectId);
      if(Listdata[i].objectId==value.objectId){
        Listdata[i]=value
        istrue=false
        break
      }
    }
    if(istrue){
      Listdata.push(value)
    }
    setdata([...Listdata]);
  }
  const handleChange = (newSelectedRowKeys: React.Key[])=>{
    console.log(newSelectedRowKeys);
    setSelectedRowKeys([...newSelectedRowKeys])
  }

  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }
  const rowSelection : TableRowSelection<RoleType> ={
    selectedRowKeys,
    onChange:handleChange
  }

  const deleteList = ()=>{
    RolebatchDelete(selectedRowKeys).then(res=>{
      let arr=Listdata.filter(item=>{
        return !selectedRowKeys.includes(item.objectId)
      })
      setdata([...arr])
    })
  }


  return (<>
    <Drawer
      title="权限管理"
      placement={placement}
      width={500}
      onClose={onClose}
      open={open}
    >
      <Roleform RuleData={RuleData} updateUserList={updateUserList}></Roleform>
      {/* 给子组件传递一个方法需要在组件内定义类型 */}
    </Drawer>
    <Row align={'middle'}>
      <Col>
        <Space>
          <Button type='primary' onClick={onshowtips}>新增角色</Button>
          {
            selectedRowKeys.length?<Button type='primary' danger onClick={deleteList}>批量删除</Button>:""
          }
        </Space>
      </Col>
    </Row>
    <Table rowSelection={rowSelection} dataSource={Listdata} rowKey={'objectId'} columns={columns} />;
  </>

  );
};
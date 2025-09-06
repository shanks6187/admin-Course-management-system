import React, { useState } from 'react';
import { Button, Form, Input, Select, Space, Tree, TreeDataNode } from 'antd';
import { TreeProps } from 'antd/lib';

import {appTreeRoutes} from '@/router/utils'
import { rolePost, RoleType } from '@/api/user';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface RoleformPropsType  {
    updateUserList:(arg:RoleType)=>void
}

const App: React.FC<RoleformPropsType> = (props) => {
  const [form] = Form.useForm();

const treeData :TreeDataNode[] =appTreeRoutes()

  const onFinish = (values: any) => {
    values['checkedKeys']=checkedKeys
    rolePost(values).then((res)=>{
        console.log(res);
        props.updateUserList({...values,objectId:res.data.objectId})
    })
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
  };

  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);


  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };


  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 350 }}
    >
      <Form.Item name="name" label="角色名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="checkedKeys" key='checkedKeys' label="菜单权限">
        <Tree
            checkable
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={treeData}
        >
        </Tree>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            新增角色
          </Button>
          
        </Space>
      </Form.Item>
    </Form>
  );
};

export default App;
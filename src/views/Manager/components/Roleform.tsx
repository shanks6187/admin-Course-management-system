import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Space, Tree, TreeDataNode } from 'antd';
import { TreeProps } from 'antd/lib';

import { appTreeRoutes } from '@/router/utils'
import { rolePost, rolePut, RoleType } from '@/api/user';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface RoleformPropsType {
  updateUserList: (arg: RoleType) => void,
  RuleData: RoleType | null
}

const App: React.FC<RoleformPropsType> = (props) => {
  const [form] = Form.useForm();
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const treeData: TreeDataNode[] = appTreeRoutes()

  useEffect(() => {
    if (props.RuleData) {
      form.setFieldValue('name', props.RuleData.name);
      setCheckedKeys(props.RuleData.checkedKeys || []);
    } else {
      form.setFieldValue(null)
      setCheckedKeys([])
    }
  }, [props.RuleData])

  const onFinish = (values: any) => {
    values['checkedKeys'] = checkedKeys
    if (props.RuleData) {

      rolePut(props.RuleData.objectId, values).then(res => {
        console.log({...values,objectId: res.data.objectId});
        
        props.updateUserList({...values,objectId: res.data.objectId})
      })
    } else {
      rolePost(values).then((res) => {
        props.updateUserList({ ...values, objectId: res.data.objectId })
      })
    }
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  return (
    <Form
      {...layout}
      form={form}
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
            {props.RuleData?"编辑角色":"新建角色"}
          </Button>

        </Space>
      </Form.Item>
    </Form>
  );
};

export default App;
import React, { useEffect, useState } from 'react';
import type { Key } from 'react';

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
  //用于展示的权限选择数据
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  //后端的权限数据
  const [checkList, setcheckList] = useState<React.Key[]>([]);
  const treeData: TreeDataNode[] = appTreeRoutes()

  //渲染列表数据
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
    values['checkList'] = checkList

    if (props.RuleData) {

      rolePut(props.RuleData.objectId, values).then(res => {
        console.log({ ...values, objectId: res.data.objectId });

        props.updateUserList({ ...values, objectId: res.data.objectId })
      })
    } else {
      rolePost(values).then((res) => {
        props.updateUserList({ ...values, objectId: res.data.objectId })
      })
    }
  };

  function processPaths(paths: Key[]): Key[] {
    // 使用Set存储以自动去重
    const pathSet = new Set<Key>(paths);

    paths.forEach(path => {
      // 将Key转换为字符串处理
      const pathStr = String(path);
      // 检查是否包含至少两个斜杠
      if (pathStr.split('/').length > 2) {
        // 提取一级路径（如 '/Course/Article' → '/Course'）
        const firstLevelPath = '/' + pathStr.split('/')[1] as Key;
        pathSet.add(firstLevelPath);
      }
    });

    // 转换为数组返回
    return Array.from(pathSet);
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    let parentKeys = processPaths(checkedKeysValue as React.Key[])
    console.log('onCheck', checkedKeysValue);
    console.log('onparentKeys', parentKeys);
    setcheckList(parentKeys)
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
            {props.RuleData ? "编辑角色" : "新建角色"}
          </Button>

        </Space>
      </Form.Item>
    </Form>
  );
};

export default App;
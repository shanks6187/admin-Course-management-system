import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Space, Tree, TreeDataNode } from 'antd';

import { appTreeRoutes } from '@/router/utils'
import { roleGet, rolePost, rolePut, RoleType, userGet, userPost } from '@/api/user';


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
    const [select, setselect] = useState<RoleType[]>([])

    useEffect(() => {
        roleGet().then(res => {
            let arr = res.data.results.map((item: RoleType, index: number) => {
                item.idx = index
                return item
            })
            setselect(arr)
        })
    }, [])

    const onFinish = (values: any) => {
        let { objectId, name } = select[values.idx] //根据下表拿到select的数据
        values.objectId = objectId
        values.roleName = name
        userPost(values).then((res) => {
            console.log(res);
        })
    };

    return (
        <Form
            {...layout}
            form={form}
            onFinish={onFinish}
            style={{ maxWidth: 350 }}
        >
            <Form.Item name="username" label="用户账号" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="默认密码" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="idx" label="归属分类" rules={[{ required: true }]}>
                <Select options={select} fieldNames={{ label: 'name', value: 'idx' }}></Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        {props.RuleData ? "编辑角色" : "新增账号"}
                    </Button>

                </Space>
            </Form.Item>
        </Form>
    );
};

export default App;
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button, Cascader, Form, Input, Select, Space, Switch } from 'antd';
import { CategoryPost, CategoryType, CategoryGet, coursePost } from '@/api/course';
import ImgUpload from '@/components/imgUpload';
import { userAppSelector } from '@/store/modules/hook';
import { UserUpdate, UserUpdateParams } from '@/api/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUpdate } from '@/store/modules/user';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Usersetting: React.FC = () => {
  let Navigate =  useNavigate()
  const [form] = Form.useForm();
  const [CataList, setCataList] = useState<CategoryType[]>([])

  const user = userAppSelector(state=>state.user)
  let dispatch = useDispatch()
  
  const onFinish = (values: UserUpdateParams, status = true) => {
    
    if (user.userInfo) {
      UserUpdate(user.userInfo.objectId,values).then(res=>{
        console.log(res);
        console.log(values);
        console.log(user.userInfo);
        //这样的书写方式，values存在user.userInfo的值，values就会覆盖前者
        dispatch(loginUpdate({...user.userInfo,...values}))
      })
    }else{
      Navigate('/login')
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    CategoryGet({}).then(res => {
      let { results } = res.data
      let arr = results.filter((item: CategoryType) => { return item.fatherId == '0-01' })
      arr.forEach((item: CategoryType) => {
        item.children = results.filter((child: CategoryType) => { return child.fatherId == item.objectId })
      });
      setCataList(arr)
    })
    form.setFieldsValue(user.userInfo)
  }, [])

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="username" id='name-field' label="用户名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="poster" id='poster-field' label="用户头像" rules={[{ required: true }]}>
        {/* 嵌套子组件，子组件会隐形接收一个props参数，参数中有onChange和value，value的值会被父组件Form的name给接收 */}
        <ImgUpload />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Usersetting;
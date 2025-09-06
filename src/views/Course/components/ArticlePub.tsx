import React, { useEffect, useState,Dispatch,SetStateAction } from 'react';
import { Button, Cascader, Form, Input, Select, Space, Switch } from 'antd';
import { CategoryPost, CategoryType,CategoryGet, coursePost, IcoursePostType } from '@/api/course';
import ImgUpload from '@/components/imgUpload';
import Wangeditor from '@/components/wangeditor'


const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


const CategoryForm: React.FC= () => {
  const [form] = Form.useForm();
  const [ CataList,setCataList ] = useState<CategoryType[]>([])


  const onFinish = (values:IcoursePostType,status=true) => {
    values.catelv1=values.category[0]
    values.catelv2=values.category[1]
    coursePost(values).then(res=>{
      console.log(res);
    })
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(()=>{
    CategoryGet({}).then(res=>{
      let { results} = res.data
      let arr = results.filter((item:CategoryType)=>{return item.fatherId=='0-01'})
      arr.forEach((item:CategoryType) => {
        item.children=results.filter((child:CategoryType)=>{return child.fatherId==item.objectId})
      });
      setCataList(arr)
    })
  },[])

  interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: '111',
    label: 'Zhejiang',
    children: [
      {
        value: '122',
        label: 'Hangzhou',
        children: [
          {
            value: '133',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '211',
    label: 'Jiangsu',
    children: [
      {
        value: '222',
        label: 'Nanjing',
        children: [
          {
            value: '233',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

  let handleChange = (value:any)=>{
    console.log(value);
    
  }


  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="name" id='name-field' label="课程名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="poster" id='poster-field' label="课程封面" rules={[{ required: true }]}> 
        {/* 嵌套子组件，子组件会隐形接收一个props参数，参数中有onChange和value，value的值会被父组件Form的name给接收 */}
          <ImgUpload />  
      </Form.Item>
      <Form.Item name="category" label="归属分类" rules={[{ required: true }]}>
        <Cascader options={CataList} fieldNames={{label:'cateName',value:'objectId'}} onChange={handleChange} placeholder="请选择"></Cascader>
      </Form.Item>
      <Form.Item name="isvip" label="会员课程" rules={[{ required: true }]}>
        <Switch></Switch>
      </Form.Item>
      <Form.Item name="info" label="课程简介" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="desc" label="课程详情" rules={[{ required: true }]}>
        <Wangeditor></Wangeditor>
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

export default CategoryForm;
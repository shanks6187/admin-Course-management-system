import React, { useEffect, useState,Dispatch,SetStateAction } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import { CategoryPost, CategoryType,CategoryGet } from '@/api/course';

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface ICatagoryForm{
  setisModalOpen: Dispatch<SetStateAction<boolean>>;
}

const CategoryForm: React.FC<ICatagoryForm> = (props) => {
  const [form] = Form.useForm();
  const [cateList,segcateList] = useState<CategoryType[]>([])

  useEffect(()=>{
    console.log('123');
    
    CategoryGet().then(res=>{
      segcateList(res.data.results)
      console.log(res.data.results);
      console.log(res.data.results[0]);
      
      
    })
  },[])

  const onFinish = (values: any,status=true) => {
    console.log(values);
    CategoryPost({...values,status}).then((res)=>{
        console.log(res);
        if(res.status=201){
          props.setisModalOpen(false)
        }
    })
  };

  const onReset = () => {
    form.resetFields();
  };


  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="cateName" label="分类名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="fatherId" label="归属分类" rules={[{ required: true }]}>
        <Select
          placeholder="请选择分类"
          allowClear
        >
          <Option value="0-01">顶级分类</Option>
          {
            cateList.map((item,index)=><Option key={item.objectId} value={item.objectId}>{item.cateName}</Option>)
          }
        </Select>
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
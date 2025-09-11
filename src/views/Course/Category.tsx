import React, { useEffect, useState } from 'react';
import { Grid, Row, Space, Table, Tag, Button, Modal, Switch } from 'antd';
import type { TableProps } from 'antd';
import CategoryForm from './components/CategoryForm';
import { CategoryGet, CategoryPut, CategoryType } from '@/api/course';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IuserInfoType } from '@/store/modules/user';
import { userAppSelector } from '@/store/modules/hook';



const Category: React.FC = () => {

  let [isModalOpen, setisModalOpen] = useState(false)
  let [CategoryList, setCategoryList] = useState([])
  let user = userAppSelector(store=>store.user.userInfo as IuserInfoType  )
  

  interface TableCategoryType extends CategoryType {
    children: CategoryType[]
  }
  const columns: TableProps<CategoryType>['columns'] = [
    {
      title: '父级ID',
      dataIndex: 'fatherId',
      key: 'fatherId',
      //渲染一行数据，这一行的序号
      render: (text, record, index) => <a>{text}</a>,
    },
    {
      title: '分类名称',
      dataIndex: 'cateName',
      key: 'cateName',
    },
    {
      title: '上架状态',
      dataIndex: 'status',
      key: 'status',
      render: (bool, record, index) => {
        return <Switch checked={bool} onChange={() => handleChange(bool, record, index)}></Switch>
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='primary'>编辑</Button>
          {
            user.roleName=='超级管理员'?<Button type='primary' danger>删除</Button>:""
          }
        </Space>
      ),
    },
  ];

  const handleChange = (bool: boolean, record: CategoryType, index: number) => {
    CategoryPut(record.objectId,!bool).then(res => {
      
    })
    let { fatherId } = record
      if(fatherId=='0-01'){
        CategoryList[index].status=!bool
      }else{
        let fixd:number = CategoryList.findIndex((Item:CategoryType)=>{
          return Item.objectId == fatherId
        })
        CategoryList[fixd].children[index].status=!bool
      }
      setCategoryList([...CategoryList])
  }



  function handleCancel() {
    setisModalOpen(false)
  }
  useEffect(() => {
    CategoryGet({}).then(res => {
      let { results } = res.data
      
      //拿到所有父级类目
      let arr = results.filter((item: CategoryType) => item.fatherId == '0-01')
      arr.forEach((item: TableCategoryType) => {
        let children = results.filter((child: CategoryType) => {
          return item.objectId == child.fatherId
        })
        item.children = children
      });
      setCategoryList(arr)
    })
  }, [])


  return (
    <div>
      <Row justify={'end'} align={'top'}>
        <Button type='primary' onClick={() => setisModalOpen(true)}>新增分类</Button>
      </Row>
      <Table<CategoryType> columns={columns} dataSource={CategoryList} rowKey='objectId' />;
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <CategoryForm setisModalOpen={setisModalOpen}></CategoryForm>
      </Modal>
    </div>
  )
}

export default Category;
import { courseGet, IcoursePostType } from '@/api/course';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Drawer, Dropdown, Image, RadioChangeEvent, Space, Switch, Tag } from 'antd';
import { DrawerProps } from 'antd/lib';
import { useRef, useState } from 'react';


const columns: ProColumns<IcoursePostType>[] = [
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
    dataIndex: 'info',
    title: '操作',
    copyable: true,
    ellipsis: true,
  },
  
  
];

export default function () {
  const actionRef = useRef<ActionType|any>('');
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

  const showDrawer = () => {
    setOpen(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onshowtips = ()=>{
    setOpen(true);
  }

  return (<>
    <Drawer
        title="Drawer with extra actions"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
      </Drawer>
      <ProTable<IcoursePostType>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      search={false}
      request={async (params, sort, filter) => {
        let res = await courseGet(params)
        return {
          data: res.data.results
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
        },
      }}
      rowKey="objectId"
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      toolBarRender={() => [
        <Button
          key="button"
          onClick={() => {
            onshowtips()
          }}
          type="primary"
        >
          新增角色
        </Button>,
        <Button
          key="button"
          onClick={() => {
            onshowtips()
          }}
          type="primary"
          danger
        >
          删除角色
        </Button>
      ]}
    />
    </>
    
  );
};
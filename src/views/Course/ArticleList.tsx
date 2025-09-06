import { courseGet, IcoursePostType } from '@/api/course';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Image, Space, Switch, Tag } from 'antd';
import { useRef } from 'react';
import { Navigate } from 'react-router-dom';


const columns: ProColumns<IcoursePostType>[] = [
  {
    dataIndex: 'objectId',
    title: '课程ID',
  },
  {
    dataIndex: 'name',
    title: '课程名称',
    ellipsis: true,
  },
  {
    dataIndex: 'info',
    title: '课程简介',
    copyable: true,
    ellipsis: true,
  },
  {
    dataIndex: 'isvip',
    title: '是否VIP',
    valueType: 'select',
    valueEnum: {
      2: {
        text: '全部课程'
      },
      1: {
        text: 'VIP课程'
      },
      0: {
        text: '免费课程'
      }
    },
    //一行数据，一行对象，一个是序号
    render: (boolr, record, index) => {
      let color = record.isvip ? 'blue' : "grey"
      return <Tag color={color}>{record.isvip ? 'VIP课程' : "免费课程"}</Tag>
    }
  },
  {
    dataIndex: 'poster',
    title: '课程封面',
    hideInSearch: true,
    render: (poster) => {
      return <Image src={poster as string}></Image>
    }
  },
  {
    dataIndex: 'desc',
    title: '课程详情',
    copyable: true,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
      // onClick={() => {
      //   action?.startEditable?.(record.id);
      // }}
      >
        编辑
      </a>,
      <a target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default function () {
  const actionRef = useRef<ActionType>();

  const onshowtips = ()=>{
  //    Navigate('/')
  }
  return (
    <ProTable<IcoursePostType>
      columns={columns}
      actionRef={actionRef}
      cardBordered
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
      search={{
        labelWidth: 'auto',
      }}
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
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            onshowtips()
          }}
          type="primary"
        >
          新建
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1',
              },
              {
                label: '2nd item',
                key: '2',
              },
              {
                label: '3rd item',
                key: '3',
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};
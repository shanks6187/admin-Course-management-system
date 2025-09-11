import { AreaChartOutlined,SettingOutlined,UserOutlined,UnorderedListOutlined } from '@ant-design/icons'
import { IMenuType } from './inder'
import Dashboard   from '@/views/dashboard/dashboard'
import ArticleList from '@/views/Course/ArticleList'
import Category from '@/views/Course/Category'
import ArticlePub from '@/views/Course/components/ArticlePub'
import ArticleEdit from '@/views/Course/components/ArticleEdit'
import Role from '@/views/Manager/Role'
import User from '@/views/Manager/Userpage'
import Usersetting from '@/views/usersetting'
import Map from '@/views/map/index'

export const mainRoutes: IMenuType[] = [
  
  {
    key: '/dashboard',
    label: '数据统计',  
    title: '数据统计',
    icon: <AreaChartOutlined />,
    element: <Dashboard />
  },
  {
    key: '/Course',
    label: '课程管理',
    title: '课程管理',
    icon: <UnorderedListOutlined />,
    children: [
      {
        key: '/Course/Category',
        label: '课程分类',
        title: '课程分类',
        element: <Category />
      },
      {
        key: '/Course/Article',
        label: '课程列表',
        title: '课程列表',
        element: <ArticleList />
      },{
        key: '/Course/ArtPub',
        label: '课程发布',
        title: '课程发布',
        element: <ArticlePub />,
        // hiddent:true
      },{
        key: '/Course/ArtEdit',
        label: '课程编辑',
        title: '课程编辑',
        element: <ArticleEdit />,
        // hiddent:true
      }
    ]
  },
  {
    key: '/system',
    label: '系统设置',
    title: '系统设置',
    icon: <SettingOutlined />,
    children: [
      {
        key: '/system/Role',
        label: '角色管理',
        title: '角色管理',
        element: <Role />
      },
      {
        key: '/system/User',
        label: '账号管理',
        title: '账号管理',
        element: <User />
      }
    ]
  },{
        key: '/usersetting',
        label: '个人设置',
        title: '个人设置',
        element: <Usersetting />,
        icon: <UserOutlined />
      },{
        key: '/map',
        label: '高德地图',
        title: '高德地图',
        element: <Map />,
        icon: <UserOutlined />
      }
];
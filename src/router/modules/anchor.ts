import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { TableOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/anchor',
    name: 'anchor',
    component: Layout,
    meta: {
      title: '主播管理',
      isRoot: true,
      icon: renderIcon(TableOutlined),
      sort: 0,
    },
    children: [
      {
        path: 'index',
        name: 'anchor_index',
        meta: {
          title: '主播列表',
        },
        component: () => import('@/views/anchor/index.vue'),
      },
      {
        path: 'log',
        name: 'anchor_log',
        meta: {
          title: '开播记录',
        },
        component: () => import('@/views/anchor/log.vue'),
      },
      {
        path: 'info',
        name: 'anchor_info',
        meta: {
          title: '主播详情',
          hidden:true
        },
        component: () => import('@/views/anchor/info.vue'),
      }
    ],
  },
];

export default routes;

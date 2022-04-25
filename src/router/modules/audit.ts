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
    path: '/audit',
    name: 'audit',
    component: Layout,
    meta: {
      title: '审核管理',
      icon: renderIcon(TableOutlined),
      sort: 0,
    },
    children: [
     
      {
        path: 'withdraw',
        name: 'audit_withdraw',
        meta: {
          title: '提现审核',
        },
        component: () => import('@/views/audit/withdraw.vue'),
      },
      {
        path: 'anchor',
        name: 'audit_anchor',
        meta: {
          title: '主播审核',
        },
        component: () => import('@/views/audit/anchor.vue'),
      },
      {
        path: 'association',
        name: 'audit_association',
        meta: {
          title: '公会审核',
        },
        component: () => import('@/views/audit/association.vue'),
      },
      {
        path: 'secretContent',
        name: 'audit_secretContent',
        meta: {
          title: '私密内容审核',
        },
        component: () => import('@/views/audit/secretContent.vue'),
      },
    ],
  },
];

export default routes;

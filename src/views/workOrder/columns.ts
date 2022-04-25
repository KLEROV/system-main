import { h } from 'vue';
import { NAvatar } from 'naive-ui';

export const columns = [
  {
    title: '工单ID',
    key: 'id',
    width: 100,
  },
  {
    title: '工单类型',
    key: 'name',
    width: 100,
  },
  {
    title: '用户账号',
    key: 'name',
    width: 100,
  },
  {
    title: '联系方式',
    key: 'name',
    width: 100,
  },
  {
    title: '截图',
    key: 'avatar',
    width: 100,
    render(row) {
      return h(NAvatar, {
        size: 48,
        src: row.avatar,
      });
    },
  },
  {
    title: '用户备注',
    key: 'name',
    width: 100,
  },
  {
    title: '状态',
    key: 'status',
    className:'status',
    width: 100,
    render(rowData){
      switch (rowData.status) {
        case 0:
          return  h('li', {},'待处理');
        case 1:
          return  h('li', {},'处理中');
        case 2:
          return  h('li', {},'已结单');

        default:
          return rowData.status;
      }
      
    }
  },
];

import { h } from 'vue';
import { NAvatar } from 'naive-ui';

export const columns = [
  {
    title: '用户ID',
    key: 'id',
    width: 100,
  },
  {
    title: '申请时间',
    key: 'name',
    width: 100,
  },
  {
    title: '用户账号',
    key: 'name',
    width: 100,
  },
  {
    title: '用户昵称',
    key: 'name',
    width: 100,
  },
  {
    title: '身份',
    key: 'name',
    width: 100,
  },
  {
    title: '提现钻石数量',
    key: 'name',
    width: 100,
  },
  {
    title: '提现比例',
    key: 'name',
    width: 100,
  },
  {
    title: '提现金额（$）',
    key: 'name',
    width: 100,
  },
  {
    title: '提现平台',
    key: 'name',
    width: 100,
  },
  {
    title: '收款账号及姓名',
    key: 'name',
    width: 100,
  },
  {
    title: '审核状态',
    key: 'status',
    className:'status',
    width: 100,
    render(rowData){
      switch (rowData.status) {
        case 0:
          return  h('li', {},'审核驳回');
        case 1:
          return  h('li', {},'待审核');
        case 2:
          return  h('li', {},'审核通过');

        default:
          return rowData.status;
      }
      
    }
  },
  {
    title: '所属公会',
    key: 'name',
    width: 100,
  },
  {
    title: '驳回理由',
    key: 'name',
    width: 100,
  },
  {
    title: '操作人',
    key: 'name',
    width: 100,
  },
];

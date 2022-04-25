import { h } from 'vue';
import { NAvatar } from 'naive-ui';

export const columns = [
  {
    title: '主播ID',
    key: 'id',
    width: 100,
  },
  {
    title: '主播账号',
    key: 'name',
    width: 100,
  },
  {
    title: '主播昵称',
    key: 'name',
    width: 100,
  },
  {
    title: '主播类型',
    key: 'name',
    width: 100,
  },
  {
    title: '注册时间',
    key: 'name',
    width: 100,
  },
  {
    title: '入驻时间',
    key: 'name',
    width: 100,
  },
  {
    title: '累计金币流水',
    key: 'name',
    width: 100,
  },
  {
    title: '累计收益',
    key: 'name',
    width: 100,
  },
  {
    title: '累计提现',
    key: 'name',
    width: 100,
  },
  {
    title: '累计直播时长',
    key: 'name',
    width: 100,
  },
  {
    title: '累计开播场次',
    key: 'name',
    width: 100,
  },
  {
    title: '所属工会',
    key: 'name',
    width: 100,
  },
  {
    title: '主播状态',
    key: 'status',
    className:'status',
    width: 100,
    render(rowData){
      switch (rowData.status) {
        case 0:
          return  h('li', {},'封禁');
        case 1:
          return  h('li', {},'正常');

        default:
          return rowData.status;
      }
      
    }
  },
];

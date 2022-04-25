<template>
  <n-card :bordered="false" class="proCard">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm>

    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
>
    </BasicTable>

    <n-modal
      style="width: 700px"
      v-model:show="showModal"
      :show-icon="false"
      preset="dialog"
      :title="modelTitle"
    >
      <n-descriptions label-placement="left" :column="2">
        <template #header>
          <div style="font-size: 15px; font-weight: bold"> 工单信息 </div>
        </template>
        <n-descriptions-item label="工单ID"> 苹果 </n-descriptions-item>
        <n-descriptions-item label="用户账号"> 苹果 </n-descriptions-item>
        <n-descriptions-item label="工单类型"> 苹果 </n-descriptions-item>
        <n-descriptions-item label="用户昵称"> 苹果 </n-descriptions-item>
        <n-descriptions-item label="用户ID "> 苹果 </n-descriptions-item>
        <n-descriptions-item label="联系方式 "> 苹果 </n-descriptions-item>
        <n-descriptions-item label="截图 ">
          <n-image width="300" src="https://www.google.com/logos/doodles/2022/winter-games-2022-begin-mar-4-6753651837109365-2xa.gif" />
        </n-descriptions-item>
        <n-descriptions-item label="用户备注 "> 苹果 </n-descriptions-item>
      </n-descriptions>

      <h6 class="mt-4">消息反馈:</h6>
      <div v-if="modelStatus == 0">
        <n-radio-group class="my-2" v-model:value="msgType">
          <div>
            <n-radio value="1"> 模板消息 </n-radio>
            <n-radio value="2"> 自定义消息 </n-radio>
          </div>
        </n-radio-group>

        <n-select
          v-if="msgType == '1'"
          placeholder="请选择反馈内容"
          clearable
          v-model:value="value"
          :options="options"
        />
        <n-input
          v-else
          type="textarea"
          placeholder="请输入内容"
          :autosize="{
            minRows: 3,
          }"
        />
      </div>

      <div v-else> 自定义内容 </div>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { BasicTable, TableAction } from '@/components/Table';
import { BasicForm, useForm } from '@/components/Form/index';
import { getTableList } from '@/api/table/list';
import { columns } from './columns';

const schemas = [
  {
    field: 'id',
    component: 'NInput',
    label: '工单ID',
    componentProps: {
      placeholder: '请输入工单ID',
      onInput: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'makeDate',
    component: 'NDatePicker',
    label: '提交日期',
    defaultValue: [1183135260000, 1646894577949],
    componentProps: {
      type: 'daterange',
      clearable: true,
      separator: '至',
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'type',
    component: 'NSelect',
    label: '工单类型',
    componentProps: {
      placeholder: '请选择工单类型',
      options: [
        {
          label: '舒适性',
          value: 1,
        },
        {
          label: '经济性',
          value: 2,
        },
      ],
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'status',
    component: 'NSelect',
    label: '工单状态',
    componentProps: {
      placeholder: '请选择工单状态',
      options: [
        {
          label: '舒适性',
          value: 1,
        },
        {
          label: '经济性',
          value: 2,
        },
      ],
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
];

const message = useMessage();
const actionRef = ref();

const formParams = reactive({
  name: '',
  address: '',
  date: null,
});

const params = ref({
  pageSize: 5,
  name: 'xiaoMa',
});

const actionColumn = reactive({
  width: 220,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record) {
    return h(TableAction as any, {
      style: 'text',
      actions: [
        {
          label: '详情',
          icon: 'ic:outline-delete-outline',
          onClick: handleInfo.bind(null, record),
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            return true;
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          auth: ['basic_list'],
        },
        {
          label: '处理',
          onClick: handleManage.bind(null, record),
          ifShow: () => {
            if (record.status === 2) {
              return false;
            }
            return true;
          },
          auth: ['basic_list'],
        },
      ],
      select: (key) => {
        console.log(key);
        message.info(`您点击了，${key} 按钮`);
      },
    });
  },
});

const [register, {}] = useForm({
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 80,
  schemas,
});

const loadDataTable = async (res) => {
  return await getTableList({ ...formParams, ...params.value, ...res });
};

function onCheckedRow(rowKeys) {
  console.log(rowKeys);
}

function reloadTable() {
  actionRef.value.reload();
}

const showModal = ref(false);
const modelTitle = ref('')
const modelStatus = ref(1);

const msgType = ref('1');
const value = ref(null);

const options = ref([
  {
    label: "Everybody's Got Something to Hide Except Me and My Monkey",
    value: 'song0',
  },
  {
    label: 'Drive My Car',
    value: 'song1',
  },
  {
    label: 'Norwegian Wood',
    value: 'song2',
  },
  {
    label: "You Won't See",
    value: 'song3',
  },
  {
    label: 'Nowhere Man',
    value: 'song4',
  },
  {
    label: 'Think For Yourself',
    value: 'song5',
  },
  {
    label: 'The Word',
    value: 'song6',
  },
  {
    label: 'Michelle',
    value: 'song7',
    disabled: true,
  },
  {
    label: 'What goes on',
    value: 'song8',
  },
  {
    label: 'Girl',
    value: 'song9',
  },
  {
    label: "I'm looking through you",
    value: 'song10',
  },
  {
    label: 'In My Life',
    value: 'song11',
  },
  {
    label: 'Wait',
    value: 'song12',
  },
]);

function handleManage(record: Recordable) {
  modelTitle.value = '工单处理'
  modelStatus.value = 0
  showModal.value = true;
  console.log('点击了编辑', record);
}

function handleInfo(record: Recordable) {
  modelTitle.value = '工单详情'
  modelStatus.value = 1
  showModal.value = true;
  console.log(record);
}

function handleSubmit(values: Recordable) {
  console.log(values);
  reloadTable();
}

function handleReset(values: Recordable) {
  console.log(values);
}
</script>

<style lang="less" scoped>
.n-descriptions {
  background: #f7f7f7;
  padding: 10px;
}
</style>

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
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
>
    </BasicTable>

  </n-card>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { BasicTable, TableAction } from '@/components/Table';
import { BasicForm, useForm } from '@/components/Form/index';
import { getTableList } from '@/api/table/list';
import { columns } from './columns';



const message = useMessage();
const actionRef = ref();

const schemas = [
  {
    field: 'id',
    component: 'NInput',
    label: '主播ID/昵称/账号 ',
    componentProps: {
      placeholder: '请输入内容',
      onInput: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'makeDate',
    component: 'NDatePicker',
    label: '开播日期',
    componentProps: {
      type: 'daterange',
      clearable: true,
      separator: '至',
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
];

/**  --start 搜索组件  **/
const [register, {}] = useForm({
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 120,
  schemas,
});

const formParams = ref({
  id:'',
  makeDate:[]
})

const params = ref({
  pageSize: 5,
  name: 'xiaoMa',
});

function handleSubmit(values: Recordable) {
  console.log(values);
  reloadTable();
}

function handleReset(values: Recordable) {
  console.log(values);
}

/** 搜索组件 --end  **/


/**  --start 列表  **/
const loadDataTable = async (res) => {
  return await getTableList({ ...formParams, ...params.value, ...res });
};

function onCheckedRow(rowKeys) {
  console.log(rowKeys);
}

function reloadTable() {
  actionRef.value.reload();
}
/** 列表 --end  **/


</script>

<style lang="less" scoped>
.n-descriptions {
  background: #f7f7f7;
  padding: 10px;
}
</style>

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
      <template #tableTitle>
        <n-button type="primary" @click="batchAuditShow"> 批量审核 </n-button>
      </template>
    </BasicTable>

    <n-modal
      style="width: 700px"
      v-model:show="auditModelShow"
      :show-icon="false"
      preset="dialog"
      :title="title"
    >
      <div class="anchor-info">
        <!-- 单独审核 -->
        <n-descriptions v-if="modelType == 0" title="提现信息" label-placement="left" :column="2">
            <n-descriptions-item label="主播ID">11</n-descriptions-item>
            <n-descriptions-item label="主播账号">1234@gmail.com</n-descriptions-item>
            <n-descriptions-item label="主播昵称">1234@gmail.com</n-descriptions-item>
            <n-descriptions-item label="注册时间">1234@gmail.com</n-descriptions-item>
            <n-descriptions-item label="VIP状态">1234@gmail.com</n-descriptions-item>
            <n-descriptions-item label="所属工会">1234@gmail.com</n-descriptions-item>
            <n-descriptions-item label="入驻时间">1234@gmail.com</n-descriptions-item>
            <n-descriptions-item label="最近登录时间">1234@gmail.com</n-descriptions-item>
            <n-descriptions-item label="总体分成比例（主播+公会）"
              >1234@gmail.com</n-descriptions-item
            >
            <n-descriptions-item label="公会分成比例">1234@gmail.com</n-descriptions-item>
            <n-descriptions-item label="主播实际分成比例">1234@gmail.com</n-descriptions-item>
            <n-descriptions-item label="主播标签">1234@gmail.com</n-descriptions-item>
            <n-descriptions-item label="主播类型">1234@gmail.com</n-descriptions-item>
            <n-descriptions-item label="WhatsApp">1234@gmail.com</n-descriptions-item>
          </n-descriptions>

        <!-- 批量审核 -->
        <div v-if="modelType == 1">
          <n-alert class="mb-4" title="请确认每一笔申请的提现信息是否正确后再操作" type="warning">
          </n-alert>
          <n-collapse style="max-height: 300px; overflow-y: scroll" arrow-placement="right">
            <n-collapse-item style="margin-right: 10px" name="1">
              <template #header>
                <div> 提现信息<span>共256个</span> </div>
              </template>
              <n-descriptions v-for="(item, i) in 5" :key="i" label-placement="left" :column="2">
                <n-descriptions-item label="主播ID">11</n-descriptions-item>
                <n-descriptions-item label="主播账号">1234@gmail.com</n-descriptions-item>
                <n-descriptions-item label="主播昵称">1234@gmail.com</n-descriptions-item>
                <n-descriptions-item label="注册时间">1234@gmail.com</n-descriptions-item>
                <n-descriptions-item label="VIP状态">1234@gmail.com</n-descriptions-item>
                <n-descriptions-item label="所属工会">1234@gmail.com</n-descriptions-item>
                <n-descriptions-item label="入驻时间">1234@gmail.com</n-descriptions-item>
                <n-descriptions-item label="最近登录时间">1234@gmail.com</n-descriptions-item>
                <n-descriptions-item label="总体分成比例（主播+公会）"
                  >1234@gmail.com</n-descriptions-item
                >
                <n-descriptions-item label="公会分成比例">1234@gmail.com</n-descriptions-item>
                <n-descriptions-item label="主播实际分成比例">1234@gmail.com</n-descriptions-item>
                <n-descriptions-item label="主播标签">1234@gmail.com</n-descriptions-item>
                <n-descriptions-item label="主播类型">1234@gmail.com</n-descriptions-item>
                <n-descriptions-item label="WhatsApp">1234@gmail.com</n-descriptions-item>
              </n-descriptions>
            </n-collapse-item>
          </n-collapse>
        </div>
      </div>
      <n-divider />
      <n-form
        :model="formParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="审核结果" path="id">
          <n-radio-group v-model:value="formParams.type" name="radiogroup">
            <n-space>
              <n-radio v-for="item in anchorTypes" :key="item.value" :value="item.value">
                {{ item.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="驳回理由" path="text" v-if="formParams.type == 1">
          <n-input type="textarea" placeholder="请输入驳回理由" v-model:value="formParams.text" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="() => (auditModelShow = false)">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { BasicTable, TableAction } from '@/components/Table';
import { BasicForm, useForm } from '@/components/Form/index';
import { getTableList } from '@/api/table/list';
import { columns } from './withdraw';

const message = useMessage();
/**  --start 搜索组件  **/
const schemas = [
  {
    field: 'id',
    component: 'NInput',
    label: '用户ID/昵称/账号 ',
    componentProps: {
      placeholder: '请输入内容',
      onInput: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'type',
    component: 'NSelect',
    label: '审核状态',
    componentProps: {
      placeholder: '请选择',
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
    field: 'makeDate',
    component: 'NDatePicker',
    label: '申请时间',
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

const [register, {}] = useForm({
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 120,
  schemas,
});

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
const actionRef = ref();

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
          label: '审核',
          onClick: handleAudit.bind(null, record),
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            console.log(record);
            if (record.status == 1) {
              return true;
            }
            return false;
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          auth: ['basic_list'],
        },
      ],
    });
  },
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

function handleAudit(record) {
  title.value = '审核';
  modelType.value = 0
  auditModelShow.value = true;
  console.log(record);
}
/** 列表 --end  **/

const auditModelShow = ref(false);
const title = ref('');
const modelType = ref(1)

const anchorTypes = ref([
  {
    value: '0',
    label: '审核通过',
  },
  {
    value: '1',
    label: '审核驳回',
  },
]);

const formParams = ref({
  type: '',
  text: '',
});

function batchAuditShow() {
  title.value = '批量审核';
  modelType.value = 1
  auditModelShow.value = true;
}

function confirmForm() {
  auditModelShow.value = false;
}
</script>

<style lang="less" scoped>
.n-descriptions {
  background: #f7f7f7;
  padding: 10px;
  margin-bottom: 16px;
}
.anchor-info {
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  margin-top: 1rem;
}
::v-deep(.n-collapse-item__header) {
  background: rgb(247, 247, 247);
  padding: 10px !important;
}
</style>

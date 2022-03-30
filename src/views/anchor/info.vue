<template>
  <div>
    <!-- 基础信息 -->
    <n-card class="proCard mt-4" size="small" title="基础信息" :segmented="{ content: 'hard' }">
      <n-descriptions label-placement="left" class="py-2">
        <n-descriptions-item label="主播ID">{{ route.params.id }}</n-descriptions-item>
        <n-descriptions-item label="主播账号">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="主播昵称">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="注册时间">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="VIP状态">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="所属工会">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="入驻时间">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="最近登录时间">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="总体分成比例（主播+公会）">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="公会分成比例">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="主播实际分成比例">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="主播标签">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="主播类型">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="WhatsApp">1234@gmail.com</n-descriptions-item>
      </n-descriptions>
    </n-card>
    <!-- 直播信息 -->
    <n-card class="proCard mt-4" size="small" :segmented="{ content: 'hard' }">
      <template #header>
        <div> 
          <span class="mr-4">直播信息</span> 
          <n-button class="mr-4" size="small" secondary  type="info"> 开播记录 </n-button>
        <n-button class="mr-4" size="small" secondary  type="info"> 钻石提现账单 </n-button>
        <n-button class="mr-4" size="small" secondary  type="info"> 金币流通账单 </n-button>
        <n-button class="mr-4" size="small" secondary  type="info"> 动态记录 </n-button>
        </div>
        
      </template>
      <n-descriptions label-placement="left" class="py-2">
        <n-descriptions-item label="累计开播场次">{{ route.params.id }}</n-descriptions-item>
        <n-descriptions-item label="累计金币流水">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="累计收益（钻石）">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="累计提现（$）">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="累计直播时长（min）">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="动态数">1234@gmail.com</n-descriptions-item>
      </n-descriptions>
    </n-card>
    <!-- 提现信息 -->
    <n-card class="proCard mt-4" size="small" :segmented="{ content: 'hard' }">
      <template #header>
        <div style="background: #f3f3f3">
         <span class="mr-4">提现信息</span> 
          <n-button size="small" secondary  type="info"> 修改提现信息 </n-button>
        </div>
      </template>
      <n-descriptions label-placement="left" class="py-2">
        <n-descriptions-item label="提现平台">{{ route.params.id }}</n-descriptions-item>
        <n-descriptions-item label="账号名称">1234@gmail.com</n-descriptions-item>
        <n-descriptions-item label="账号姓名">1234@gmail.com</n-descriptions-item>
      </n-descriptions>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params);
</script>

<style lang="less" scoped>
::v-deep(.n-card-header) {
  background: #f3f3f3;
}
</style>
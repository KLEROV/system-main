<template>
  <NConfigProvider
    v-if="!isLock"
    :locale="zhCN"
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverrides"
    :date-locale="dateZhCN"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>

  <transition v-if="isLock && $route.name !== 'login'" name="slide-up">
    <LockScreen />
  </transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { zhCN, dateZhCN, darkTheme } from 'naive-ui';
import { LockScreen } from '@/components/Lockscreen';
import { AppProvider } from '@/components/Application';
import { useLockscreenStore } from '@/store/modules/lockscreen';
import { useRoute } from 'vue-router';
import { useDesignSettingStore } from '@/store/modules/designSetting';
import { lighten } from '@/utils/index';
import { string } from 'vue-types';
import { Construct } from '@vicons/ionicons5';

const route = useRoute();
const useLockscreen = useLockscreenStore();
const designStore = useDesignSettingStore();
const isLock = computed(() => useLockscreen.isLock);
const lockTime = computed(() => useLockscreen.lockTime);

/**
 * @type import('naive-ui').GlobalThemeOverrides
 */
const getThemeOverrides = computed(() => {
  const appTheme = designStore.appTheme;
  const lightenStr = lighten(designStore.appTheme, 6);
  return {
    common: {
      primaryColor: appTheme,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
    },
    LoadingBar: {
      colorLoading: appTheme,
    },
  };
});

const getDarkTheme = computed(() => (designStore.darkTheme ? darkTheme : undefined));

let timer;

const timekeeping = () => {
  clearInterval(timer);
  if (route.name == 'login' || isLock.value) return;
  // 设置不锁屏
  useLockscreen.setLock(false);
  // 重置锁屏时间
  useLockscreen.setLockTime();
  timer = setInterval(() => {
    // 锁屏倒计时递减
    useLockscreen.setLockTime(lockTime.value - 1);
    if (lockTime.value <= 0) {
      // 设置锁屏
      useLockscreen.setLock(true);
      return clearInterval(timer);
    }
  }, 1000);
};

onMounted(() => {
  document.addEventListener('mousedown', timekeeping);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', timekeeping);
});


class control {
  obj:string;
  private obj1:string;
  constructor(public a:string,b:number,c:any){
    this.obj=a+b+c;
    this.obj1=this.obj+a+b+c;
    console.log('这是:'+a,'这是:'+b,'这是:'+c);
  }
}
let d=new control('1',2,3);
console.log(d.a,d.obj,d.obj1);
interface name {
  left:string;
  top:string;
  right:string;
  bottom:string;

}
interface a0{
  (k:string,j:number):boolean
}
let a1:a0=(k,j)=>{
  console.log(k,j);
  return k>j
}
console.log(a1(3,7));
function set(name:name){
  console.log(name.top,name.left,name.bottom,name.right);
}
let name={
  left:'string0',
  top:'string1',
  right:'string2',
  bottom:'string3'
}
set(name);
// class Button extends control implements selectCtrol{
//   select(){
//     console.log('selectCtrol');
//   }
// }
// class textBox extends control{
//   private state:any;
//   obj:string;
//   constructor(obj){
//     console.log(tobj);
//   }
// }
// function createCtrol(da:selectCtrol,obj:string):textBox{
//   return 
// }





// class control{
//   private state:number;
// }

// interface Counter extends control{
//   (start:number):string,
//   interval:number;
//   reset():any
// }
// interface copyCounter extends Counter{
  
// }
// class copyCounterTwo implements Counter{
//   reset(){
//     console.log('class copyCounterTwo');
//   }
// }
// function getCounter():copyCounter{
//   let counter =<copyCounter>function(start:number){
//     console.log(start);
//   }
//   counter.interval=12345;
//   counter.state=400;
//   counter.reset=()=>{
//     console.log('reset');
//   }
//   return counter
// }
// let c=getCounter();
// c(10);
// console.log(c.interval,c.state);
// c.reset();















</script>

<style lang="less">
@import 'styles/index.less';
</style>

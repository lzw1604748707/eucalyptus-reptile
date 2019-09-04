//引入
import euInfiniteScroll from '@/components/eu-infiniteScroll.vue'

const plugins = {
  //注册
  install(Vue: any) {
    Vue.component('euInfiniteScroll', euInfiniteScroll) //第一个参数:组件名称,第二个参数:要注册的组件
  }
}
export default plugins

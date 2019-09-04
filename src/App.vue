<template>
  <router-view></router-view>
</template>

<script lang="ts">
import Vue from 'vue'
import euInfiniteScroll from '@/components/eu-infiniteScroll.vue'
// Vue.component(euInfiniteScroll)
export default Vue.extend({
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    euInfiniteScroll
  },
  data: () => ({
    //
  })
})
</script>

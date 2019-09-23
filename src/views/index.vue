<template>
  <v-app id="inspire">
    <sidePar :drawer="drawer"
      :menus="items"></sidePar>
    <topPar :drawer.sync="drawer"></topPar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import topPar from '@/components/topPar.vue'
import sidePar from '@/components/sidePar.vue'
@Component({
  components: {topPar, sidePar}
})
export default class Index extends Vue {
  private drawer: boolean = true
  private items: Array<Object> = [
    {
      id: '1',
      icon: 'contacts',
      text: 'Source Board',
      routerName: 'sourceBoard'
    },
    {
      id: '2',
      icon: 'mdi-alpha-z-box-outline',
      text: 'ZOL桌面壁纸',
      routerName: 'zolWallpaper'
    },
    {id: '3', icon: 'settings', text: 'Settings', routerName: 'settings'},
    {
      id: '4',
      icon: 'chat_bubble',
      text: 'Send feedback',
      routerName: 'sourceBoard'
    },
    {id: '5', icon: 'help', text: 'Help', routerName: 'sourceBoard'}
  ]
}
</script>

<style lang="scss" scoped></style>

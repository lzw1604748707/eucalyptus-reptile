<template>
  <v-navigation-drawer :value="drawer" clipped app>
    <v-list-item-group v-model="currentView" color="primary">
      <v-list-item
        v-for="(item, index) of menus"
        :key="index"
        @click="onPushViewClick(item.routerName)"
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component({})
export default class extends Vue {
  private currentView: number = 0
  @Prop() menus!: any[]
  @Prop({required: true}) drawer!: boolean
  onPushViewClick(routerName: string) {
    if (this.$route.name !== routerName) this.$router.push({name: routerName})
  }
  selectCurrentViewNav() {
    this.currentView = this.menus.findIndex(
      nav => nav.routerName === this.$route.name
    )
  }
  mounted() {
    this.selectCurrentViewNav()
  }
}
</script>

<style lang="scss" scoped></style>

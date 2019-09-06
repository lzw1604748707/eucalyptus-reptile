<template>
  <v-card elevation="1" class="ma-3">
    <v-row align="center" class="flex-nowrap">
      <v-col class="filter__tabs">
        <v-tabs center-active @change="onCurrentTabChange" :value="tabValue">
          <v-tab v-for="(item, index) of tabList" :key="index">
            {{ item.text }}</v-tab
          >
        </v-tabs>
      </v-col>
      <div class="filter__active">
        <v-btn dark color="teal" x-small fab @click="onShowExpansionPanelClick">
          <v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-btn>
        <v-btn
          dark
          class="mx-3"
          x-small
          color="cyan"
          fab
          @click.stop="onShowLayoutClick"
        >
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>
      </div>
    </v-row>
    <v-expand-transition>
      <v-sheet
        style="display:flex;"
        class="flex-wrap flex-lg-nowrap  px-3"
        v-show="isExpand"
      >
        <slot></slot>
      </v-sheet>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {VExpansionPanel as VEPanel} from 'vuetify/lib'

@Component
export default class extends Vue {
  @Prop({default: () => []}) tabList!: Array<any>
  @Prop({default: 0}) tabValue!: number

  private isExpand: boolean = false

  onCurrentTabChange(currentTab: any) {
    this.$emit('tab-change', currentTab)
  }
  onShowExpansionPanelClick() {
    this.isExpand = !this.isExpand
  }
  onsShowLayoutClick() {
    console.log('显示布局风格')
  }
}
</script>
<style lang="scss" scoped>
.filter__tabs {
  width: calc(100% - 100px);
  .v-tab {
    margin-left: 10px !important;
  }
  // .tab__slider--first {
  //   left: 10;
  // }
}
.filter__active {
  width: 100px;
}
</style>

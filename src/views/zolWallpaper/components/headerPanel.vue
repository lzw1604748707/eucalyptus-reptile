<template>
  <filterTabbar
    :tabList="tabList"
    :tabValue="tabValue"
    @tab-change="onTabChange"
  >
    <v-text-field
      height="35"
      label="搜索"
      class="filter__search no-sm-flex no-verify mr-sm-3"
      solo
    ></v-text-field>
    <v-autocomplete
      class="no-verify"
      height="35"
      label="壁纸分类"
      :items="components"
      clearable
      solo
    ></v-autocomplete>
    <v-autocomplete
      class="mx-sm-3 no-verify"
      height="35"
      label="壁纸尺寸"
      :items="components"
      clearable
      solo
    ></v-autocomplete>
    <v-autocomplete
      class="no-verify"
      height="35"
      label="壁纸色系"
      :items="colorList"
      clearable
      solo
      v-model="currentColorSystem"
    >
      <template slot="prepend-inner">
        <v-icon :color="currentColorSystem">mdi-palette</v-icon>
      </template>
    </v-autocomplete>
  </filterTabbar>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import filterTabbar from '@/components/filterTabbar.vue'
@Component({
  components: {
    filterTabbar
  }
})
export default class extends Vue {
  @Prop({}) tabValue!: number
  private tabList: any[] = []
  private components: any[] = [
    'Autocompletes',
    'Comboboxes',
    'Forms',
    'Inputs',
    'Overflow Buttons',
    'Selects',
    'Selection Controls',
    'Sliders',
    'Textareas',
    'Text Fields'
  ]
  private colorList: any[] = [
    {
      text: '红色',
      value: 'red'
    },
    {text: '蓝色', value: 'blue'}
  ]
  private currentColorSystem: string = ''
  onTabChange(currentTabIndex: number) {
    this.$emit('tabChange', this.tabList[currentTabIndex].value)
  }
  reFindTabList() {
    this.$callApi({
      api: 'zol/tabList',
      method: 'get'
    }).then((tabList: any[]) => {
      this.tabList = tabList
    })
  }
  mounted() {
    this.reFindTabList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/vuetify.scss';
@media (min-width: 600px) {
  .no-sm-flex {
    flex: none;
  }
}
.filter__search {
  min-width: 250px;
  max-width: 100%;
}
</style>

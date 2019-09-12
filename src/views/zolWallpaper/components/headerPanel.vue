<template>
  <filterTabbar :tabList="tabList" @tab-change="onTabChange">
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
      :items="styleTypeList"
      clearable
      solo
      @change="onStyleTypeChange"
    ></v-autocomplete>
    <v-autocomplete
      class="mx-sm-3 no-verify"
      height="35"
      label="壁纸尺寸"
      :items="pixelRatioList"
      clearable
      solo
      @change="onPixelRatioChange"
    ></v-autocomplete>
    <v-autocomplete
      class="no-verify"
      height="35"
      label="壁纸色系"
      :items="colorTypeList"
      clearable
      solo
      @change="onColorTypeChange"
    >
      <template v-slot:item="data">
        <v-list-item-icon>
          <v-icon :color="data.item.color">fiber_manual_record</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ data.item.text }}</v-list-item-title>
        </v-list-item-content>
      </template>
      <template slot="prepend-inner">
        <v-icon :color="currentColorSystem">mdi-palette</v-icon>
      </template>
    </v-autocomplete>
  </filterTabbar>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import filterTabbar from '@/components/filterTabbar.vue'
@Component({
  components: {
    filterTabbar
  }
})
export default class extends Vue {
  @Prop({}) tabValue!: string
  private tabList: any[] = []
  private styleTypeList: any[] = []
  private pixelRatioList: any[] = []
  private colorTypeList: any[] = []

  private currentColorSystem: string = ''

  onTabChange(currentTabIndex: number) {
    this.$emit('tabChange', this.tabList[currentTabIndex].value)
  }
  onStyleTypeChange(currentStyleType: string) {
    this.$emit('styleChange', currentStyleType)
  }
  onColorTypeChange(currentcolor: string) {
    let currentColorItem = this.colorTypeList.find(
      color => color.value === currentcolor
    )
    this.currentColorSystem =
      (currentColorItem && currentColorItem.color) || 'grey'
    this.$emit('colorChange', currentcolor)
  }
  onPixelRatioChange(currentPixelRatio: string) {
    this.$emit('pixelRatioChange', currentPixelRatio)
  }
  reFindStyleTypeList() {
    this.$callApi({
      api: 'zol/styleTypeList',
      param: {
        model: this.tabValue
      }
    }).then((styleTypeList: any[]) => {
      this.styleTypeList = styleTypeList
      this.styleTypeList.unshift({text: '全部', value: ''})
    })
  }
  reFindColorTypeList() {
    this.$callApi({
      api: 'zol/colorTypeList',
      param: {
        model: this.tabValue
      }
    }).then((colorTypeList: any[]) => {
      this.colorTypeList = colorTypeList
      this.colorTypeList.unshift({
        text: '全部',
        value: '',
        color: 'grey'
      })
    })
  }
  reFindPixelRedioList() {
    this.$callApi({
      api: 'zol/pixelRatioList',
      param: {
        model: this.tabValue
      }
    }).then((pixelRatioList: any[]) => {
      this.pixelRatioList = pixelRatioList
      this.pixelRatioList.unshift({text: '全部', value: ''})
    })
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

  @Watch('tabValue', {immediate: true})
  watchTabValue(val: string) {
    console.log('触发改变')
    this.reFindStyleTypeList()
    this.reFindPixelRedioList()
    this.reFindColorTypeList()
  }
}
</script>

<style lang="scss" scoped>
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

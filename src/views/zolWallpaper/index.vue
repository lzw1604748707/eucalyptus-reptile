<template>
  <euInfiniteScroll class="overflow-y-auto zol__container"
    :finished="isFinished"
    :isLoading="isLoading"
    @loading="onLoading">
    <headerPanel :tabValue="currentTabValue"
      @tabChange="onTabChange"
      @styleChange="onStyleChange"
      @colorChange="onColorChange"
      @pixelRatioChange="onPixelRatioChange">
    </headerPanel>
    <v-container class="grey lighten-5 pt-0">
      <v-row>
        <v-col xs="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(collection, index) of collectionList"
          :key="index">
          <collectionCard :item="collection"
            class="content__card">
            <div class="card__title--line"
              @click="onShowCollectionDetail(collection)">
              {{ collection.title || '' }}
            </div>
            <template slot="actions">
              <v-btn text
                color="orange"
                @click="onShowShareDialogClick(collection)">分享</v-btn>
              <v-spacer></v-spacer>
              <v-btn text
                color="orange"
                @click="onDownloadClick(collection)">下载
              </v-btn>
            </template>
          </collectionCard>
        </v-col>
      </v-row>
    </v-container>
    <collection-detail :isShowOverlay.sync="isShowCollectionDetail"
      :collectionId="currentExpandCollection.url"></collection-detail>
  </euInfiniteScroll>
</template>

<script lang="ts">
import collectionCard from '@/components/collectionCard.vue'
import headerPanel from './components/headerPanel.vue'
import collectionDetail from './components/collectionDetail.vue'
import {Component, Vue} from 'vue-property-decorator'
import {State, Getter, Action, Mutation, namespace} from 'vuex-class'
import Page from '@/helper/Page'

interface collectionListMap {
  collectionList: any[]
  total: number
}
interface collection {
  url: string
  [key: string]: any
}
@Component({
  components: {
    collectionCard,
    collectionDetail,
    headerPanel
  }
})
export default class Zol extends Vue {
  @State(state => state.base.token) token: any
  // tabbar相关
  private currentTabValue: string = 'p1'
  private currentStyleTypeValue: string = ''
  private currentColorTypeValue: string = ''
  private currentPixelRatioValue: string = ''

  // 列表相关
  private isFinished: boolean = false
  private isLoading: boolean = false
  private collectionList: Array<any> = []
  private page: Page = new Page(1, 21, 0)

  // 详情相关
  private currentExpandCollection: collection = {url: ''}

  private isShowCollectionDetail: boolean = false

  onTabChange(currentTabValue: string) {
    this.currentTabValue = currentTabValue
    this.initData()
  }
  onStyleChange(currentStyleTypeValue: string) {
    this.currentStyleTypeValue = currentStyleTypeValue
    this.initData()
  }
  onColorChange(currentColorTypeValue: string) {
    this.currentColorTypeValue = currentColorTypeValue
    this.initData()
  }
  onPixelRatioChange(currentPixelRatioValue: string) {
    this.currentPixelRatioValue = currentPixelRatioValue
    this.initData()
  }

  onShowCollectionDetail(collection: collection) {
    this.isShowCollectionDetail = true
    this.currentExpandCollection = collection
  }
  onShowShareDialogClick(collection: collection) {
    this.currentExpandCollection = collection
    console.log('分享')
  }
  onDownloadClick(collection: collection) {
    this.currentExpandCollection = collection
    console.log('下载')
  }
  onLoading() {
    this.isLoading = true
    this.page.nextPage()
    this.reFindZOLWallpagerList()
  }
  reFindZOLWallpagerList() {
    return this.$callApi({
      api: 'zol/collectionList',
      param: {
        styleType: this.currentStyleTypeValue,
        colorType: this.currentColorTypeValue,
        pixelRatio: this.currentPixelRatioValue,
        model: this.currentTabValue,
        pageIndex: this.page.pageIndex,
        pageSize: this.page.pageSize
      }
    }).then(({collectionList = [], total = 0}: collectionListMap) => {
      this.isLoading = false
      this.collectionList = [...this.collectionList, ...collectionList]
      this.page.pageTotal = total
      this.isFinished = this.page.isLastPage()
    })
  }
  initData() {
    this.page.goFirstPage()
    this.collectionList = []
    this.reFindZOLWallpagerList()
  }
  mounted() {
    console.log('token', this.token)
    this.initData()
  }
}
</script>
<style lang="scss" scoped>
.zol__container {
  width: inherit;
  height: calc(100vh - 64px);
}
.content__card {
  height: 100%;
}

.card__title--line {
  color: orange;
  text-decoration: underline orange;
  cursor: pointer;
}
</style>

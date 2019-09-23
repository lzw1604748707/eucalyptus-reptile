<template>
  <euInfiniteScroll
    class="overflow-y-auto zol__container"
    :finished="isFinished"
    :isLoading="isLoading"
    @loading="onLoading"
  >
    <headerPanel
      :tabValue="currentTabValue"
      @tabChange="onTabChange"
      @styleChange="onStyleChange"
      @colorChange="onColorChange"
      @pixelRatioChange="onPixelRatioChange"
    >
    </headerPanel>
    <v-container class="grey lighten-5 pt-0">
      <v-row>
        <v-col
          xs="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(collection, index) of collectionList"
          :key="index"
        >
          <collectionCard :item="collection" class="content__card">
            <div
              class="card__title--line"
              @click="onShowCollectionDetail(collection)"
            >
              {{ collection.title || '' }}
            </div>
            <template slot="actions">
              <v-btn
                text
                color="orange"
                @click="onShowShareDialogClick(collection)"
                >分享</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn text color="orange" @click="onDownloadClick(collection)"
                >下载
              </v-btn>
            </template>
          </collectionCard>
        </v-col>
      </v-row>
    </v-container>
    <collectionSlider
      :isShowOverlay.sync="isShowCollectionDetail"
      :list="currentCollectionList"
      :value.sync="currentIndexByAll"
    ></collectionSlider>
  </euInfiniteScroll>
</template>

<script lang="ts">
import collectionCard from '@/components/collectionCard.vue'
import headerPanel from './components/headerPanel.vue'
// import collectionSliderX from './components/collectionSliderX.vue'
import collectionSlider from './components/collectionSlider.vue'
import {Component, Vue, Watch} from 'vue-property-decorator'
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
    collectionSlider,
    // collectionSliderX,
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
  private currentMaxIndex: number = -1

  // 详情相关
  private currentExpandCollection: collection = {url: ''}
  private currentIndexByAll: number = -1
  private currentCollectionList: collection[] = []
  private beforeCollectionList: collection[] = []
  private afterCollectionList: collection[] = []
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
    this.currentIndexByAll = collection.indexByAll
    if (!this.collectionList.length || this.currentIndexByAll === -1) return []
    // this.getCollectionDetail()
    let beforeIndex = this.currentIndexByAll
    let afterIndex = this.currentIndexByAll
    this.currentCollectionList = [this.collectionList[this.currentIndexByAll]]
    while (beforeIndex > 0 && beforeIndex > this.currentIndexByAll - 4) {
      --beforeIndex

      this.currentCollectionList.unshift(this.collectionList[beforeIndex])
    }
    while (
      afterIndex < this.page.pageTotal &&
      afterIndex < this.page.getCurrentCount() - 1 &&
      afterIndex < this.currentIndexByAll + 5
    ) {
      ++afterIndex

      this.currentCollectionList.push(this.collectionList[afterIndex])
    }
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
  async onLoadingPageCollection(index: number) {
    this.isLoading = false
    this.page.nextPage()
    await this.reFindZOLWallpagerList()
    this.$set(
      this.currentCollectionList,
      this.currentCollectionList.length,
      this.collectionList[index]
    )
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
      collectionList.map(
        (collection, index) =>
          (collection.indexByAll = index + this.currentMaxIndex + 1)
      )
      this.isLoading = false
      this.collectionList = [...this.collectionList, ...collectionList]
      this.currentMaxIndex = this.collectionList.length - 1
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

  @Watch('currentIndexByAll')
  watchCurrentIndexByAll(newValue: number, oldValue: number) {
    let lastCollectionIndex = this.currentCollectionList.length - 1
    let isNext = false
    let isBefore = false

    isNext =
      newValue >
        this.currentCollectionList[lastCollectionIndex - 3].indexByAll &&
      newValue < this.currentCollectionList[lastCollectionIndex].indexByAll

    isBefore =
      newValue < this.currentCollectionList[3].indexByAll &&
      newValue > this.currentCollectionList[0].indexByAll
    if (isNext) {
      for (let i = 1; i < 3; i++) {
        let tempAddIndex =
          this.currentCollectionList[lastCollectionIndex].indexByAll + i
        if (tempAddIndex < this.collectionList.length) {
          this.$set(
            this.currentCollectionList,
            this.currentCollectionList.length,
            this.collectionList[tempAddIndex]
          )
        } else {
          this.onLoadingPageCollection(tempAddIndex)
        }
      }
    }
    if (isBefore) {
      console.log('向前加载')
      for (let i = 1; i < 5; i++) {
        let tempAddIndex = this.currentCollectionList[0].indexByAll - i
        if (tempAddIndex > -1) {
          console.log('有值哦', this.collectionList[tempAddIndex])

          this.currentCollectionList.unshift(this.collectionList[tempAddIndex])
        } else {
          break
        }
      }
    }
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

<template>
  <euInfiniteScroll class="overflow-y-auto zol__container"
    :finished="true"
    @loading="onLoading">
    <v-container class="grey lighten-5">

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
  </euInfiniteScroll>
</template>

<script lang="ts">
import collectionCard from '@/components/collectionCard.vue'
import {Component, Vue} from 'vue-property-decorator'
import {State, Getter, Action, Mutation, namespace} from 'vuex-class'

@Component({
  components: {
    collectionCard
  }
})
export default class Zol extends Vue {
  @State(state => state.base.token) token: any
  private collectionList: object = [
    {
      title: '抽象设计色彩宽屏桌面壁纸',
      author: 'spance',
      createDate: '1998-08-25',
      cover: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
    }
  ]
  private currentExpandCollection: object = {}
  private isShowCollectionDetail: boolean = false
  private page: object = {}

  onShowCollectionDetail(collection: object) {
    this.isShowCollectionDetail = true
    this.currentExpandCollection = collection
  }
  onShowShareDialogClick(collection: object) {
    this.currentExpandCollection = collection
    console.log('分享')
  }
  onDownloadClick(collection: object) {
    this.currentExpandCollection = collection
    console.log('下载')
  }
  onLoading() {
    console.log('滚动加载')
  }
  reFindZOLWallpagerList() {
    this.$callApi({
      api: 'Zol/CollectionList',
      param: {
        pageIndex: ''
      }
    }).then((data: any) => {
      this.collectionList = data
    })
  }

  mounted() {
    console.log('token', this.token)
    this.reFindZOLWallpagerList()
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

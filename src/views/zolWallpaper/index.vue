<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col xs="12" sm="6" md="4" lg="3" v-for="i of 16" :key="i">
        <collectionCard :item="collection">
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
</template>

<script lang="ts">
import collectionCard from '@/components/collectionCard.vue'
import {Component, Vue} from 'vue-property-decorator'

@Component({
  components: {
    collectionCard
  }
})
export default class extends Vue {
  private collection: object = {
    title: '抽象设计色彩宽屏桌面壁纸',
    author: 'spance',
    uploadDate: '1998-08-25',
    cover: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
  }
  private currentExpandCollection: object = {}
  private isShowCollectionDetail: boolean = false

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
  reFindZOLWallpager() {
    console.log('加载照片集列表')
  }
  mounted() {
    this.reFindZOLWallpager()
  }
}
</script>

<style lang="scss" scoped>
.card__title--line {
  color: orange;
  text-decoration: underline orange;
  cursor: pointer;
}
</style>

<template>
  <v-overlay v-model="isShowOverlay" color="white" opacity="1">
    <div class="detail d-flex flex-column align-center justify-center">
      <v-card
        tile
        class="transparent   px-sm-4 px-xs-0 detail__image-card"
        raised
      >
        <v-sheet
          class="d-flex justify-space-between px-3 align-center blue darken-3 detail__sheet"
          style=""
        >
          <div>{{ collection.title }}</div>
          <v-btn icon @click="onCloseOverlayClick">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-sheet>

        <v-card-title class="justify-space-between pa-0 my-2">
          <v-chip color="indigo" text-color="white">
            <v-avatar left>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{ collection.author || '未知' }}
          </v-chip>
          <div class="d-flex align-center" style="width:auto;">
            <v-chip class="mr-2" color="pink" text-color="white">
              <v-avatar left>
                <v-icon>mdi-heart</v-icon>
              </v-avatar>
              {{ collection.liveCount || 0 }}
            </v-chip>

            <div class="grey darken-3  card__active">
              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card-title>
        <v-window
          style=""
          v-model="currentImageIndex"
          class="elevation-1 detail__image"
          show-arrows
        >
          <v-window-item
            class="fill-height"
            v-for="(image, index) of collection.imageList"
            :key="index"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-img
                :src="transformImage(image)"
                :aspect-ratio="16 / 10"
                class="grey lighten-2"
                max-width="800"
                max-height="500"
              ></v-img>
            </v-row>
          </v-window-item>
        </v-window>
        <v-card-actions class="justify-space-between card__slider">
          <v-slide-group
            v-model="currentImageIndex"
            class="py-3 silder__wrap"
            mandatory
            center-active
            show-arrows
            :dark="false"
          >
            <v-slide-item
              v-for="(image, index) of collection.imageList"
              :key="index"
              v-slot:default="{active, toggle}"
            >
              <v-card
                :class="[
                  'silder__image mx-2',
                  {'silder__image--active': active}
                ]"
                align="center"
                justify="center"
                @click="toggle"
              >
                <v-img
                  :src="image"
                  :aspect-ratio="16 / 10"
                  max-width="172"
                  max-height="108"
                ></v-img>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-card-actions>
      </v-card>
    </div>
  </v-overlay>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({default: false}) isShowOverlay!: Boolean
  @Prop({default: ''}) collectionId!: string

  private currentImageIndex: number = 0
  private collection: any = {}

  onCloseOverlayClick() {
    this.$emit('update:isShowOverlay', false)
  }
  transformImage(path: string) {
    return path.replace('t_s144x90c5', 't_s960x600c5')
  }
  reFindCollectionDetail() {
    this.$callApi({
      api: 'zol/collectionDetail',
      param: {
        detailUrl: this.collectionId
      }
    }).then((data: any) => {
      this.collection = data
    })
  }

  @Watch('collectionId')
  watchCollectionId(val: string) {
    this.reFindCollectionDetail()
  }
}
</script>

<style lang="scss" scoped>
.detail {
  background-color: #fff;
  &__image-card {
    .card__active {
      max-width: 72px;
      border-radius: 5px;
    }
    .card__slider {
      max-width: 800px;
      .silder__wrap {
        ::v-deep.v-icon {
          color: grey;
        }
        width: 100%;
      }
      .silder__image {
        width: 144px;
        height: 90px;
        &--active {
          width: 172px;
          height: 108px;
          border: 2px solid #18ffff;
        }
      }
    }
  }
  &__image {
    max-width: 800px;
    max-height: 500px;
  }
  .detail__sheet {
    width: 100%;
    max-width: 850px;
    margin-top: -14px;
    border-radius: 5px !important;
    border-top-right-radius: 5px;
  }
  ::v-deep.v-slide-group__content {
    height: 130px;
    align-items: center;
  }
  ::v-deep.v-responsive__sizer {
    margin-bottom: -2px;
  }
}
@media (max-width: 600px) {
  .px-xs-0 {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>

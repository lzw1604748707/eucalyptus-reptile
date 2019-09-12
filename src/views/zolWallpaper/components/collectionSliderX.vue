<template>
  <v-overlay v-model="isShowOverlay" color="white" opacity="1">
    <div class="collection-slider">
      <v-sheet
        class="v-system-bar--absolute d-flex justify-space-between px-3 align-center blue darken-3"
      >
        <div>收藏集</div>
        <v-btn icon @click="onCloseOverlayClick">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-sheet>
      <div class="slider__wrap">
        <div
          class="item item--animation"
          v-for="(item, index) of beforeList"
          :key="index"
          :style="itemTransformStyle(item, index)"
          @click="onSelectClick(item, index)"
        >
          {{ item }}
        </div>
        <div
          class="item item--animation"
          v-for="(item, index) of currentList"
          :key="index"
          :style="itemTransformStyle(item, index)"
          @click="onSelectClick(item, index)"
        >
          {{ item }}
        </div>
        <div
          class="item item--animation"
          v-for="(item, index) of afterList"
          :key="index"
          :style="itemTransformStyle(item, index)"
          @click="onSelectClick(item, index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </v-overlay>
</template>

<script lang="ts">
import collectionDetail from '../collectionDetail/collectionDetail.vue'
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'

@Component({
  components: {
    collectionDetail
  }
})
export default class extends Vue {
  private persetList: any[] = []
  private currentList: any[] = []
  private beforeList: any[] = []
  private afterList: any[] = []

  private currentCount: number = 5

  private currentIndexByAll = 0
  private isHeader = {list: 'currentList', index: 0}
  private isTail = {list: 'currentList', index: 4}

  onCloseOverlayClick() {
    this.$emit('update:isShowOverlay', false)
  }
  onSelectClick(item: any) {
    this.currentIndexByAll = item
  }
  itemTransformStyle(item: any) {
    let difference = this.currentIndexByAll - item.indexByAll
    let xAxis = 1000 * difference
    let scaleVale = difference ? 0.8 : 1
    return {
      zIndex: difference ? 0 : 1,
      transform: `${`translateX(${xAxis}px)`} scale(${scaleVale})`
    }
  }
  sliderQueue(difference: boolean) {
    if (difference) {
      if (this.isTail.index < 4) {
        this.isTail.index++
        if (this.isHeader.index < 4) {
          this.isHeader.index++
        } else {
          this.isHeader.list =
            this.isHeader.list === 'currentList' ? 'afterList' : 'currentList'
          this.isHeader.index = 0
        }
      } else {
        this.isTail.list = 'afterList'
        this.isTail.index = 0
      }
    } else {
      if (this.isHeader.index > 0) {
        this.isHeader.index--
        if (this.isTail.index > 0) {
          this.isTail.index--
        } else {
          this.isTail.list =
            this.isTail.list === 'currentList' ? 'beforeList' : 'currentList'
          this.isTail.index = 4
        }
      } else {
        this.isHeader.list = 'beforeList'
        this.isHeader.index = 4
      }
    }
  }
  mounted() {
    this.currentList = [1, 2, 3, 4, 5]
  }
  @Watch('currentIndexByAll')
  watchCurrentIndexByAll(newVal: number, oldVal: number) {
    let difference = newVal - oldVal > 0

    let listStrName: 'afterList' | 'beforeList' = 'afterList'

    listStrName = difference ? 'afterList' : 'beforeList'

    this.sliderQueue(difference)

    // 逻辑未完成版本
  }
}
</script>

<style lang="scss" scoped>
.collection-slider {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  .slider__wrap {
    position: relative;
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
  }
  .item {
    position: absolute;
    bottom: 40px;
    left: 400px;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 800px;
    height: 700px;
    font-size: 30px;
    background: skyblue;
    color: red;
    &--animation {
      transition: transform 0.4s ease-in-out;
    }
  }
}
</style>

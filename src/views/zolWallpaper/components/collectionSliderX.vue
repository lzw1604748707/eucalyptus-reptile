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
          :class="['item', {'item--animation': !isShowLoading}]"
          v-for="(item, index) of beforeList"
          :key="'b' + index"
          :style="itemTransformStyle(item, index)"
          @click="onSelectClick(item, index)"
        >
          <collectionDetail :collectionId="item.url"></collectionDetail>
        </div>
        <div
          :class="['item', {'item--animation': !isShowLoading}]"
          v-for="(item, index) of currentList"
          :key="'c' + index"
          :style="itemTransformStyle(item, index)"
          @click="onSelectClick(item, index)"
        >
          <collectionDetail :collectionId="item.url"></collectionDetail>
        </div>
        <div
          :class="['item', {'item--animation': !isShowLoading}]"
          v-for="(item, index) of afterList"
          :key="'a' + index"
          :style="itemTransformStyle(item, index)"
          @click="onSelectClick(item, index)"
        >
          <collectionDetail :collectionId="item.url"></collectionDetail>
        </div>
      </div>
    </div>
    <v-overlay v-model="isShowLoading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
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
export default class CollectionSliderX extends Vue {
  @Prop({default: false}) isShowOverlay!: boolean
  @Prop({default: -1}) IndexByAll!: number

  @Prop({
    default: () => {
      return []
    }
  })
  beforeList!: any[]

  @Prop({
    default: () => {
      return []
    }
  })
  currentList!: any[]

  @Prop({
    default: () => {
      return []
    }
  })
  afterList!: any[]

  private persetList: any[] = []
  private currentCount: number = 5
  private currentIndexByAll = 0
  private isInit: boolean = true
  private isShowLoading: boolean = false

  private isHeader = {list: 'currentList', index: 0}
  private isTail = {list: 'currentList', index: 4}

  onCloseOverlayClick() {
    this.$emit('update:isShowOverlay', false)
  }
  onSelectClick(item: any) {
    this.isInit = false
    this.currentIndexByAll = item.indexByAll
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
          this.isShowLoading = true
          this.$emit('on-after', this.currentIndexByAll + 2)
          this.isHeader.list = 'currentList'
          this.isHeader.index = 0
          this.isTail.list = 'currentList'
          this.isTail.index = 4
        }
      } else {
        this.isTail.list = 'afterList'
        this.isHeader.index++
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

  mounted() {}

  @Watch('currentIndexByAll')
  watchCurrentIndexByAll(newVal: number, oldVal: number) {
    if (this.isInit) return
    let difference = newVal - oldVal > 0
    this.sliderQueue(difference)
  }

  @Watch('IndexByAll', {immediate: true})
  watchIndexByAll(newVal: number, oldVal: number) {
    console.log('传进', newVal)
    if (newVal > -1) {
      this.currentIndexByAll = newVal
    }
  }

  @Watch('afterList')
  watchAfterList(newVal: number, oldVal: number) {
    this.$nextTick(() => {
      this.isShowLoading = false
    })
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
    color: red;
    &--animation {
      transition: transform 0.4s ease-in-out;
    }
  }
}
</style>

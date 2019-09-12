<template>
  <v-overlay v-model="isShowOverlay" color="white" opacity="1">
    <div class="collection-slider">
      <v-sheet
        class="v-system-bar--absolute d-flex justify-lg-space-between px-3 align-center blue darken-3"
        style="width:100%;"
      >
        <div>收藏集</div>
        <v-btn icon @click="onCloseOverlayClick">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-sheet>
      <div class="slider__wrap">
        <div
          class="item item--animation"
          v-for="(item, index) of list"
          :key="index"
          :style="itemTransformStyle(item, index)"
          @click="onSelectClick(index)"
        >
          <collectionDetail :collectionId="item.url"></collectionDetail>
        </div>
      </div>
    </div>
  </v-overlay>
</template>

<script lang="ts">
import collectionDetail from '../collectionDetail/collectionDetail.vue'
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component({
  components: {
    collectionDetail
  }
})
export default class extends Vue {
  @Prop({default: false}) isShowOverlay!: Boolean
  @Prop({default: []}) list!: any[]
  @Prop({default: 0}) value!: number

  private currentIndexByAll: number = 2
  private isInit: boolean = true

  onCloseOverlayClick() {
    this.$emit('update:isShowOverlay', false)
  }
  onSelectClick(index: number) {
    this.isInit = false
    this.currentIndexByAll = index
  }
  itemTransformStyle(item: any, indexByAll: number) {
    let difference = this.currentIndexByAll - indexByAll
    let xAxis = 1000 * difference
    let scaleVale = difference ? 0.8 : 1
    return {
      zIndex: difference ? 0 : 1,
      transform: `${`translateX(${xAxis}px)`} scale(${scaleVale})`
    }
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

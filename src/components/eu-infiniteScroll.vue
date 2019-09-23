<template>
  <div id="eu-infinite-scroll"
    v-scroll:#eu-infinite-scroll="onScroll">
    <slot></slot>
    <div class="infinite-scroll__progress">
      <v-progress-circular v-if="isLoading"
        indeterminate
        color="primary"></v-progress-circular>
    </div>
    <v-sheet class="text-center"
      v-if="finished"
      dark
      color="blue darken-3">In the end</v-sheet>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({default: 5}) offset!: number
  @Prop({default: false}) isLoading!: boolean
  @Prop({default: false}) finished!: boolean

  onScroll(e: any) {
    if (this.finished || this.isLoading) return
    let bottomDistance =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
    if (this.offset >= bottomDistance) {
      this.$emit('loading')
    }
  }
}
</script>

<style lang="scss" scoped>
.infinite-scroll__progress {
  widows: inherit;
  height: 50px;
  text-align: center;
}
</style>

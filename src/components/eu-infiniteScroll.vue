<template>
  <div id="eu-infiniteScroll"
    v-scroll:#eu-infiniteScroll="onScroll">
    <slot></slot>
    <v-sheet class="text-center"
      v-if="finished"
      color="blue lighten-4">In the end</v-sheet>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({default: 5}) offset!: number
  @Prop({default: false}) finished!: boolean
  onScroll(e: any) {
    if (this.finished) return
    let bottomDistance =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
    if (this.offset >= bottomDistance) {
      this.$emit('loading')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <v-card class="collection__card">
    <v-img class="white--text"
      height="200px"
      style="flex:none;"
      :src="item.cover">
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0"
          align="center"
          justify="center">
          <v-progress-circular :rotate="-90"
            :size="100"
            :width="15"
            :value="loadProgressValue"
            color="primary">
            {{ loadProgressValue }}
          </v-progress-circular>
        </v-row>
      </template>
      <div class="align-end fill-height"
        style="display:flex; ">
        <v-chip class="ma-2"
          color="indigo"
          text-color="white">
          <v-avatar left>
            <v-icon>mdi-image-multiple</v-icon>
          </v-avatar>
          {{ item.sheets || '未知' }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-chip class="ma-2"
          color="#75757560"
          label
          text-color="white">
          {{ item.createDate || '未知' }}
        </v-chip>
      </div>
    </v-img>
    <v-card-title>
      <slot>
        <div class="card__title--line">
          {{ item.title || '' }}
        </div>
      </slot>
    </v-card-title>
    <v-spacer></v-spacer>
    <v-card-text> </v-card-text>
    <v-card-actions>
      <slot name="actions">
        <v-btn text
          color="orange">分享</v-btn>
        <v-spacer></v-spacer>
        <v-btn text
          color="orange">下载 </v-btn>
      </slot>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
@Component
export default class extends Vue {
  @Prop({
    required: true,
    default: () => {
      return {}
    }
  })
  item!: object
  private loadInterval: any = {}
  private loadProgressValue: number = 0
  mounted() {
    this.loadInterval = setInterval(() => {
      if (this.loadProgressValue === 100) {
        clearInterval(this.loadInterval)
        return
      }
      this.loadProgressValue += 50
    }, 100)
  }
  @Watch('item')
  watchItem(val: any) {
    console.log(val)
  }
}
</script>

<style lang="scss" scoped>
.collection__card {
  display: flex;
  flex-direction: column;
  .white--text {
    ::v-deep.v-image__image--cover {
      filter: none;
    }
  }
}
</style>

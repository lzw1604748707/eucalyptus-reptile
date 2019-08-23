<template>
  <v-card>
    <v-img class="white--text" height="200px" :src="item.cover">
      <div class="align-end fill-height" style="display:flex; ">
        <v-chip class="ma-2" color="indigo" text-color="white">
          <v-avatar left>
            <v-icon>account_circle</v-icon>
          </v-avatar>
          {{ item.author || '未知' }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-chip class="ma-2" color="#75757560" label text-color="white">
          {{ item.uploadDate || '未知' }}
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
    <v-card-text>
      <v-spacer></v-spacer>
    </v-card-text>
    <v-card-actions>
      <slot name="actions">
        <v-btn text color="orange">分享</v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="orange">下载 </v-btn>
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
  @Watch('item')
  watchItem(val: any) {
    console.log(val)
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col xs="12" sm="6" md="4" lg="3" v-for="i of 16" :key="i">
        <v-card>
          <v-img class="white--text" height="200px" :src="collection.cover">
            <div class="align-end fill-height" style="display:flex; ">
              <v-chip class="ma-2" color="indigo" text-color="white">
                <v-avatar left>
                  <v-icon>account_circle</v-icon>
                </v-avatar>
                {{ collection.author }}
              </v-chip>
              <v-spacer></v-spacer>
              <v-chip class="ma-2" color="#75757560" label text-color="white">
                {{ collection.uploadDate }}
              </v-chip>
            </div>
          </v-img>
          <v-card-title>
            {{ collection.title }}
          </v-card-title>
          <v-card-text>
            <v-spacer></v-spacer>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="orange">
              分享
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="orange">
              下载
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class extends Vue {
  private collection: object = {
    title: '抽象设计色彩宽屏桌面壁纸',
    author: 'spance',
    uploadDate: '1998-08-25',
    cover: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
  }
  reFindZOLWallpager() {}
  mounted() {}
}
</script>

<style lang="scss" scoped>
.text__title {
  text-align: right;
  width: 75px;
  display: inline-block;
}
</style>

<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue darken-3"
    dark
  >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <v-app-bar-nav-icon @click.stop="onFoldNavClick"></v-app-bar-nav-icon>
      <span class="hidden-sm-and-down">Eucalyptus Reptile</span>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      placeholder="search"
      prepend-inner-icon="search"
      class="hidden-sm-and-down"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-menu offset-y offset-x>
      <template v-slot:activator="{on}">
        <v-btn icon large v-on="on">
          <v-avatar size="32px" item>
            <v-img
              src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
              alt="Vuetify"
            >
            </v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in settingMenus" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class TopPar extends Vue {
  @Prop({required: true}) drawer!: boolean
  private settingMenus: any[] = [
    {id: 1, title: '个人中心'},
    {id: 2, title: '快捷设置'},
    {id: 3, title: '退出'}
  ]
  onFoldNavClick() {
    this.$emit('update:drawer', !this.drawer)
  }
}
</script>

<style lang="scss" scoped></style>

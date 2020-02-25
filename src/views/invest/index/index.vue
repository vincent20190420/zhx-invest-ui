<template>
  <d2-container type="ghost">
    <d2-module-index-banner slot="header" v-bind="banner"/>
    <d2-module-index-menu :menu="menu"/>
  </d2-container>
</template>

<script>
import menu from '@/menu/modules/zhx-invest'
export default {
  data () {
    return {
      menu,
      banner: {
        title: '投资管理',
        subTitle: '投资管理'
      }
    }
  }
}
</script>

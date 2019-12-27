<template>
  <d2-container type="ghost">
    <d2-module-index-banner slot="header" v-bind="banner"/>
    <d2-module-index-menu :menu="menu"/>
  </d2-container>
</template>

<script>
import menu from '@/menu/modules/zhx-tools'
export default {
  data () {
    return {
      menu,
      banner: {
        title: '程序员工具',
        subTitle: '程序员工具'
      }
    }
  }
}
</script>

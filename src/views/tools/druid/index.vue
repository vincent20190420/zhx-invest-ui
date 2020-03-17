
<template>
    <d2-container-frame :src="'http://localhost:8081/druid'"/>
</template>

<script>
  export default {
    data () {
      return {
        filename: __filename
      }
    }
  }
</script>

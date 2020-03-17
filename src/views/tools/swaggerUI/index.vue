
<template>
    <d2-container-frame :src="'http://localhost:8081/doc.html?plus=1'"/>
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

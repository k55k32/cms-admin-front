<template lang="jade">
.test
  editor
</template>

<script>
import editor from 'markdown-it-editor'
import 'markdown-it-editor/lib/css/index.css'

export default {
  components: { editor }
}

</script>

<style lang="css">
.test{
  height: 30%;
  width: 80%;
}
</style>

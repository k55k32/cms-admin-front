<template lang="jade">
div
  router-view(url="article")
</template>

<script>
import list from './list'
export default {
  components: { list }
}
</script>

<style lang="less">
</style>

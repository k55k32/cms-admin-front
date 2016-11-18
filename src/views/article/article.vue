<template lang="jade">
div article
  rich-editor(ref="editor" v-model="article.content", filename="file" , :upload="uploadUrl" , :headers="{Authorization: this.$store.state.token}")
  button(@click="save") save
</template>

<script>
import RichEditor from 'RichEditor'
export default {
  components: { RichEditor },
  data () {
    return {
      uploadUrl: 'http://localhost:8080/upload/img',
      article: {
        content: '123123'
      }
    }
  },
  methods: {
    save () {
      let data = this.$refs.editor.getData()
      console.log(data)
    }
  }
}
</script>

<style lang="less">
</style>

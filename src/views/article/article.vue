<template lang="jade">
div
  el-form.login-form(label-position="top", :rules="rules", :model="article", v-loading.body="loading")
    el-form-item(label="文章标题" prop="title")
      el-input(v-model="article.title" size="large")
    el-form-item(label="文章内容" prop="content")
      rich-editor(ref="editor" v-model="article.content", filename="file" , :upload="uploadUrl" , :headers="{Authorization: this.$store.state.token}")
    el-form-item
      el-button.btn-block(native-type="submit", type="primary", @click.prevent="save") 保存
</template>

<script>
import RichEditor from 'RichEditor'
export default {
  components: { RichEditor },
  data () {
    return {
      uploadUrl: 'http://localhost:8080/upload/img',
      loading: false,
      article: {
        content: '',
        title: ''
      },
      rules: {
        title: {required: true}
      }
    }
  },
  methods: {
    save () {
      this.post('article/save', this.article).then((data) => {
        console.log(data)
      })
    }
  }
}
</script>

<style lang="less">
</style>

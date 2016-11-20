<template lang="jade">
div
  el-form.login-form(label-position="top", :rules="rules", :model="from", v-loading.body="loading")
    el-form-item(label="文章标题" prop="title")
      el-input(v-model="from.title" size="large")
    el-form-item(label="文章内容" prop="content")
      rich-editor(ref="editor" v-model="from.content", filename="file" , :upload="uploadUrl" , :headers="{Authorization: this.$store.state.token}")
    el-form-item
      el-button.btn-block(native-type="submit", type="primary", @click.prevent="saveAction") 保存
</template>

<script>
import RichEditor from 'RichEditor'
export default {
  props: ['url'],
  components: { RichEditor },
  data () {
    return {
      uploadUrl: 'http://localhost:8080/upload/img',
      loading: false,
      from: {
        content: '',
        title: ''
      },
      rules: {
        title: {required: true}
      }
    }
  },
  methods: {
    saveAction () {
      this.save().then(() => {
        this.$emit('save-success')
      })
    },
    save () {
      if (this.from.id) {
        return this.put(this.url, this.from)
      } else {
        return this.post(this.url, this.from)
      }
    }
  },
  beforeRouteEnter (to, f, next) {
    next(vm => {
      let id = to.query.id
      if (id) {
        this.loading = true
        this.get(this.url, {id}).then(({data}) => {
          this.from = data
        }).finally(() => {
          this.loading = false
        })
      }
    })
  }
}
</script>

<style lang="less">
</style>

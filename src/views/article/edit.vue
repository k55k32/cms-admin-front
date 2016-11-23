<template lang="jade">
div
  el-form(label-position="top", :rules="rules", :model="form" ref="form")
    el-form-item(label="文章标题" prop="title")
      el-input(v-model="form.title" size="large")
    el-form-item(label="所属栏目")
      el-select(v-model="form.catalogId", placeholder="请选择")
        el-option(v-for="cata in catalogs", :label="cata.name", :value="cata.id")
    el-form-item(label="文章内容" prop="content")
      rich-editor(ref="editor" v-model="form.content", filename="file" , :upload="uploadUrl" , :headers="{Authorization: this.$store.state.token}")
    el-form-item.el-dialog__footer
      el-button(type="default", @click="$emit('cancel')") 取消
      el-button(native-type="submit", type="primary", @click.prevent="saveAction") 保存
</template>

<script>
import RichEditor from 'RichEditor'
import Vue from 'vue'
export default {
  props: ['data'],
  components: { RichEditor },
  created () {
    this.get('catalog/list').then(({data}) => {
      this.catalogs = data
    })
  },
  data () {
    return {
      catalogs: [],
      uploadUrl: Vue.globalOptions.uploadUrl,
      form: {content: '', title: '', catalogId: null, ...this.data},
      rules: {
        title: {required: true}
      }
    }
  },
  methods: {
    saveAction () {
      this.$emit('save', this.form)
    }
  }
}
</script>

<style lang="less">
</style>

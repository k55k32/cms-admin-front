<template lang="jade">
div
  el-form(label-position="top", :rules="rules", :model="form" ref="form")
    el-form-item(label="文章标题" prop="title")
      el-input(v-model="form.title" size="large")
    el-form-item(label="所属栏目")
      el-select(v-model="form.catalogId", placeholder="请选择")
        el-option(v-for="cata in catalogs", :label="cata.name", :value="cata.id")
    el-form-item(label="文章内容" prop="content")
      .markdown-editor
        markdown-editor(ref="editor" v-model="form.content",:upload="{url: uploadUrl, name: 'file'}")
    el-form-item(label="摘要" prop="summary")
      textarea.article-summary(v-model="form.summary")
    el-form-item.el-dialog__footer
      el-button(type="default", @click="$emit('cancel')") 取消
      el-button(native-type="submit", type="primary", @click.prevent="saveAction") 保存
</template>

<script>
import { MarkdownEditor } from 'markdown-it-editor'
import 'markdown-it-editor/lib/index.css'
import Vue from 'vue'
export default {
  props: ['data'],
  components: {
    MarkdownEditor
  },
  watch: {
    'form.content' () {
      this.$nextTick(() => {
        this.form.summary = this.$refs.editor.getText().replace(/\n/g, '').substr(0, 300)
      })
    }
  },
  created () {
    this.get('catalog/list').then(({data}) => {
      this.catalogs = data
    })
  },
  data () {
    return {
      catalogs: [],
      uploadUrl: Vue.globalOptions.uploadUrl,
      form: {content: '', title: '', summary: '', catalogId: null, ...this.data},
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
.markdown-editor{
  height: 500px;
}
.article-summary{
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
  height: 5em;
  resize: none;
}
</style>

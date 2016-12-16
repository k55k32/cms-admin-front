<template lang="jade">
.article-editor
  el-form(label-position="left", label-width="100px", :rules="rules", :model="form" ref="form")
    el-upload.full-upload(:action="uploadUrl", name="file", :thumbnail-mode="true", type="drag",:on-success="uploadSuccess", :default-file-list="banner", :multiple="false")
      i.el-icon-upload
      .el-dragger__text 上传文章的banner图
    el-form-item(label="文章标题" prop="title")
      el-input(v-model="form.title" size="large")
    el-form-item(label="所属栏目")
      el-select(v-model="form.catalogId", placeholder="请选择")
        el-option(v-for="cata in catalogs", :label="cata.name", :value="cata.id")
    el-form-item(label="文章内容" prop="content")
      .markdown-editor
        markdown-editor(ref="editor" v-model="form.content",:upload="{url: uploadUrl, name: 'file'}", :options="MarkdownOptions", @save-history="saveHistory", height="100%")
    el-form-item(label="摘要" prop="summary" hidden)
      el-input(type="textarea" v-model="form.summary", :autosize="{ minRows: 4, maxRows: 8}")
    el-form-item.el-dialog__footer
      el-button(native-type="submit", type="primary", @click.prevent="saveAction") 发布
</template>

<script>
import { MarkdownEditor } from 'markdown-it-editor'
import 'markdown-it-editor/lib/index.css'
import MarkdownMix from './MarkdownMix'
import Vue from 'vue'
export default {
  props: ['data', 'value'],
  mixins: [MarkdownMix],
  components: {
    MarkdownEditor
  },
  watch: {
    'form.content' () {
      this.$nextTick(() => {
        this.generatorSummary()
      })
    }
  },
  created () {
    this.get('catalog/list').then(({data}) => {
      this.catalogs = data
    })
  },
  computed: {
    banner () {
      let array = []
      if (this.form.banner) {
        array = [{name: 'banner', url: this.form.banner}]
      }
      return array
    }
  },
  data () {
    return {
      catalogs: [],
      uploadUrl: Vue.globalOptions.uploadUrl,
      form: {content: '', title: '', summary: '', banner: '', catalogId: null, status: 1, ...this.data},
      rules: {
        title: {required: true}
      }
    }
  },
  methods: {
    uploadSuccess (r) {
      this.form.banner = r
    },
    generatorSummary () {
      this.form.summary = this.$refs.editor.getText().replace(/\n/g, ' ').substr(0, 300)
    },
    saveHistory () {
      if (this.form.status === 1) {
        this.post('article/save/draft', this.form).then(({data}) => {
          this.form = {...this.form, ...data}
        })
      }
    },
    saveAction () {
      this.generatorSummary()
      this.$emit('save', this.form)
    }
  }
}
</script>

<style lang="less">
.full-upload{
  margin-bottom: 20px;
  width: 100%;
  .el-upload__inner{
    width: 100%;
  }
  .el-dragger__cover img{
    width: auto;
    height: 100%;
  }
}
.markdown-editor{
  height: 70vh;
}
.article-summary{
  padding: 5px;
  width: 100%;
  height: 5em;
  resize: none;
}
</style>

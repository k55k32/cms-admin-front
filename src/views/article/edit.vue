<template lang="pug">
.article-editor
  el-form(label-position="left", label-width="100px", :rules="rules", :model="form" ref="form")
    .flexrow
      el-upload.flex-1.full-upload(:action="uploadUrl", name="file", :thumbnail-mode="true", type="drag",:on-success="uploadSuccess", :default-file-list="banner", :multiple="false")
        i.el-icon-upload
        .el-dragger__text 上传文章的banner图
      .flex-1
        el-form-item(label="文章标题" prop="title")
          el-input(v-model="form.title")
        el-form-item(label="所属栏目")
          el-select(v-model="form.catalogId", placeholder="请选择")
            el-option(v-for="cata in catalogs", :label="cata.name", :value="cata.id")
        el-form-item(label="文章标签")
          el-select(v-model="form.tagIds", placeholder="请选择" multiple filterable allow-create)
            el-option(v-for="tag in tags", :label="tag.name", :value="tag.id")
    .markdown-editor
      markdown-editor(ref="editor" v-model="form.content",:upload="{url: uploadUrl, name: 'file'}", :options="MarkdownOptions", @save-history="saveHistory", height="100%", z-index="2017")
    el-form-item(label="摘要" prop="summary" hidden)
      el-input(type="textarea" v-model="form.summary", :autosize="{ minRows: 4, maxRows: 8}")
    el-form-item.el-dialog__footer
      el-button(type="primary", @click.prevent="saveDraft", v-if="isDraft") 保存
      el-button(native-type="submit", type="primary", @click.prevent="saveAction") 保存并发布
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
    this.get('tag/list').then(({data}) => {
      this.tags = data
    })
  },
  computed: {
    banner () {
      let array = []
      if (this.form.banner) {
        array = [{name: 'banner', url: this.form.banner}]
      }
      return array
    },
    isDraft () {
      return this.form.status === 1
    }
  },
  data () {
    return {
      catalogs: [],
      tags: [],
      uploadUrl: Vue.globalOptions.uploadUrl,
      form: {content: '', title: '', summary: '', banner: '', catalogId: null, status: 1, tagIds: [], ...this.data},
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
    saveDraft () {
      this.saveHistory()
      this.$emit('close')
    },
    saveHistory () {
      if (this.isDraft) {
        return this.post('article/save/draft', this.form, { emulateJSON: false }).then(({data}) => {
          if (this.form.id !== data.id) this.form = {...this.form, id: data.id}
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
    width: 100%;
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
.el-form-item{
  .el-select{
    width: 100%;
  }
}
</style>

<template lang="jade">
div
  .actions
    el-button(type="primary" @click="edit()") 新增
  el-table(:data="pageData.data", border="", style="width: 100%" v-loading="editLoading")
    el-table-column(prop="title" label="标题")
    el-table-column(label="内容", inline-template)
      span {{row.content | html2text | maxlength(50, true)}}
    el-table-column(label="状态", inline-template)
      span {{status[row.status]}}
    el-table-column(inline-template label="创建时间")
      span {{row.createTime | datetime}}
    el-table-column(:context="_self", inline-template label="操作", min-width="100" )
      div
        el-button(size="small", @click="showPreview(row)") 预览
        el-button(size="small", @click="publish(row.id)" v-if='row.status === 1') 发布
        el-button(size="small", @click="unpublish(row.id)" v-if='row.status === 2') 取消发布
        el-button(size="small", @click="edit(row.id)") 编辑
        el-button(size="small", type="danger", @click="remove(row.id)") 删除
  .pagination
    el-pagination(layout="prev, pager, next", :total="pageData.total", :page-size="pageData.pageSize", @current-change="pageChange")

  el-dialog(:title="preview.title", v-model="previewShow", size="full")
    markdown-preview(:content="preview.content")
  el-dialog(title="新增", v-model="editDialog", size="full", v-if="editDialog")
    edit(:data="editData" @save="save" @cancel="editDialog = false" v-loading="saveLoading")
</template>

<script>
import DTMix from 'mix/DTMix'
import edit from './edit'
import { MarkdownPreview } from 'markdown-it-editor'

const status = {
  0: '已删除', 1: '草稿中', 2: '已发布'
}

export default {
  mixins: [DTMix],
  components: {edit, MarkdownPreview},
  computed: {
    status () {
      return status
    }
  },
  data () {
    return {
      preview: {},
      previewShow: false
    }
  },
  methods: {
    showPreview (article) {
      this.previewShow = true
      this.preview = article
    },
    unpublish (id) {
      this.editLoading = true
      this.post('article/unpublish/' + id).then(() => this.loadPage())
    },
    publish (id) {
      this.editLoading = true
      this.post('article/publish/' + id).then(() => this.loadPage())
    }
  }
}
</script>

<style lang="less">
</style>

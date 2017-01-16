<template lang="pug">
div
  .actions
    el-button(type="primary" @click="reload()") 刷新
    el-button(type="primary" @click="edit()") 新增
  el-table(:data="pageData.data", border="", style="width: 100%" v-loading="listLoading")
    el-table-column(prop="catalogName" label="栏目")
    el-table-column(prop="title" label="标题")
    //- el-table-column(label="标签", inline-template)
    //-   el-tag(type="primary" v-for="tag in row.tags") {{tag.name}}
    el-table-column(label="状态", inline-template, width="80px")
      span {{status[row.status]}}
    el-table-column(label="创建时间")
      template(scope="scope")
        el-date-picker(v-model="scope.row.createTime" type="datetime", :clearable="false", :editable="false", format="yyyy-MM-dd HH:mm", @change="updateCreateTime(scope.row.id, scope.row.createTime)")
    el-table-column(inline-template label="更新时间")
      span {{row.updateTime | datetime}}
    el-table-column(:context="_self", inline-template label="操作", min-width="200px" )
      div
        el-button(size="small", @click="showPreview(row)") 预览
        el-button(size="small", @click="publish(row.id)" v-if='row.status === 1') 发布
        el-button(size="small", @click="unpublish(row.id)" v-if='row.status === 2') 取消发布
        el-button(size="small", @click="edit(row.id)") 编辑
        el-button(size="small", type="danger", @click="remove(row.id)") 删除
  .pagination
    el-pagination(layout="prev, pager, next", :total="pageData.total", :page-size="pageData.pageSize", @current-change="pageChange")
  el-dialog(:title="preview.title", v-model="previewShow", size="full")
    markdown-preview(:content="preview.content", :options="MarkdownOptions")
  el-dialog.editor-dialog(title="文章编辑", v-model="editDialog", size="full" v-if="editDialog")
    edit(:data="editData", @save="save", @close="closeEdit" @cancel="editDialog = false" v-loading="saveLoading")
</template>

<script>
import DTMix from 'mix/DTMix'
import 'markdown-it-editor/lib/index.css'
import { MarkdownPreview } from 'markdown-it-editor'
import MarkdownMix from './MarkdownMix'
const status = {
  0: '已删除', 1: '草稿中', 2: '已发布'
}

export default {
  mixins: [DTMix, MarkdownMix],
  components: {
    edit (r) { require(['./edit'], r) },
    MarkdownPreview
  },
  computed: {
    status () {
      return status
    }
  },
  data () {
    return {
      preview: {},
      previewShow: false,
      saveOptions: { emulateJSON: false }
    }
  },
  methods: {
    reload () {
      this.loadPage()
    },
    showPreview (article) {
      this.previewShow = true
      this.preview = article
    },
    updateCreateTime (id, time) {
      if (typeof time === 'number') return
      this.$post('article/createtime/' + id, {time: time.getTime()}).then(() => {
        this.$message.success('创建时间修改成功')
      })
    },
    unpublish (id) {
      this.listLoading = true
      this.$post('article/unpublish/' + id).then(() => this.loadPage())
    },
    publish (id) {
      this.listLoading = true
      this.$post('article/publish/' + id).then(() => this.loadPage())
    },
    closeEdit () {
      this.editDialog = false
      this.loadPage()
    }
  }
}
</script>

<style lang="less">
.table-input{
  input{
    padding: 0;
    border: 0;
    background: none;
  }
}
.editor-dialog{
  @title-padding: 20px;
  .el-dialog--full{
    display: flex;
    flex-direction: column;
  }
  .el-dialog__header{
    padding:@title-padding;
  }
  .el-dialog__body{
    flex: 1;
    overflow: auto;
  }
  .el-dialog__footer{
    position: absolute;
    top: 0px;
    right: @title-padding * 2;
  }
}
</style>

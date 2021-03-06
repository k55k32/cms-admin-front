<template lang="pug">
div
  .actions
    el-button(type="primary" @click="reload()") 刷新
    el-button(type="primary" @click="edit()") 新增
  .filter
    el-form(:inline="true")
      el-form-item(label="状态")
        el-select(v-model="queryParams.status" clearable )
          el-option(v-for="v, k in status", :label="v.text", :value="k")
      el-form-item(label="目录")
        el-select(v-model="queryParams.catalog" clearable )
          el-option(v-for="cata in catalogs", :label="cata.name", :value="cata.id")
  el-table(:data="pageData.data", border="", style="width: 100%" v-loading="listLoading")
    el-table-column(prop="catalogName" label="栏目" width="120px")
    el-table-column(prop="title" label="标题")
      template(scope="scope")
        u(@click="showPreview(scope.row)") {{scope.row.title}}
    el-table-column(label="状态", width="80px")
      template(scope="scope")
        el-tag(:type="status[scope.row.status].type") {{status[scope.row.status].text}}
    el-table-column(label="创建时间")
      template(scope="scope")
        el-date-picker(min-width="300px", v-model="scope.row.createTime" type="datetime", :clearable="false", :editable="false", format="yyyy-MM-dd HH:mm", @change="updateCreateTime(scope.row.id, scope.row.createTime)")
    el-table-column(inline-template label="更新时间")
      span {{row.updateTime | datetime}}
    el-table-column(:context="_self" label="操作", width="280px" )
      template(scope="scope")
        el-button(size="small", @click="publish(scope.row.id)" v-if='scope.row.status === 1') 发布
        el-button(size="small", @click="unpublish(scope.row.id)" v-if='scope.row.status === 2') 取消发布
        el-button(size="small", @click="edit(scope.row.id)") 编辑
        el-button(size="small", type="danger", @click="remove(scope.row.id)" v-if="scope.row.status !== 0") 删除
        el-button(size="small", type="success", @click="recovery(scope.row.id)" v-if="scope.row.status === 0") 恢复
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
  2: { text: '已发布', type: 'success' },
  1: { text: '草稿中', type: '' },
  0: { text: '已删除', type: 'danger' }
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
  created () {
    this.$get('catalog/list').then(({data}) => {
      this.catalogs = data
    })
  },
  data () {
    return {
      catalogs: [],
      autoSearch: true,
      queryParams: {status: '', catalog: ''},
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
    recovery (id) {
      this.listLoading = true
      this.$post('article/recovery/' + id).then(() => this.loadPage())
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

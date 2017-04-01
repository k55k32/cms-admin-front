<template lang="pug">
div
  .filter
    el-form(:inline="true")
      el-form-item(label="状态")
        el-select(v-model="queryParams.state" clearable)
          el-option(v-for="s in state", :label="s[1]", :value="s[0]")
      el-form-item(label="文章")
        el-select(v-model="queryParams.articleId" clearable filterable)
          el-option(v-for="a in articles", :label="a.title", :value="a.id")
      //- el-form-item
      //-   el-button(@click="searchPage") 搜索
  el-table(:data="pageData.data", border="", style="width: 100%" v-loading="listLoading")
    el-table-column(prop="articleTitle" label="所属文章")
    el-table-column(label="昵称")
      template(scope="scope")
        p(:class="{'author-comment': scope.row.fromAuthor}") {{scope.row.nickname}}
    el-table-column(label="描述")
      template(scope="scope")
        p(@click="openCommentHandler(scope.row)") {{scope.row.content | maxlength(30)}}
    el-table-column(label="创建时间")
      template(scope="scope")
        span {{scope.row.createTime | datetime}}
    el-table-column(:context="_self" label="操作" )
      template(scope="scope")
        el-button(size="small", @click="replyCommentHandler(scope.row)") 回复
        el-button(size="small", @click="edit(scope.row.id)") 编辑
        el-button(size="small", type="success", @click="recovery(scope.row)" v-if="isDelete(scope.row.state)") 恢复
        el-button(size="small", type="danger", @click="remove(scope.row.id)" v-else) 删除
  .pagination
    el-pagination(layout="total, sizes, prev, pager, next, jumper", @size-change="sizeChange", :total="pageData.total", :page-size="pageData.pageSize", @current-change="pageChange")
  el-dialog(title="编辑", v-model="editDialog", v-if="editDialog")
    edit(:data="editData" @save="save" @cancel="editDialog = false" v-loading="saveLoading")
  el-dialog(:title="`回复： ${currentComment.nickname} <${currentComment.email}>`", v-model="replyDialogShow")
    ReplyForm(:data="replyData", :comment="currentComment",  @cancel="replyDialogShow = false" @save="replyCommentSave")
</template>

<script>
import DTMix from 'mix/DTMix'
import edit from './edit'
import ReplyForm from './reply-form.vue'
const STATE_MAP = [
  ['1', '正常'],
  ['0', '已删除']
]
export default {
  mixins: [DTMix],
  components: { edit, ReplyForm },
  methods: {
    isDelete (state) {
      return parseInt(state) === 0
    },
    recovery (rowData) {
      this.$get(`comment/recovery/${rowData.id}`).then(() => {
        rowData.state = 1
      })
    },
    openCommentHandler (comment) {
      this.$alert(comment.content, `${comment.nickname}<${comment.email}>`)
    },
    replyCommentHandler (comment) {
      this.replyData.id = comment.id
      this.currentComment = comment
      this.replyDialogShow = true
    },
    replyCommentSave (data) {
      this.$post(`comment/reply/${data.id}`, {content: data.content}).then(() => {
        this.replyData = {id: ''}
        this.replyDialogShow = false
        this.$message.success('回复成功')
        this.loadPage()
      })
    }
  },
  created () {
    this.$get('article/id-title').then(({data}) => {
      this.articles = data
    })
  },
  data () {
    return {
      autoSearch: true,
      replyDialogShow: false,
      currentComment: {},
      replyData: {id: ''},
      queryParams: {
        state: STATE_MAP[0][0],
        articleId: null
      },
      articles: [],
      state: STATE_MAP
    }
  }
}
</script>

<style lang="less">
.author-comment{
  font-weight: lighter;
  &:after{
      content: '(from-author)'
  }
}
</style>

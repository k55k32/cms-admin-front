<template lang="pug">
div
  .filter
    el-form(:inline="true")
      el-form-item(label="状态")
        el-select(v-model="queryParams.state")
          el-option(v-for="s in state", :label="s[1]", :value="s[0]")
      el-form-item(label="文章")
        el-select(v-model="queryParams.articleId")
          el-option(label="全部", :value="null")
          el-option(v-for="a in articles", :label="a.title", :value="a.id")
      //- el-form-item
      //-   el-button(@click="searchPage") 搜索
  el-table(:data="pageData.data", border="", style="width: 100%" v-loading="listLoading")
    el-table-column(prop="articleTitle" label="所属文章")
    el-table-column(prop="nickname" label="昵称")
    el-table-column(prop="email" label="邮箱")
    el-table-column(prop="content" label="描述")
    el-table-column(inline-template label="状态")
      span {{row.state | state}}
    el-table-column(inline-template label="创建时间")
      span {{row.createTime | datetime}}
    el-table-column(:context="_self", inline-template label="操作" )
      div
        el-button(size="small", @click="edit(row.id)") 编辑
        el-button(size="small", type="danger", @click="remove(row.id)") 删除
  .pagination
    el-pagination(layout="total, sizes, prev, pager, next, jumper", @size-change="sizeChange", :total="pageData.total", :page-size="pageData.pageSize", @current-change="pageChange")
  el-dialog(title="编辑", v-model="editDialog", v-if="editDialog")
    edit(:data="editData" @save="save" @cancel="editDialog = false" v-loading="saveLoading")
</template>

<script>
import DTMix from 'mix/DTMix'
import edit from './edit'
const STATE_MAP = [
  ['1', '正常'],
  [null, '全部'],
  ['0', '已删除']
]
export default {
  mixins: [DTMix],
  components: { edit },
  created () {
    this.get('article/id-title').then(({data}) => {
      this.articles = data
    })
  },
  watch: {
    queryParams: {
      deep: true,
      handler () {
        this.loadPage()
      }
    }
  },
  data () {
    return {
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
</style>

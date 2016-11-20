<template lang="jade">
div
  .actions
    el-button(type="primary" @click="$router.push('edit')") 新增
  el-table(:data="pageData.data", border="", style="width: 100%")
    el-table-column(prop="title" label="标题")
    el-table-column(prop="content", label="内容")
    el-table-column(:context="_self", inline-template label="操作" )
      div
        el-button(size="small", @click="edit(row.id)") 编辑
        el-button(size="small", type="danger", @click="remove(row.id)") 删除
  .pagination
    el-pagination(layout="prev, pager, next", :total="pageData.total", :page-size="pageData.pageSize", @current-change="pageChange")


</template>

<script>
import DTMix from 'mix/DTMix'
export default {
  mixins: [DTMix],
  methods: {
    edit (id) {
      this.$router.push({path: 'edit', query: {id}})
    }
  }
}
</script>

<style lang="less">
</style>

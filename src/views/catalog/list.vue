<template lang="jade">
div
  .actions
    el-button(type="primary" @click="edit()") 新增
  el-table(:data="pageData.data", border="", style="width: 100%" v-loading="editLoading")
    el-table-column(prop="title" label="名称")
    el-table-column(inline-template label="创建时间")
      span {{row.createTime | datetime}}
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
  mixins: [DTMix]
}
</script>

<style lang="less">
</style>

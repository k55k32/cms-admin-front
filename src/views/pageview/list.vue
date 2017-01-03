<template lang="jade">
.pageview
  el-table(:data="pageData.data", border="", style="width: 100%" v-loading="listLoading")
    el-table-column(inline-template label="名称")
      el-tooltip(effect="light", :content="'参数:' + row.params", placement="top-start")
        a(:href="'http://diamondfsd.com' + row.fullPath" target="_blank") {{row.name}}
    el-table-column(inline-template label="创建时间")
      span {{row.createTime | datetime}}
    el-table-column(prop="ip" label="IP")
  .pagination
    el-pagination(layout="total, sizes, prev, pager, next, jumper", :total="pageData.total", :page-sizes="[10, 20, 40, 80]", :page-size="pageData.pageSize", @current-change="pageChange", @size-change="sizeChange")
</template>

<script>
import DTMix from 'mix/DTMix'
export default {
  mixins: [DTMix],
  data () {
    return { url: 'pv' }
  }
}
</script>

<style lang="css">
</style>

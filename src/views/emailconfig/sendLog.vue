<template lang="pug">
div
  el-table(:data="pageData.data" v-loading="listLoading")
    el-table-column(prop="fromEmail" label="发件人")
    el-table-column(prop="toEmail" label="收件人")
    el-table-column(prop="title" label="标题")
    el-table-column(prop="remark" label="备注")
    el-table-column(label="创建时间")
      template(scope="scope")
        span {{scope.row.createTime | datetime}}
  .pagination
    el-pagination(layout="prev, pager, next", :total="pageData.total", :page-size="pageData.pageSize", @current-change="pageChange")
</template>

<script>
import DTMix from 'mix/DTMix'
export default {
  mixins: [DTMix],
  data () {
    return {
      url: 'email-config/log'
    }
  }
}
</script>

<style lang="css">
</style>

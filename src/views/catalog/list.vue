<template lang="jade">
div
  .actions
    el-button(type="primary" @click="edit()") 新增
  el-table(:data="pageData.data", border="", style="width: 100%" v-loading="editLoading")
    el-table-column(prop="name" label="名称")
    el-table-column(inline-template label="创建时间")
      span {{row.createTime | datetime}}
    el-table-column(:context="_self", inline-template label="操作" )
      div
        el-button(size="small", @click="edit(row.id)") 编辑
        el-button(size="small", type="danger", @click="remove(row.id)") 删除
  .pagination
    el-pagination(layout="prev, pager, next", :total="pageData.total", :page-size="pageData.pageSize", @current-change="pageChange")
    el-dialog(title="新增", v-model="editDialog", v-if="editDialog")
      edit(:data="editData" @save="save" @cancel="editDialog = false" v-loading="saveLoading")
</template>

<script>
import DTMix from 'mix/DTMix'
import edit from './edit'
export default {
  mixins: [DTMix],
  components: { edit }
}
</script>

<style lang="less">
</style>

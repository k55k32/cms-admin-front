/**
* table list mix -
* inculde curd opeartor
**/
export default {
  created () {
    if (this.autoload !== false) this.loadPage()
  },
  data () {
    return {
      url: this.$route.name,
      pageData: {},
      editData: {},
      editDialog: false,
      listLoading: false,
      saveLoading: false,
      saveOptions: {}
    }
  },
  computed: {
    tableData () {
      return this.pageData.data
    }
  },
  methods: {
    loadPage (pageSize = this.pageData.pageSize || 10, currentPage = this.pageData.currentPage || 1) {
      this.listLoading = true
      this.get(this.url, {
        pageSize: pageSize,
        currentPage: currentPage
      }).then(({data}) => {
        this.pageData = data
      }).finally(() => {
        this.listLoading = false
      })
    },
    sizeChange (size) {
      this.pageData.pageSize = size
      this.loadPage()
    },
    pageChange (currentPage) {
      this.pageData.currentPage = currentPage
      this.loadPage()
    },
    remove (id) {
      return this.$confirm(this.deleteMsg || '确定要删除该条记录吗?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        return this.delete(this.url, {id}).then(() => {
          this.$message.success('删除成功')
        })
      })
      .then(() => { return this.loadPage() })
      .catch(() => {})
    },
    edit (id) {
      if (id) {
        this.listLoading = true
        this.get(this.url + '/' + id).then(({data}) => {
          this.editData = data
          this.editDialog = true
        }).finally(() => {
          this.listLoading = false
        })
      } else {
        this.editData = {}
        this.editDialog = true
      }
    },
    save (data) {
      let requestPath = this.url
      if (data.id) {
        requestPath += '/' + data.id
      }
      this.saveLoading = true
      this.post(requestPath, data, this.saveOptions).then(() => {
        this.editDialog = false
        this.loadPage()
      }).finally(() => {
        this.saveLoading = false
      })
    }
  }
}

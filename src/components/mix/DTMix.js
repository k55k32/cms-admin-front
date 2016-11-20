/**
* table list mix -
**/
export default {
  props: ['url'],
  created () {
    this.loadPage()
  },
  data () {
    return {
      pageData: {}
    }
  },
  computed: {
    tableData () {
      return this.pageData.data
    }
  },
  methods: {
    loadPage (pageSize = this.pageData.pageSize || 10, currentPage = this.pageData.currentPage || 1) {
      this.get(this.url, {
        pageSize: pageSize,
        currentPage: currentPage
      }).then(({data}) => {
        let pageData = data
        pageData.data.forEach(art => {
          art.content = art.content.replace(/<[^>]*>/g, '')
        })
        this.pageData = pageData
      })
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
      .then(() => { return this.delete(this.url, {id}) })
      .then(() => { return this.loadPage() })
      .catch(() => {})
    }
  }
}

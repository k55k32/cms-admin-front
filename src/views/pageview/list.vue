<template lang="pug">
.pageview
  .filter
    el-form
      el-form-item(label="时间范围")
        el-date-picker(v-model='daterange', type='daterange', @change="rangeChange", align='left', placeholder='选择日期范围', :picker-options='pickerOptions')
  el-tabs
    el-tab-pane(label='图表', name='first')
      canvas(ref="chart" height="150")
    el-tab-pane(label='详情', name='second')
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
import { dateFormat } from '../../utils/util'
import Chart from 'chart.js'
function getDateToNow (num) {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * num)
  return [start, end]
}
export default {
  mixins: [DTMix],
  watch: {
    daterange (val) {
      // ISSUE the datetime changed on click TODO
      this.loadPage()
      this.loadCount()
    }
  },
  methods: {
    rangeChange () {
      console.log('change-ranged')
    },
    getDateToNow (num) {
      const start = new Date()
      const end = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * num)
      return [start, end]
    },
    loadCount (queryParams = this.queryParams) {
      this.get('pv/range-count', queryParams).then(({data}) => {
        this.rangeData = data
        this.renderChart()
      })
    },
    renderChart () {
      let cxt = this.$refs.chart.getContext('2d')
      new Chart(cxt, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [ this.rangeDataCtd ]
        }
      })
    }
  },
  mounted () {
    this.loadCount()
  },
  computed: {
    queryParams () {
      let start = this.daterange[0]
      start.setHours(0)
      start.setMinutes(0)
      start.setSeconds(0)
      let end = this.daterange[1]
      end.setHours(23)
      end.setMinutes(59)
      end.setSeconds(59)
      return {
        start: start.getTime(),
        end: end.getTime()
      }
    },
    labels () {
      let start = this.queryParams.start
      let end = this.queryParams.end
      let labels = []
      for (let i = start; i <= end; i += 1000 * 60 * 60 * 24) {
        let now = dateFormat(new Date(i), 'yyyy-MM-dd')
        labels.push(now)
      }
      return labels
    },
    rangeDataCtd () {
      let rangeData = []
      this.labels.forEach((label) => {
        rangeData.push(this.rangeData[label] || 0)
      })
      return {
        data: rangeData,
        label: 'PageView'
      }
    }
  },
  data () {
    return {
      url: 'pv',
      daterange: getDateToNow(7),
      rangeData: {},
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            picker.$emit('pick', getDateToNow(7))
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            picker.$emit('pick', getDateToNow(30))
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            picker.$emit('pick', getDateToNow(90))
          }
        }]
      }
    }
  }
}
</script>

<style lang="css">
</style>

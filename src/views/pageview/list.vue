<template lang="pug">
.pageview
  .filter
    el-form
      el-form-item(label="时间范围")
        el-date-picker(v-model='daterange', type='daterange', @change="rangeChange", align='left', placeholder='选择日期范围', :picker-options='pickerOptions')
  el-tabs(v-model="currentTab")
    el-tab-pane(label='图表', name='first')
      p 今日数据统计
      p PV: {{pvData[0]}} UV: {{uvData[0]}}
      el-row
        el-col(:span="12")
          canvas(ref="pvChart")
        el-col(:span="12")
          canvas(ref="uvChart")
    el-tab-pane(label='详情', name='second')
      el-table(:data="pageData.data", border="", style="width: 100%" v-loading="listLoading")
        el-table-column(label="名称")
          template(scope="scope")
            a(:href="'https://diamondfsd.com' + scope.row.fullPath" target="_blank") {{scope.row.fullPath}}
        el-table-column(label="访问时间")
          template(scope="scope")
            span {{scope.row.createTime | datetime}}
        el-table-column(label="IP")
          template(scope="scope")
            span {{scope.row.ip + '@' + scope.row.location}}
        el-table-column(prop="userAgent" label="userAgent")
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
      this.loadPage()
      this.loadCount()
    }
  },
  methods: {
    rangeChange () {
      console.log('change-ranged')
    },
    loadCount (queryParams = this.queryParams) {
      this.$get('pv/pv-count', queryParams).then(({data}) => {
        this.rangeData = data
        this.renderChart()
      })
    },
    renderChart () {
      this.$nextTick(() => {
        let cxt = this.$refs.pvChart.getContext('2d')
        new Chart(cxt, {
          type: 'line',
          data: {
            labels: this.labels,
            datasets: [ this.pvDataCtd ]
          }
        })
        let uvCxt = this.$refs.uvChart.getContext('2d')
        new Chart(uvCxt, {
          type: 'line',
          data: {
            labels: this.labels,
            datasets: [ this.uvDataCtd ]
          }
        })
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
    dataAnalysis () {
      let data = {}
      this.rangeData.forEach(pv => {
        let timeKey = dateFormat(new Date(pv.createTime), 'yyyy-MM-dd')
        let ips = data[timeKey] || []
        ips.push(pv.ip)
        data[timeKey] = ips
      })
      return data
    },
    pvData () {
      return Object.values(this.dataAnalysis).map(ips => {
        return ips && ips.length
      })
    },
    uvData () {
      return Object.values(this.dataAnalysis).map(ips => {
        return new Set([...ips]).size
      })
    },
    labels () {
      return Object.keys(this.dataAnalysis)
    },
    uvDataCtd () {
      return {
        data: this.uvData,
        label: 'UV'
      }
    },
    pvDataCtd () {
      return {
        data: this.pvData,
        label: 'PV'
      }
    }
  },
  data () {
    return {
      url: 'pv',
      daterange: getDateToNow(7),
      currentTab: 'first',
      rangeData: [],
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

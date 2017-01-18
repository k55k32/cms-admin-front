<template lang="pug">
el-row.index-wrapper
  el-dialog(title="编辑", v-model="editDialog")
    edit(:data="editData" @save="save" v-loading="saveLoading")
  el-col.nav(:span="4")
    el-menu.nav-menu(theme='dark' , :default-active = "defaultItem.id" , :default-openeds="[defaultItem.parentId]" ,:router="true")
      .header-logo
        h2 Manager
      template(v-for="(item, index) in menuItems")
        el-menu-item( v-if="!item.children", :index="item.id" , :route="{name: item.name}") {{item.text}}
        el-submenu(:index="item.id" v-else)
          template(slot="title")
            i.el-icon-message
            | {{item.text}}
          el-menu-item(v-for="(child, index) in item.children", :index="child.id" , :route="{name: child.name}") {{child.text}}
  el-col.content(:span="20")
    .content-header
      header
        h2.title {{defaultItem.text || $route.title}}
        .user-operator
          span.operator(@click="showEdit")
            i.fa.fa-user
            span 个人信息
          router-link.operator(:to="{name: 'login', query: {logout: 'out'}}" tag="span")
            i.fa.fa-sign-out
            span 退出
    .content-body(v-loading="loadContent" element-loading-text="拼命加载中")
      .wrapper
        router-view
</template>

<script>
import menus from './menus'
import edit from './user/edit'
export default {
  components: {edit},
  created () {
    this.$router.beforeEach((to, from, next) => {
      this.loadContent = true
      next()
    })
    this.$router.afterEach(route => {
      this.loadContent = false
    })
  },
  methods: {
    showEdit () {
      this.editDialog = true
    },
    save (form) {
      this.$post('user/modify', {password: form.password})
      this.editDialog = false
    }
  },
  data () {
    return {
      menuItems: menus,
      lastItem: {},
      loadContent: false,
      editDialog: false,
      editData: { username: this.$store.state.user.username, password: '' }
    }
  },
  computed: {
    defaultItem () {
      let name = this.$route.name
      let defaultItem = {}
      this.menuItems.forEach(item => {
        if (item.name === name) {
          defaultItem = item
        } else if (item.children) {
          item.children.forEach(child => {
            if (child.name === name) {
              defaultItem = child
              defaultItem.parentId = item.id
            }
          })
        }
        if (defaultItem.name) return false
      })
      if (defaultItem.id) {
        this.lastItem = defaultItem
      }
      return this.lastItem
    }
  }
}
</script>

<style lang="less">
@import "../styles/base.less";
.index-wrapper{
  height: 100%;
  .nav, .nav-menu, .content{
    position: relative;
    height: 100%;
    border-radius: 0;
  }
}
.header-logo{
  color: #fff;
  height: @header-heigth;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
  &>img{
    height: 100%;
  }
}
.content-header{
  position: absolute;
  width: 100%;
  height: @header-heigth;
  padding: 0 10px;
  border-bottom: @border;
  header{
    display: flex;
    align-items: center;
    height: 100%;
    .title{
      flex: 1;
    }
  }
}
.content-body{
  padding-top: @header-heigth;
  height: 100%;
  .el-loading-mask{
    background: rgba(255, 255, 255, .2);
  }
  .wrapper{
    padding: 10px;
    height: 100%;
    overflow-y: auto;
  }
}
.user-operator{
  .operator + .operator{
    margin-left: 15px;
  }
  .operator{
    display: inline-block;
    cursor: pointer;
  }
}
</style>

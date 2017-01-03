<template lang="pug">
el-row.index-wrapper
  el-col.nav(:span="4")
    el-menu.nav-menu(theme='dark' , :default-active = "defaultItem.id" , :default-openeds="[defaultItem.parentId]" ,:router="true")
      .header-logo
        img(src="../assets/logo.png")
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
          router-link.fa.fa-sign-out(:to="{name: 'login', query: {logout: 'out'}}" tag="i") 退出
    .content-body
      .wrapper
        router-view
</template>

<script>
import menus from './menus'
export default {
  data () {
    return {
      menuItems: menus,
      lastItem: {}
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
  background: rgba(255, 255, 255, 0.1);
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
  .wrapper{
    padding: 10px;
    height: 100%;
    overflow-y: auto;
  }
}
.user-operator{
  &>.fa{
    cursor: pointer;
  }
}
</style>

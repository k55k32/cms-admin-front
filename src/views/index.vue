<template lang="jade">
el-row.index-wrapper
  el-col.nav(:span="4")
    el-menu.nav-menu(theme='dark' , :default-active = "defaultItem.id" , :default-openeds="[defaultItem.parentId]" ,:router="true")
      .header-logo LOGO
      template(v-for="(item, index) in menuItems")
        el-menu-item( v-if="!item.children", :index="item.id" , :route="{name: item.name}") {{item.text}}
        el-submenu(:index="item.id" v-else)
          template(slot="title")
            i.el-icon-message
            | {{item.text}}
          el-menu-item(v-for="(child, index) in item.children", :index="child.id" , :route="{name: child.name}") {{child.text}}
  el-col.content(:span="20")
    .content-header
      h2.title {{defaultItem.text || $route.title}}
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
}
.content-header{
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: @header-heigth;
  padding: 0 10px;
  border-bottom: @border;
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
</style>

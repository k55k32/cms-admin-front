<template lang="pug">
div
  el-form(label-position="top", :rules="rules", :model="form" ref="form")
    el-form-item(label="Name" prop="name")
      el-input(v-model="form.name")
    el-form-item(label="Type" prop="type")
      el-select(v-model="form.type")
        el-option(v-for="value,key in types", :label="value.text", :value="key | number")
    el-form-item(label="Value" prop="value")
      component(:is="types[form.type].componentName" v-model="form.value")
    el-form-item(label="Desc" prop="description")
      el-input(v-model="form.description")
    .el-dialog__footer
      el-button(type="default", @click="$emit('cancel')") 取消
      el-button(native-type="submit", type="primary", @click.prevent="saveAction") 保存
</template>

<script>
const TypeMap = {
  1: {text: '文本', componentName: 'el-input'},
  2: {text: 'Pug', componentName: 'pug-editor'}
}
export default {
  props: ['data'],
  components: {
    PugEditor (r) {
      require(['PugEditor'], r)
    }
  },
  data () {
    return {
      form: {name: '', value: '', type: 1, description: '', ...this.data},
      rules: {
        id: {required: true},
        data: {required: true}
      },
      types: TypeMap
    }
  },
  methods: {
    saveAction () {
      this.$emit('save', this.form)
    }
  }
}
</script>

<style lang="less">
</style>

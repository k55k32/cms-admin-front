<template lang="jade">
.markdown
  .markdown-wrapper
    .markdown-tool
      span.action-group
        i.iconfont.icon-bold(@click="doCode('**')" hotkey="ctrl+b")
        i.iconfont.icon-italic(@click="doCode('*')" hotkey="ctrl+i")
        i.iconfont.icon-underline(@click="doAction('<u></u>', 3)" hotkey="ctrl+u")
        i.iconfont.icon-shanchuxian2(@click="doCode('~~')" hotkey="ctrl+d")
        i.iconfont.icon-chain(@click="doAction('[Type Your Link Name](http://)', -1)" hotkey="ctrl+l")
        i.iconfont.icon-code(@click="toCode()")
        i.iconfont.icon-ellipsish(@click="doAction('\\n\\n---\\n\\n', 0, '')")
        i.iconfont.icon-quoteleft(@click="doAction('\\n> ', -1, '')")
      span.action-group
        i.iconfont.icon-mailreply
        i.iconfont.icon-mailforward
      span.action-group
        i.iconfont.icon-compress
        i.iconfont.icon-expand
    .markdown-content
      .content-wrapper
        textarea.markdown-editor(ref="editor" v-model="content" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" @keydown="keydown")
        .markdown-preview(v-html="preview")
</template>

<script>
import markdownIt from 'markdown-it'

function getEditorSelection (editor) {
  return {
    start: editor.selectionStart,
    end: editor.selectionEnd
  }
}

function setEditorRange (editor, start, length = 0) {
  editor.focus()
  editor.setSelectionRange(start, start + length)
}

const markdown = markdownIt({
  html: true
})
export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    keydown (e) {
      if (e.ctrlKey === true) {
        let code = e.key
        let hotkey = 'ctrl+' + code
        let el = this.$el.querySelector(`[hotkey='${hotkey}']`)
        if (el) {
          e.preventDefault()
          el.click()
        }
      }
    },
    toCode () {
      let select = this.getSelectStr()
      let code = '`'
      if (select.indexOf('\n') > -1) {
        code = '```'
      }
      this.doCode(code)
    },
    insertToEditor (actionBefore, actionAfter, defaultStr) {
      let editor = this.$refs.editor
      let {start, end} = getEditorSelection(editor)
      let {before, select, after} = this.selectedStr(start, end, defaultStr)
      let newInsert = actionBefore + select + actionAfter
      this.content = before + newInsert + after
      this.$nextTick(() => {
        setEditorRange(editor, start + actionBefore.length, select.length)
      })
    },
    doAction (action, relativeEnd = 0, dstr) {
      if (relativeEnd <= 0) relativeEnd = action.length + relativeEnd
      let actionBefore = action.substr(0, relativeEnd)
      let actionAfter = action.substr(relativeEnd)
      this.insertToEditor(actionBefore, actionAfter, dstr)
    },
    doCode (code, dstr) {
      this.insertToEditor(code, code, dstr)
    },
    getSelectStr () {
      let editor = this.$refs.editor
      let {start, end} = getEditorSelection(editor)
      let {select} = this.selectedStr(start, end)
      return select
    },
    selectedStr (start, end, defaultStr = 'default') {
      let before = this.content.substr(0, start)
      let select = this.content.substr(start, end - start) || defaultStr
      let after = this.content.substr(end, this.content.length)
      return {before, select, after}
    }
  },
  computed: {
    preview () {
      return markdown.render(this.content)
    }
  }
}
</script>

<style lang="less">
@import "./styles/iconfont/iconfont.css";
.markdown-editor{
  border: 0;
  outline: 0;
  resize: none;
  border-right: 1px solid #eee;
}
.markdown-tool{
  padding: 10px;
  .action-group{
    margin-right: 25px;
  }
  .iconfont{
    font-size: 1.5em;
    padding: 15px;
  }
}
.markdown{
  background: #eee;
  height: 100%;
  .markdown-wrapper{
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .markdown-content{
    position: relative;
    flex: 1;
    .content-wrapper{
      position: absolute;
      height: 100%;
      width: 100%;
      display: flex;
      &>*{
        position: relative;
        flex: 1;
        box-sizing: border-box;
        padding: 10px;
        background: #fff;
      }
    }
  }
}
</style>

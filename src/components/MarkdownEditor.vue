<template lang="jade">
.markdown
  .markdown-wrapper
    .markdown-tool
      i(@click="doCode('**')") B
      i I
      i(@click="doAction('[link](http://)', 0, -1)") Link
    .markdown-content
      .content-wrapper
        textarea.markdown-editor(ref="editor" v-model="content" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off")
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

function setEditorRange (editor, start, end = start) {
  editor.focus()
  editor.setSelectionRange(start, end)
}

const markdown = markdownIt()
export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    doAction () {
      // TODO this ~~
    },
    doCode (code, defaultStr = 'default') {
      let editor = this.$refs.editor
      let {start, end} = getEditorSelection(editor)
      let beforeStr = this.content.substr(0, start)
      let selectStr = this.content.substr(start, end - start) || defaultStr
      let afterStr = this.content.substr(end, this.content.length)
      selectStr = code + selectStr + code
      this.content = beforeStr + selectStr + afterStr
      this.$nextTick(() => {
        setEditorRange(editor, start + code.length, start + selectStr.length - code.length)
      })
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
.markdown-editor{
  border: 0;
  outline: 0;
  resize: none;
  border-right: 1px solid #eee;
}
.markdown{
  background: #eee;
  height: 100%;
  .markdown-tool{
    padding: 10px;
    &>i{
      margin-right: 10px;
    }
  }
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
        flex: 1;
        box-sizing: border-box;
        padding: 10px;
        background: #fff;
      }
    }
  }
}
</style>

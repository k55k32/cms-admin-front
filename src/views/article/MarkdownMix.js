import 'highlightjs/styles/github.css'

export default {
  data () {
    return {
      MarkdownOptions: {}
    }
  },
  mounted () {
    require.ensure(['highlightjs'], require => {
      let hljs = require('highlightjs')
      this.MarkdownOptions = {
        ...this.MarkdownOptions,
        highlight (str, lang) {
          lang = lang || 'javascript'
          if (hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value
            } catch (__) {}
          }
          return ''
        }
      }
    })
  }
}

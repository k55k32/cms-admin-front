import lex from 'pug-lexer'
import parse from 'pug-parser'
import wrap from 'pug-runtime/wrap'
import generateCode from 'pug-code-gen'

exports.render = (str, opts) => {
  let templateName = 'template'
  let funcStr = generateCode(parse(lex(str)), {
    // compileDebug: false,
    pretty: true,
    indents: 2,
    // inlineRuntimeFunctions: false,
    templateName: templateName,
    ...opts
  })
  return wrap(funcStr, templateName)()
}

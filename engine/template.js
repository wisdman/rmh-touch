
//const NEWLINE_RX = /[\s\t]*[\r\n]+[\s\t]*/gm
const COMMENT_RX = /<!--(.*?)-->/gm

const EXP_RX = /\[\[((?:.|[\r\n\s\t])*?)\]\]/gm
const INC_RX = /\[@(\w+)\(([^)]*?)\)[\r\n\s\t]*?\]/gm

const RND_VAR = () => `$${Math.random().toString(36).substring(2)}`
const NAME = name => name.toLowerCase().replace(/\W+/gm, "")

export class Template extends Function {
  static instances = new Map()

  static get = name => {
    return arg => (Template.instances.get(name) ?? (() => ""))(arg)
  }

  static set = (name, tplStr) => {
    const tpl = new Template(tplStr)
    Template.instances.set(NAME(name), tpl)
    return tpl
  }

  constructor(tplStr = "") {
    let incFns = new Set()

    const rndVar = RND_VAR()
    const fnBody = `let ${rndVar} = \``
                 + tplStr
                    .replace(COMMENT_RX, "") // remove comments
                    //.replace(NEWLINE_RX, "") // remove new lines
                    .replace(INC_RX, (_, $1, $2) => { // build include fn
                      $1 = NAME($1)
                      incFns.add($1)
                      $2 = $2.trim()
                      return `\`; ${rndVar} += ${$1}(${$2 || "this"}); ${rndVar} += \``
                    })
                    .replace(EXP_RX, `\`; $1; ${rndVar} += \``) // build expressions
                 + `\`; return ${rndVar}`
    
    incFns = incFns.values()
    super(...incFns, fnBody)

    const _this = this
    const fn = function(arg) { return _this.apply(arg, incFns.map(name => Template.get(name))) }
    return Object.setPrototypeOf(fn, new.target.prototype)
  }
}


const NEWLINE_RX = /[\s\t]*[\r\n]+[\s\t]*/gm
const COMMENT_RX = /<!--(.*?)-->/gm

const EXP_RX = /\[\[((?:.|[\r\n\s\t])*?)\]\]/gm
const INC_RX = /\[@(\w+) ] /gm

const RND_VAR = () => `$${Math.random().toString(36).substring(2)}`

export class Template extends Function {
  static instances = {}

  constructor(name, tplStr = "") {
    const rndVar = RND_VAR()
    const fnBody = `let ${rndVar} = \``
                 + tplStr
                    .replace(COMMENT_RX, "") // remove comments
                    .replace(NEWLINE_RX, "") // remove new lines
                    .replace(EXP_RX, `\`; $1; ${rndVar} += \``) // build expressions
                 + `\`; return ${rndVar}`
    super(fnBody)
    const _this = this
    const fn = function(arg) { return _this.apply(arg) }
    return Object.setPrototypeOf(fn, new.target.prototype)
  }
}

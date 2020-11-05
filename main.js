
import fs from "node:fs/promises"
import { Template } from "./engine/template.js"

// class Template extends Function {
//   constructor(tpl) {
//     const rnd = Math.random().toString(36).substring(2)

//     tpl = tpl.replace(/\[\[((?:.|[\r\n\s\t])*?)\]\]/gm, "`; $1; $str += `")
//     tpl = "let $str = `" + tpl + "`; return $str"
//     super(tpl)
//   }
// }


void async function main() {
  let data = await fs.readFile("templates/index.tpl", "utf8")
  const tpl = new Template(data)
  console.log(tpl.toString())
  console.log(tpl([1,2,3,4]))
  //data = data.replace(/\[\[((?:.|[\r\n\s\t])*?)\]\]/gm, "` $1; $str += `")
  //console.log(data)
}()


// class Callable extends Function {
//   constructor() {
//     var closure = function(...args) {
//       return closure._call(...args)
//     }
//     return Object.setPrototypeOf(closure, new.target.prototype)
// } _call(...args) { console.log(this, args) } }




// const fn1 = function() {
//   const fn0 = function() {
//     console.dir(this)
//   }
//   return fn0.apply({a:10})
// }

// fn1()
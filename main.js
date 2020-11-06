
import path from "node:path"
import fs from "node:fs/promises"
import { Template } from "./engine/template.js"
import { StyleBuilder } from "./engine/styles.js"

const DIRNAME = path.resolve(path.dirname(""))
const PATH = (...p) => path.resolve(DIRNAME, ...p)
const TPL_DIR = PATH("./template")

async function copyScripts() {

}

async function templateEngine() {
  const files = await fs.readdir(TPL_DIR)
  for (const file of files) {
    if (path.extname(file).toLowerCase() !== ".tpl") continue
    const filePath = path.resolve(TPL_DIR, file)
    if (!(await fs.lstat(filePath)).isFile()) continue
    const { name } = path.parse(filePath)
    const tplStr = await fs.readFile("template/index.tpl", "utf8")
     Template.set(name, tplStr)
  }
}

void async function main() {
  await copyScripts()
  await templateEngine()
}()



//console.log(DIRNAME)
//console.log(PATH("./template"))

// void async function main() {
//   const files = await fs.promises.readdir(path);



//   let data = await fs.readFile("template/index.tpl", "utf8")
//   console.log(data)
//   const tpl = Template.set("index", data)
//   console.log(tpl.toString())
//   //console.log(tpl([1,2,3,4]))
//   //data = data.replace(/\[\[((?:.|[\r\n\s\t])*?)\]\]/gm, "` $1; $str += `")
//   //console.log(data)
// }()

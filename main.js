
import path from "node:path"
import fs from "node:fs/promises"
import { Template } from "./engine/template.js"
import { StyleBuilder } from "./engine/styles.js"

const DIRNAME = path.resolve(path.dirname(""))
const PATH = (...p) => path.resolve(DIRNAME, ...p)
const TPL_DIR = PATH("./template")

const styleBuilder = new StyleBuilder(TPL_DIR)

async function scripts() {

}

async function assets() {

}

async function templateEngine() {
  const files = await fs.readdir(TPL_DIR)
  for (const file of files) {
    const filePath = path.resolve(TPL_DIR, file)
    const { name, ext } = path.parse(filePath)
    if (ext.toLowerCase() !== ".tpl") continue
    if (!(await fs.lstat(filePath)).isFile()) continue
    let tplStr = await fs.readFile(filePath, "utf8")
    tplStr = await styleBuilder.buildHTML(tplStr)
    Template.set(name, tplStr)
  }
}

void async function main() {
  await Promise.all([scripts(), assets()])
  await templateEngine()
}()

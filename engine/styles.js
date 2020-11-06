import path from "node:path"

const LINK_RX = /<link([^>]+)href=(?:\"([\w\/%:-]+\.s?css)\")([^>]*)>/gm

export class StyleBuilder {
  #root = undefined
  #cache = new Map()

  constructor(root = "./") {
    this.#root = path.resolve(root)
  }

  buildFile = path => {

  }

  buildHTML = tplStr => {
    tplStr.replace(LINK_RX, (_, $1, $2, $3) => {
      console.log($2)
      return `<link${$1}href=""${$3}>`
    })
  }
}

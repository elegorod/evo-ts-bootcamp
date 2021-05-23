import csvjson from "csvjson"
import EventEmitter from "events"
import fs from "fs"
import fsPromises from "fs/promises"
import prettyjson from "prettyjson"
import { DirWatcherEvent } from "./DirWatcher"

export default class Importer {

  constructor(public eventEmitter: EventEmitter) {
  }

  listen() {
    this.eventEmitter.on(DirWatcherEvent.Added, (paths: string[]) => this.printFiles("[EVENT] FILE ADDED", paths))
    this.eventEmitter.on(DirWatcherEvent.Deleted, (paths: string[]) => console.log("[EVENT] FILES DELETED", paths))
    this.eventEmitter.on(DirWatcherEvent.Modified, (paths: string[]) => this.printFiles("[EVENT] FILE MODIFIED", paths))
  }

  private printFiles = async (prefix: string, paths: string[]) => {
    paths.forEach(path => {
      this.importCsv(path)
        .then(json => {
          console.log(prefix, path)
          console.log(json)
        })
        .catch(error => console.log("[ERROR] Cannot import file", error))
    })
  }

  importCsv = async (path: string) => {
    const text = await fsPromises.readFile(path, {encoding: "utf8"})
    const data = csvjson.toObject(text)
    return prettyjson.render(data)
  }

  importCsvSync = (path: string) => {
    const text = fs.readFileSync(path, {encoding: "utf8"})
    const data = csvjson.toObject(text)
    return prettyjson.render(data)
  }

}

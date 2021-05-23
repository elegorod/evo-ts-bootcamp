import EventEmitter from "events"
import path from "path"
import DirWatcher from "./DirWatcher"
import Importer from "./Importer"

const eventEmitter = new EventEmitter()
const watcher = new DirWatcher(eventEmitter)
const importer = new Importer(eventEmitter)

console.log("Importing synchroniously Planets.csv")
console.log(importer.importCsvSync("data" + path.sep + "Planets.csv"))
importer.listen()
watcher.watch("data", 3000)

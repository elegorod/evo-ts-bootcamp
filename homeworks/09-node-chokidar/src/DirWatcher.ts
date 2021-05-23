import { EventEmitter } from "events"
import fs from "fs/promises"
import path from "path"

export enum DirWatcherEvent {
  Added = "Added",
  Deleted = "Deleted",
  Modified = "Modified"
}

interface FileInfo {
  path: string,
  modified: number
}

export default class DirWatcher {

  path?: string
  delayMs: number = 5000
  fileInfos: FileInfo[] = []

  constructor(public eventEmitter: EventEmitter) {
  }

  watch(path: string, delayMs: number) {
    this.path = path
    this.delayMs = delayMs
    this.check()
  }

  private check = async () => {
    if (this.path) {
      try {
        const files = await this.listFiles(this.path)
        this.compare(files)
        this.fileInfos = files
        setTimeout(this.check, this.delayMs)
      } catch (error) {
        console.error("Error during checking directory", error)
      }
    } else {
      console.error("Cannot check directory because path is null")
    }
  }

  private listFiles = async (dirPath: string) => {
    const dir = await fs.opendir(dirPath)
    const files: FileInfo[] = []
    for await (const dirent of dir) {
      if (dirent.isFile() && dirent.name.toLowerCase().endsWith(".csv")) {
        const filePath = this.path + path.sep + dirent.name
        const stat = await fs.stat(filePath)
        files.push({
          path: filePath,
          modified: stat.mtimeMs
        })
      }
    }
    return files
  }

  private compare = (files: FileInfo[]) => {
    const prevFiles = this.fileInfos
    const added = files.filter(file => !prevFiles.some(_ => _.path === file.path)).map(_ => _.path)
    const deleted = prevFiles.filter(file => !files.some(_ => _.path === file.path)).map(_ => _.path)
    const modified = files.filter(file => {
      const f = prevFiles.find(_ => _.path === file.path)
      return f ? file.modified !== f.modified : false
    }).map(_ => _.path)
    
    if (added.length > 0) {
      this.eventEmitter.emit(DirWatcherEvent.Added, added)
    }
    if (deleted.length > 0) {
      this.eventEmitter.emit(DirWatcherEvent.Deleted, deleted)
    }
    if (modified.length > 0) {
      this.eventEmitter.emit(DirWatcherEvent.Modified, modified)
    }
  }

}

import fs from "fs";
import EventEmitter from "events";
import chokidar from "chokidar";

export default class DirWatcher extends EventEmitter {
  watch(path, delay) {
    const watcher = chokidar.watch(path, { usePolling: true, interval: delay });
    watcher.on("add", filename => this.emit("dirwatcher:changed", filename));
  }
}

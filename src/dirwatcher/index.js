import fs from "fs";
import EventEmitter from "events";

export default class DirWatcher extends EventEmitter {
  watch(path, delay) {
    const watcher = fs.watch(path, (eventType, filename) => {
      if (eventType === "rename") {
        setTimeout(() => {
          this.emit("dirwatcher:changed", filename);
        }, delay);
      }
    });
  }
}

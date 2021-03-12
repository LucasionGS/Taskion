import * as Electron from "electron";
import Dashboard from "./controls/Dashboard";
import Header from "./Header";
import Task from "./objects/Task";
const {
  remote,
  remote: {
    app,
  }
} = Electron;
let win = remote.getCurrentWindow();

win.setSize(800, 600);
// win.on("blur", () => win.hide()); // Close window when not in focus

Header.setup();

// Global Elements
let dashboard = new Dashboard();

function reloadTasks() {
  let tasks = Task.getTasks();
  dashboard.setTasks(tasks);
  return tasks;
}

(async () => {
  // Load tasks
  reloadTasks();
})();
import Electron from "electron";
import Dashboard from "./controls/Dashboard";
import Header from "./Header";
import Settings from "./objects/Settings";
import Task from "./objects/Task";
const {
  remote,
  remote: {
    app,
  }
} = Electron;
let win = remote.getCurrentWindow();

// win.setSize(800, 600);
let settings = new Settings();
// win.on("blur", () => win.hide()); // Close window when not in focus

Header.setup(true);

// Global Elements
let dashboard = new Dashboard();
dashboard.addEventsToButtons();

function reloadTasks() {
  let tasks = Task.getTasks();
  dashboard.setTasks(tasks);
  return tasks;
}

Promise.resolve().then(async () => {
  // Load tasks
  reloadTasks();
});
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Electron = require("electron");
const Dashboard_1 = require("./controls/Dashboard");
const Header_1 = require("./Header");
const Settings_1 = require("./objects/Settings");
const Task_1 = require("./objects/Task");
const { remote, remote: { app, } } = Electron;
let win = remote.getCurrentWindow();
// win.setSize(800, 600);
let settings = new Settings_1.default();
// win.on("blur", () => win.hide()); // Close window when not in focus
Header_1.default.setup(true);
// Global Elements
let dashboard = new Dashboard_1.default();
dashboard.addEventsToButtons();
function reloadTasks() {
    let tasks = Task_1.default.getTasks();
    dashboard.setTasks(tasks);
    return tasks;
}
Promise.resolve().then(() => __awaiter(void 0, void 0, void 0, function* () {
    // Load tasks
    reloadTasks();
}));

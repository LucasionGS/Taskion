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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __importDefault(require("electron"));
const Dashboard_1 = __importDefault(require("./controls/Dashboard"));
const Header_1 = __importDefault(require("./Header"));
const Settings_1 = __importDefault(require("./objects/Settings"));
const Task_1 = __importDefault(require("./objects/Task"));
const { remote, remote: { app, } } = electron_1.default;
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

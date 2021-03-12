"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Electron = require("electron");
const shell = Electron.remote.shell;
var TaskActions;
(function (TaskActions) {
    function OpenItem({ path }) {
        shell.openPath(path);
    }
    TaskActions.OpenItem = OpenItem;
    function OpenWeb({ url }) {
        shell.openExternal(url);
    }
    TaskActions.OpenWeb = OpenWeb;
})(TaskActions || (TaskActions = {}));
exports.default = TaskActions;

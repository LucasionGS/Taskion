"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const OpenItem = {
    name: "Open Item",
    identifier: "OpenItem",
    parameters: [{
            name: "File/Folder path",
            type: "file",
            inputId: "path"
        }],
    action({ path }) {
        electron_1.shell.openPath(path);
    }
};
exports.default = OpenItem;

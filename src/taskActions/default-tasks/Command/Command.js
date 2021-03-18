"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const cp = require("child_process");
const OpenItem = {
    name: "Command",
    identifier: "Command",
    parameters: [
        {
            name: "Command",
            type: "text",
            inputId: "cmd",
        },
        {
            name: "Working Directory",
            type: "text",
            inputId: "cwd",
            defaultValue: os.homedir()
        },
    ],
    action({ cwd, cmd, showTerminal }) {
        cp.exec(cmd, {
            cwd: cwd || os.homedir()
        });
    }
};
exports.default = OpenItem;

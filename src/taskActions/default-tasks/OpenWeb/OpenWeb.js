"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const OpenItem = {
    name: "Open Web",
    identifier: "OpenWeb",
    parameters: [
        {
            name: "URL (Opens in default browser)",
            type: "text",
            inputId: "url",
            defaultValue: "https://"
        }
    ],
    action({ url }) {
        electron_1.shell.openExternal(url);
    }
};
exports.default = OpenItem;

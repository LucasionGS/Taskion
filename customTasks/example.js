"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const task = {
    name: "Write file",
    parameters: [
        {
            name: "File Path",
            inputId: "filePath",
            type: "file",
        },
        {
            name: "Text to insert",
            inputId: "text",
            type: "text",
        },
        {
            name: "Repeat number of times",
            inputId: "repeat",
            type: "number",
            defaultValue: 1
        }
    ],
    action({ filePath, text, repeat }) {
        fs_1.writeFileSync(filePath, (text + repeat + "\n").repeat(repeat));
    }
};
exports.default = task;

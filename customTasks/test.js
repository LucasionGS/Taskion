"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task = {
    action({ text }) {
        alert(text);
    },
    name: "Alert",
    parameters: [
        {
            name: "Text to alert",
            inputId: "text",
            type: "text"
        }
    ]
};
exports.default = task;

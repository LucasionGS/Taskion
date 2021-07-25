"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModal_1 = __importDefault(require("../../../modals/BaseModal"));
const HTTPRequest = {
    name: "HTTP Request",
    identifier: "HTTPRequest",
    parameters: [
        {
            name: "URL",
            type: "text",
            inputId: "url",
            defaultValue: "https://"
        },
        {
            name: "Method",
            type: "text",
            inputId: "method",
            defaultValue: "GET"
        },
        {
            name: "Body",
            type: "textarea",
            inputId: "body",
            defaultValue: ""
        },
        {
            name: "Show response",
            type: "checkbox",
            inputId: "showResponse",
            defaultValue: false
        },
        {
            name: "Show errors",
            type: "checkbox",
            inputId: "showErrors",
            defaultValue: true
        },
    ],
    action({ url, method, body, showResponse, showErrors, }) {
        fetch(url, {
            method,
            body: method.toLowerCase() == "post" || method.toLowerCase() == "PUT" ? (((body.trimStart().startsWith("{") && body.trimEnd().endsWith("}"))
                || (body.trimStart().startsWith("[") && body.trimEnd().endsWith("]"))) ? body : JSON.stringify(body)) : null
        }).then(response => {
            if (response.ok) {
                return response.text();
            }
            else {
                throw new Error(response.statusText);
            }
        }).then(text => {
            console.log(text);
            if (showResponse) {
                let popup = new BaseModal_1.default(text, true, {
                    title: url,
                    frame: true,
                    transparent: false
                }).open();
            }
        }).catch(error => {
            console.error(error);
            if (showErrors)
                alert(error);
        });
    }
};
exports.default = HTTPRequest;

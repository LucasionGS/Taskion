"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Electron = __importStar(require("electron"));
var Header;
(function (Header) {
    let win = Electron.remote.getCurrentWindow();
    function setupCloseButtonFunctionality(btn, hideOnClose = false) {
        btn.addEventListener("click", e => {
            if (!hideOnClose) {
                win.close();
            }
            else {
                if (e.ctrlKey) {
                    if (confirm("Do you want to quit Taskion?")) {
                        win.close();
                    }
                    else {
                        setTimeout(() => {
                            win.show();
                        }, 0);
                    }
                }
                else {
                    win.hide();
                }
            }
        });
    }
    Header.setupCloseButtonFunctionality = setupCloseButtonFunctionality;
    function setup(hideInsteadOfClose = false) {
        // Setup buttons
        let buttons = [...document.querySelectorAll("header .header-button")];
        for (let i = 0; i < buttons.length; i++) {
            const b = buttons[i];
            let action = b.getAttribute("data-action");
            switch (action) {
                case "close":
                    setupCloseButtonFunctionality(b, hideInsteadOfClose);
                    break;
            }
        }
    }
    Header.setup = setup;
})(Header || (Header = {}));
exports.default = Header;

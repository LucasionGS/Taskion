"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Electron = require("electron");
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

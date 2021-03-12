"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Electron = require("electron");
var Header;
(function (Header) {
    let win = Electron.remote.getCurrentWindow();
    function setupCloseButtonFunctionality(btn, hideInsteadOfClose = false) {
        btn.addEventListener("click", e => {
            if (hideInsteadOfClose) {
                Electron.remote.app.quit();
            }
            else {
                if (e.ctrlKey) {
                    if (confirm("Do you want to quit Taskion?")) {
                        Electron.remote.app.quit();
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

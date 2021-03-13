import { setupMaster } from "cluster";
import * as Electron from "electron";

namespace Header {
  let win = Electron.remote.getCurrentWindow();
  export function setupCloseButtonFunctionality(btn: HTMLElement, hideOnClose = false) {
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

  export function setup(hideInsteadOfClose = false) {
    // Setup buttons
    let buttons = [...(document.querySelectorAll<HTMLDivElement>("header .header-button") as any as HTMLDivElement[])];
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
}

export default Header;
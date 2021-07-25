import { shell } from "electron";
import BaseModal from "../../../modals/BaseModal";
import { ITaskBuildInTemplate } from "../../iTaskAction";

const HTTPRequest: ITaskBuildInTemplate = {
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
  action(
    {
      url,
      method,
      body,
      showResponse,
      showErrors,
    } : {
      url: string,
      method: string,
      body: string,
      showResponse: boolean,
      showErrors: boolean,
    }) {
    fetch(url, {
      method,
      body: method.toLowerCase() == "post" || method.toLowerCase() == "PUT" ? ((
        (body.trimStart().startsWith("{") && body.trimEnd().endsWith("}"))
        || (body.trimStart().startsWith("[") && body.trimEnd().endsWith("]"))
      ) ? body : JSON.stringify(body)) : null
    }).then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(response.statusText);
      }
    }).then(text => {
      console.log(text);
      if (showResponse) {
        let popup = new BaseModal(text, true, {
          title: url,
          frame: true,
          transparent: false
        }).open();
      }
    }).catch(error => {
      console.error(error);
      if (showErrors) alert(error);
    });
  }
}
export default HTTPRequest;
// import TaskActionStartProgram from "./actions/StartProgram";

export enum TaskActionEnum {
  None = "",
  Custom = "Custom",
  OpenWeb = "OpenWeb",
  OpenItem = "OpenItem",
}

export const taskActionParameters: {[key: string]: TaskActionParameters[]} = {
  [TaskActionEnum.OpenItem]: [{
    name: "Folder path",
    type: "text",
    inputId: "path"
  }],
  [TaskActionEnum.OpenWeb]: [
    {
      name: "URL to open",
      type: "text",
      inputId: "url",
      defaultValue: "https://"
    }
  ]
}

export interface TaskActionParameters {
  name: string,
  type: "number" | "text",
  inputId: string,
  defaultValue?: number | string,
}
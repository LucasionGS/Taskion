import { ITaskTemplate } from "../src/taskActions/iTaskAction";

const task: ITaskTemplate = {
  action({text}) {
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
}
export default task;
import { ICustomTask } from "../src/taskActions/iTaskAction";

const task: ICustomTask = {
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
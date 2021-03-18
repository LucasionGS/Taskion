import { ITaskTemplate } from "../src/taskActions/iTaskAction";
import { writeFileSync } from "fs";

const task: ITaskTemplate = {
  name: "Write file",
  parameters: [
    {
      name: "File Path",
      inputId: "filePath",
      type: "file",
    },
    {
      name: "Text to insert",
      inputId: "text",
      type: "text",
    },
    {
      name: "Repeat number of times",
      inputId: "repeat",
      type: "number",
      defaultValue: 1
    }
  ],
  action({
    filePath,
    text,
    repeat
  } : {
    filePath: string,
    text: string,
    repeat: number
  }) {
    writeFileSync(filePath, (text + repeat + "\n").repeat(repeat));
  }
}
export default task;
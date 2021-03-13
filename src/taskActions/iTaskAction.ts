export interface ICustomTask {
  name: string;
  action(parameters: {[key: string]: TaskActionParameter["defaultValue"]}): void;
  parameters?: TaskActionParameter[];
}

export interface ICustomTaskWithRef extends ICustomTask {
  ref: string;
}

interface BaseTaskActionParameter {
  name: string,
  type: "number" | "text" | "checkbox",
  inputId: string,
  defaultValue?: number | string | boolean,
}
interface TaskActionNumberParameter extends BaseTaskActionParameter {
  type: "number",
  defaultValue?: number,
}
interface TaskActionTextParameter extends BaseTaskActionParameter {
  type: "text",
  defaultValue?: string,
}
interface TaskActionBoolParameter extends BaseTaskActionParameter {
  type: "checkbox",
  defaultValue?: boolean,
}
export type TaskActionParameter = TaskActionNumberParameter | TaskActionTextParameter | TaskActionBoolParameter;
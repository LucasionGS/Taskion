export interface ITaskTemplate {
    name: string;
    action(parameters: {
        [key: string]: TaskActionParameter["defaultValue"];
    }): void;
    parameters?: TaskActionParameter[];
}
export interface ITaskBuildInTemplate extends ITaskTemplate {
    identifier: string;
}
export interface ITaskTemplateWithRef extends ITaskTemplate {
    ref: string;
}
interface BaseTaskActionParameter {
    name: string;
    type: "number" | "text" | "checkbox" | "file";
    inputId: string;
    defaultValue?: number | string | boolean;
}
interface TaskActionNumberParameter extends BaseTaskActionParameter {
    type: "number";
    defaultValue?: number;
}
interface TaskActionTextParameter extends BaseTaskActionParameter {
    type: "text";
    defaultValue?: string;
}
interface TaskActionBoolParameter extends BaseTaskActionParameter {
    type: "checkbox";
    defaultValue?: boolean;
}
interface TaskActionFileParameter extends BaseTaskActionParameter {
    type: "file";
    defaultValue?: boolean;
}
export declare type TaskActionParameter = [
    TaskActionNumberParameter,
    TaskActionTextParameter,
    TaskActionBoolParameter,
    TaskActionFileParameter
][number];
export {};

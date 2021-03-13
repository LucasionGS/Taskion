export interface ICustomTask {
    action(): void;
}
interface BaseTaskActionParameter {
    name: string;
    type: "number" | "text" | "checkbox";
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
export declare type TaskActionParameter = TaskActionNumberParameter | TaskActionTextParameter | TaskActionBoolParameter;
export {};

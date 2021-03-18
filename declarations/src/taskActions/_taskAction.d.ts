import { TaskActionParameter } from "./iTaskAction";
/**
 * Enum value of Task Action Types
 */
export declare enum TaskActionType {
    None = "",
    OpenItem = "OpenItem",
    OpenWeb = "OpenWeb",
    Command = "Command",
    CreateNewTask = "CreateNewTask"
}
export declare function taskActionName(tae: TaskActionType): "None" | "Open Item" | "Open Website" | "Command line" | "Create New Task";
export declare const taskActionParameters: {
    [key: string]: TaskActionParameter[];
};
export declare namespace TaskActions {
    function OpenItem({ path }: {
        path: string;
    }): void;
    function OpenWeb({ url }: {
        url: string;
    }): void;
    function CreateNewTask(): void;
    function Command({ cwd, cmd, showTerminal }: {
        cwd: string;
        cmd: string;
        showTerminal: boolean;
    }): void;
}

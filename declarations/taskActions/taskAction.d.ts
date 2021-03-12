export declare enum TaskActionEnum {
    None = "",
    Custom = "Custom",
    OpenWeb = "OpenWeb",
    OpenItem = "OpenItem"
}
export declare const taskActionParameters: {
    [key: string]: TaskActionParameters[];
};
export interface TaskActionParameters {
    name: string;
    type: "number" | "text";
    inputId: string;
    defaultValue?: number | string;
}

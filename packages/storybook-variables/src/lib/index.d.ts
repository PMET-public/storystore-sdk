export declare type StateValues = {
    [key: string]: any;
};
export declare type State = {
    [storyId: string]: StateValues;
};
export declare type Fields = {
    [key: string]: {
        label?: string;
        defaultValue: string;
    };
};
export declare type Params = {
    title?: string;
    fields: Fields;
};
export declare const ADDON_ID = "storybook-variables";
export declare const STORYBOOK_VARIABLES = "storybook-variables";
export declare const useDefaultValuesFromParams: (params: Params) => Fields;
export declare const useStoryStateVariables: (params: Params) => any[];
export declare const useVariables: () => any;

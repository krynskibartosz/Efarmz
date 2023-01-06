/* eslint-disable @typescript-eslint/no-explicit-any */
export type STR_NUM = string | number;

export type INPUT_FCT = (name: STR_NUM | STR_NUM[]) => INPUT;

export type INPUT = {
    attempted?: boolean;
    error?: any;
    value?: any;
    setValue?: any;
    form?: any;
};

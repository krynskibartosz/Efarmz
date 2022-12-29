import { ReactNode } from 'react';

export type STR_NUM = string | number;

export type INPUT_FCT = (name: STR_NUM | STR_NUM[]) => INPUT;

export type INPUT = {
    attempted?: boolean;
    error?: any;
    value?: any;
    setValue?: any;
    form?: any;
};

type FORM_CHILDREN = {
    inputProps: INPUT_FCT;
    body: any;
    errors: any;
    handleSubmit: () => void;
    changes: any;
    isUpdated: boolean;
};
export interface FORM {
    initialBody: any;
    reset?: any;
    children: (data: FORM_CHILDREN) => ReactNode;
    submit: (body: any) => void;
    schema?: any;
    noSubmit?: boolean;
    updated?: boolean;
    showLogs?: boolean;
    className?: string;
    name: string;
    id: string;
    form: string;
}

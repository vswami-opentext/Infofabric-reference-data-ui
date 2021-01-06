export declare class FormField {
    value?: any;
    name: string;
    label?: string;
    order?: number;
    type: string;
    options?: any[];
    optionsKey?: string;
    optionsLabel?: string;
    selectedOptionMsg?: string;
    readonly?: boolean;
    disabled?: boolean;
    pattern?: string;
    required?: boolean;
    minlength?: number;
    maxlength?: number;
    validationMessages?: Validator;
}
export declare class Validator {
    pattern?: string;
    required?: string;
    minlength?: string;
    maxlength?: string;
}

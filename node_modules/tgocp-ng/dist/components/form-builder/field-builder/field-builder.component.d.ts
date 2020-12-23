import { AfterContentInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../form-field.entity';
export declare class FieldBuilderComponent implements AfterContentInit {
    scrollConfig: any;
    constructor();
    ngAfterContentInit(): void;
    rowClass: string;
    field: FormField;
    form: FormGroup;
    readOnly: boolean;
    isObjectType(valueType: any): boolean;
}

import { OnInit, AfterContentInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormField } from './form-field.entity';
export declare class FormBuilderComponent implements OnInit, AfterContentInit {
    private fb;
    private cdRef;
    formSchema: any;
    formData: any;
    readOnlyMode: boolean;
    formStyle: any;
    onFormSubmit: EventEmitter<any>;
    onFormReset: EventEmitter<any>;
    fields: FormField[];
    dynamicForm: FormGroup;
    constructor(fb: FormBuilder, cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    createFormControl(fieldData: FormField[]): FormGroup;
    submittedData(event: Event): void;
    resetData(): void;
    validateAllFormFields(formGroup: FormGroup): void;
}

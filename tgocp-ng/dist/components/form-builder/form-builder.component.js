var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
var FormBuilderComponent = /** @class */ (function () {
    function FormBuilderComponent(fb, cdRef) {
        this.fb = fb;
        this.cdRef = cdRef;
        this.onFormSubmit = new EventEmitter();
        this.onFormReset = new EventEmitter();
        this.fields = [];
    }
    FormBuilderComponent.prototype.ngOnInit = function () {
        this.dynamicForm = this.createFormControl(this.formSchema);
    };
    FormBuilderComponent.prototype.ngAfterContentInit = function () {
        if (this.formData) {
            this.dynamicForm.patchValue(this.formData);
            this.cdRef.detectChanges();
        }
    };
    FormBuilderComponent.prototype.createFormControl = function (fieldData) {
        var _this = this;
        var group = this.fb.group({});
        fieldData.forEach(function (field) {
            if (field.type === "button")
                return;
            //group[field.name] = new FormControl(field.value || '', Validators.required);
            var control = _this.fb.control(field.value || []);
            group.addControl(field.name, control);
        });
        return group;
    };
    FormBuilderComponent.prototype.submittedData = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.dynamicForm.invalid) {
            this.validateAllFormFields(this.dynamicForm);
        }
        else {
            //console.log(this.dynamicForm.value)
            // this.onFormSubmit.emit(this.dynamicForm.value);
        }
    };
    FormBuilderComponent.prototype.resetData = function () {
        this.dynamicForm.reset(this.formData);
    };
    FormBuilderComponent.prototype.validateAllFormFields = function (formGroup) {
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormBuilderComponent.prototype, "formSchema", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormBuilderComponent.prototype, "formData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FormBuilderComponent.prototype, "readOnlyMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormBuilderComponent.prototype, "formStyle", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FormBuilderComponent.prototype, "onFormSubmit", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FormBuilderComponent.prototype, "onFormReset", void 0);
    FormBuilderComponent = __decorate([
        Component({
            selector: 'ot-form-builder',
            template: "<form  [ngStyle]=\"formStyle\" [perfectScrollbar]=\"{suppressScrollX: true, minScrollbarLength:16}\" [formGroup]=\"dynamicForm\">\n\n  <div class=\"fields\">\n    <ng-container *ngFor=\"let field of formSchema\">\n      <field-builder [readOnly]=\"readOnlyMode\" [field]=\"field\" [form]=\"dynamicForm\"></field-builder>\n    </ng-container>\n  </div>\n\n  <!-- <div class=\"ot-row-custom ot-col-md-10\">\n     <button   class=\"ot-primary\" (click)=\"submittedData($event)\">Save</button>\n    <button   class=\"ot-secondary\" (click)=\"resetData()\">Reset</button> \n    <h5>Form Value</h5>\n  <pre>\n    {{dynamicForm.value | json}}\n  </pre>\n</div> -->\n\n</form>",
            styles: [":host::ng-deep .fieldClass{\r\n  margin-right: 2em;\r\n  margin-bottom: 1em;\r\n  /* height: 3.5em; */\r\n}\r\n:host::ng-deep .fieldClass>.ot-form-value-label{\r\n height : auto;\r\n}\r\n\r\n.fields{\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  margin-left: 1em;\r\n}\r\n\r\n.fields>* {\r\n  width: 45%\r\n}"]
        }),
        __metadata("design:paramtypes", [FormBuilder, ChangeDetectorRef])
    ], FormBuilderComponent);
    return FormBuilderComponent;
}());
export { FormBuilderComponent };
//# sourceMappingURL=form-builder.component.js.map
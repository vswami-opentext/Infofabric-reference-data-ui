var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgConstants } from '../../../shared/Ng.constants';
import { PSscrollUtils } from '../../../shared/perfect-scrollbar-config';
import { FormField } from '../form-field.entity';
var FieldBuilderComponent = /** @class */ (function () {
    function FieldBuilderComponent( /* private cdRef:ChangeDetectorRef */) {
        this.scrollConfig = PSscrollUtils.scrollY();
        /*  ngAfterViewChecked() {
           this.cdRef.detectChanges();
         } */
        this.rowClass = "ot-ui-helper-clearfix";
    }
    FieldBuilderComponent.prototype.ngAfterContentInit = function () {
        var name = this.field.name;
        if ((name.includes('email') || this.field.type == 'email') && (this.field.pattern == undefined || this.field.pattern.length < 2)) {
            this.field.pattern = NgConstants.emailRegEx;
        }
    };
    FieldBuilderComponent.prototype.isObjectType = function (valueType) {
        if (typeof valueType == 'object')
            return true;
        else
            return false;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FieldBuilderComponent.prototype, "rowClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormField)
    ], FieldBuilderComponent.prototype, "field", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], FieldBuilderComponent.prototype, "form", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FieldBuilderComponent.prototype, "readOnly", void 0);
    FieldBuilderComponent = __decorate([
        Component({
            selector: 'field-builder',
            template: "<div\u00A0[class]=\"rowClass\"  [formGroup]=\"form\" [ngSwitch]=\"field.type\" [ngClass]=\"{'fieldClass':true}\">\n  <label *ngIf=\"field?.label\" \u00A0class=\"ot-form-control-label\" [ngClass]=\"{'ot-required':field.required}\">\n    {{field.label}}</label>\n    <ng-container *ngIf=\"readOnly\">\n      <label *ngIf=\"!isObjectType(field.value)\" class=\"ot-form-value-label\"> {{field.value}}</label>\n      <label *ngIf=\"isObjectType(field.value)\" class=\"ot-form-value-label\">\n        <span class=\"\" *ngFor=\"let s of field.value; let isLast=last\">{{s}}{{isLast? '' : ',&nbsp;'}}</span>\n      </label>\n    </ng-container>\n   \n   <ng-container *ngIf=\"!readOnly\">\n    \n   <input\u00A0type=\"text\" *ngSwitchCase=\"'digits'\" \u00A0[formControlName]=\"field.name\"\n   [ngClass]=\"form.get(field.name).touched && form.get(field.name).invalid ? 'ot-error':'ot-text'\"  \n   [maxlength]=\"field?.maxlength ? field?.maxlength : 15\"\n   [minlength]=\"field?.minlength\"\n   [pattern]=\"field?.pattern\"\n   [required]=\"field?.required\"\n   [attr.placeholder]=\"field?.placeholder\"\n   [attr.readonly]=\"field?.readonly ? true : null\"\n   [attr.disabled]=\"field?.disabled ? true : null\"\n   onlyDigits\n   >\n   <input\u00A0type=\"text\" *ngSwitchCase=\"'number'\" \u00A0[formControlName]=\"field.name\"\n   [ngClass]=\"form.get(field.name).touched && form.get(field.name).invalid ? 'ot-error':'ot-text'\"  \n   [maxlength]=\"field?.maxlength ? field?.maxlength : 15\"\n   [minlength]=\"field?.minlength\"\n   [pattern]=\"field?.pattern\"\n   [required]=\"field?.required\"\n   [attr.placeholder]=\"field?.placeholder\"\n   [attr.readonly]=\"field?.readonly ? true : null\"\n   [attr.disabled]=\"field?.disabled ? true : null\"\n   numeric\n   > \n  \n   <input\u00A0type=\"text\" *ngSwitchCase=\"'text'\" \u00A0[formControlName]=\"field.name\"\n   [ngClass]=\"form.get(field.name).touched && form.get(field.name).invalid ? 'ot-error':'ot-text'\"  \n   [maxlength]=\"field?.maxlength ? field?.maxlength : 120\"\n   [minlength]=\"field?.minlength\"\n   [pattern]=\"field?.pattern\"\n   [required]=\"field?.required\"\n   [attr.placeholder]=\"field?.placeholder\"\n   [attr.readonly]=\"field?.readonly ? true : null\"\n   [attr.disabled]=\"field?.disabled ? true : null\"\n   trim=\"blur\"\n   >\n  \n   <input\u00A0type=\"text\" *ngSwitchCase=\"'email'\" \u00A0[formControlName]=\"field.name\"\n   [ngClass]=\"form.get(field.name).touched && form.get(field.name).invalid ? 'ot-error':'ot-text'\"  \n   [maxlength]=\"field?.maxlength ? field?.maxlength : 256\"\n   [minlength]=\"field?.minlength\"\n   [pattern]=\"field?.pattern\"\n   [required]=\"field?.required\"\n   [attr.placeholder]=\"field?.placeholder\"\n   [attr.readonly]=\"field?.readonly ? true : null\"\n   [attr.disabled]=\"field?.disabled ? true : null\"\n   trim=\"blur\"\n   >\n\n  \n<div class=\"ot-customfield-radiobtn-scrollbar\" *ngSwitchCase=\"'radio button'\" [perfectScrollbar]=\"scrollConfig\" >\n  <label *ngFor=\"let opt of field.options\" style=\"display:block\">\n      <input type=\"radio\" [formControlName]=\"field.name\"   \n      [ngClass]=\"form.get(field.name).touched && form.get(field.name).invalid ? 'ot-error':'ot-text'\"  \n      [required]=\"field?.required\"\n      [attr.readonly]=\"field?.readonly ? true : null\"\n      [attr.disabled]=\"field?.disabled ? true : null\"\n      [value]=\"opt.id\"\n      [readonly]=\"field.readonly\"\n      [disabled]=\"field.disabled\"\n      > {{opt.value}}\n\n  </label>\n\n</div>\n <ot-select-dropdown *ngSwitchCase=\"'drop-down'\"  [formControlName]=\"field.name\"\n [options]=\"field.options\"\n [readonly]=\"field.readonly\"\n [disabled]=\"field.disabled\"\n [dataKey]=\"field.optionsKey\"\n [optionLabel]=\"field.optionsLabel\"\n [returnKeyOnly]=\"true\"\n [attr.readonly]=\"field?.readonly ? true : null\"\n >\n</ot-select-dropdown > \n\n\n   <ot-multi-select *ngSwitchCase=\"'multivalue'\" [formControlName]=\"field.name\"\n   [options]=\"field.options\"\n   [readonly]=\"field.readonly\"\n   [disabled]=\"field.disabled\"\n   [dataKey]=\"field.optionsKey\"\n   [optionLabel]=\"field.optionsLabel\"\n   [returnKeyOnly]=\"true\"\n   [defaultLabel]=\"field.placeholder\"\n   [selectedItemsLabel]=\"field.selectedOptionMsg\"\n   [required]=\"field?.required\"\n   >\n  \n   </ot-multi-select> \n\n\n  \n  <input\u00A0type=\"text\" *ngSwitchDefault \u00A0[formControlName]=\"field.name\" \n   [ngClass]=\"form.get(field.name).touched && form.get(field.name).invalid ? 'ot-error':'ot-text'\"\n   [maxlength]=\"field?.maxlength ? field.maxlength : 256\"\n   [minlength]=\"field?.minlength\"\n   [pattern]=\"field?.pattern\"\n   [required]=\"field?.required\"\n   [attr.placeholder]=\"field?.placeholder\"\n   [attr.readonly]=\"field?.readonly ? true : null\"\n   [attr.disabled]=\"field?.disabled ? true : null\"\n   trim=\"blur\"\n   >\n\n   \n   <ng-container *ngIf=\"form.get(field.name).touched\">\n     <label *ngIf=\"form.get(field.name).hasError('required')\" class=\"ot-error\">{{field?.validationMessages?.required}}</label>\n     <label *ngIf=\"form.get(field.name).hasError('pattern')\" class=\"ot-error\">{{field?.validationMessages?.pattern}}</label>\n     <label *ngIf=\"form.get(field.name).hasError('minlength')\" class=\"ot-error\">{{field?.validationMessages?.minlength}}</label>\n     <label *ngIf=\"form.get(field.name).hasError('maxlength')\" class=\"ot-error\">{{field?.validationMessages?.maxlength}}</label>\n   </ng-container>\n  </ng-container>  \n  </div>\n  \n  "
        }),
        __metadata("design:paramtypes", [])
    ], FieldBuilderComponent);
    return FieldBuilderComponent;
}());
export { FieldBuilderComponent };
//# sourceMappingURL=field-builder.component.js.map
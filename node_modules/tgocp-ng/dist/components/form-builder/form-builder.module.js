var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormBuilderComponent } from './form-builder.component';
import { FieldBuilderComponent } from './field-builder/field-builder.component';
import { SharedModule } from '../common/shared';
import { OnlyDigitsModule } from '../../directives/onlydigits/only-digits';
import { TrimModule } from '../../directives/trim/trim.directive';
import { SelectDropdownModule } from '../selectDropdown/selectDropdown';
import { MultiSelectModule } from '../multiSelect/multi-select';
import { NumericModule } from '../../directives/numeric/numeric.directive';
var FormBuilderModule = /** @class */ (function () {
    function FormBuilderModule() {
    }
    FormBuilderModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule, PerfectScrollbarModule, FormsModule, MultiSelectModule,
                ReactiveFormsModule, OnlyDigitsModule, TrimModule, SelectDropdownModule, NumericModule],
            declarations: [FormBuilderComponent, FieldBuilderComponent],
            exports: [FormBuilderComponent]
        })
    ], FormBuilderModule);
    return FormBuilderModule;
}());
export { FormBuilderModule };
//# sourceMappingURL=form-builder.module.js.map
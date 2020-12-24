/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "./form-builder.component.css.shim.ngstyle";
import * as i1 from "@angular/core";
import * as i2 from "./field-builder/field-builder.component.ngfactory";
import * as i3 from "./field-builder/field-builder.component";
import * as i4 from "@angular/common";
import * as i5 from "ngx-perfect-scrollbar";
import * as i6 from "@angular/forms";
import * as i7 from "./form-builder.component";
var styles_FormBuilderComponent = [i0.styles];
var RenderType_FormBuilderComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_FormBuilderComponent, data: {} });
export { RenderType_FormBuilderComponent as RenderType_FormBuilderComponent };
function View_FormBuilderComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 2, null, null, null, null, null, null, null)), (_l()(), i1.ɵeld(1, 0, null, null, 1, "field-builder", [], null, null, null, i2.View_FieldBuilderComponent_0, i2.RenderType_FieldBuilderComponent)), i1.ɵdid(2, 1097728, null, 0, i3.FieldBuilderComponent, [], { field: [0, "field"], form: [1, "form"], readOnly: [2, "readOnly"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit; var currVal_1 = _co.dynamicForm; var currVal_2 = _co.readOnlyMode; _ck(_v, 2, 0, currVal_0, currVal_1, currVal_2); }, null); }
export function View_FormBuilderComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 10, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (i1.ɵnov(_v, 5).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (i1.ɵnov(_v, 5).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i1.ɵdid(1, 278528, null, 0, i4.NgStyle, [i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { ngStyle: [0, "ngStyle"] }, null), i1.ɵdid(2, 999424, null, 0, i5.PerfectScrollbarDirective, [i1.NgZone, i1.KeyValueDiffers, i1.ElementRef, i1.PLATFORM_ID, [2, i5.PERFECT_SCROLLBAR_CONFIG]], { config: [0, "config"] }, null), i1.ɵpod(3, { suppressScrollX: 0, minScrollbarLength: 1 }), i1.ɵdid(4, 16384, null, 0, i6.ɵangular_packages_forms_forms_bh, [], null, null), i1.ɵdid(5, 540672, null, 0, i6.FormGroupDirective, [[8, null], [8, null]], { form: [0, "form"] }, null), i1.ɵprd(2048, null, i6.ControlContainer, null, [i6.FormGroupDirective]), i1.ɵdid(7, 16384, null, 0, i6.NgControlStatusGroup, [[4, i6.ControlContainer]], null, null), (_l()(), i1.ɵeld(8, 0, null, null, 2, "div", [["class", "fields"]], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_FormBuilderComponent_1)), i1.ɵdid(10, 278528, null, 0, i4.NgForOf, [i1.ViewContainerRef, i1.TemplateRef, i1.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.formStyle; _ck(_v, 1, 0, currVal_7); var currVal_8 = _ck(_v, 3, 0, true, 16); _ck(_v, 2, 0, currVal_8); var currVal_9 = _co.dynamicForm; _ck(_v, 5, 0, currVal_9); var currVal_10 = _co.formSchema; _ck(_v, 10, 0, currVal_10); }, function (_ck, _v) { var currVal_0 = i1.ɵnov(_v, 7).ngClassUntouched; var currVal_1 = i1.ɵnov(_v, 7).ngClassTouched; var currVal_2 = i1.ɵnov(_v, 7).ngClassPristine; var currVal_3 = i1.ɵnov(_v, 7).ngClassDirty; var currVal_4 = i1.ɵnov(_v, 7).ngClassValid; var currVal_5 = i1.ɵnov(_v, 7).ngClassInvalid; var currVal_6 = i1.ɵnov(_v, 7).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); }); }
export function View_FormBuilderComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "ot-form-builder", [], null, null, null, View_FormBuilderComponent_0, RenderType_FormBuilderComponent)), i1.ɵdid(1, 1163264, null, 0, i7.FormBuilderComponent, [i6.FormBuilder, i1.ChangeDetectorRef], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var FormBuilderComponentNgFactory = i1.ɵccf("ot-form-builder", i7.FormBuilderComponent, View_FormBuilderComponent_Host_0, { formSchema: "formSchema", formData: "formData", readOnlyMode: "readOnlyMode", formStyle: "formStyle" }, { onFormSubmit: "onFormSubmit", onFormReset: "onFormReset" }, []);
export { FormBuilderComponentNgFactory as FormBuilderComponentNgFactory };
//# sourceMappingURL=form-builder.component.ngfactory.js.map
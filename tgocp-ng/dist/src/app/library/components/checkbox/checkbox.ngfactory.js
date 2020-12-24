/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./checkbox";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
var CheckboxModuleNgFactory = i0.ɵcmf(i1.CheckboxModule, [], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, []], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(4608, i2.NgLocalization, i2.NgLocaleLocalization, [i0.LOCALE_ID, [2, i2.ɵangular_packages_common_common_a]]), i0.ɵmpd(1073742336, i2.CommonModule, i2.CommonModule, []), i0.ɵmpd(1073742336, i1.CheckboxModule, i1.CheckboxModule, [])]); });
export { CheckboxModuleNgFactory as CheckboxModuleNgFactory };
var styles_Checkbox = [];
var RenderType_Checkbox = i0.ɵcrt({ encapsulation: 2, styles: styles_Checkbox, data: {} });
export { RenderType_Checkbox as RenderType_Checkbox };
function View_Checkbox_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, "label", [["class", "ot-ui-chkbox-label"]], [[1, "for", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onClick($event, i0.ɵnov(_v.parent, 4), true) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(2, { "ot-ui-label-active": 0, "ot-ui-label-disabled": 1, "ot-ui-label-focus": 2 }), (_l()(), i0.ɵted(3, null, ["", ""]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = "ot-ui-chkbox-label"; var currVal_2 = _ck(_v, 2, 0, _co.checked, _co.disabled, _co.focused); _ck(_v, 1, 0, currVal_1, currVal_2); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.inputId; _ck(_v, 0, 0, currVal_0); var currVal_3 = _co.label; _ck(_v, 3, 0, currVal_3); }); }
export function View_Checkbox_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 7, "div", [], null, null, null, null, null)), i0.ɵdid(1, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵdid(2, 278528, null, 0, i2.NgStyle, [i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngStyle: [0, "ngStyle"] }, null), (_l()(), i0.ɵeld(3, 0, null, null, 1, "div", [["class", "ot-ui-helper-hidden-accessible"]], null, null, null, null, null)), (_l()(), i0.ɵeld(4, 0, [["cb", 1]], null, 0, "input", [["type", "checkbox"]], [[1, "id", 0], [8, "name", 0], [8, "value", 0], [8, "checked", 0], [8, "disabled", 0], [1, "tabindex", 0]], [[null, "blur"], [null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("blur" === en)) {
        var pd_0 = (_co.onBlur($event) !== false);
        ad = (pd_0 && ad);
    } if (("change" === en)) {
        var pd_1 = (_co.handleChange($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵeld(5, 0, null, null, 2, "div", [["class", "ot-ui-chkbox-box ot-ui-widget ot-ui-corner-all"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onClick($event, i0.ɵnov(_v, 4), true) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(6, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(7, { "ot-ui-state-active": 0, "ot-ui-state-disabled": 1, "ot-ui-state-focus": 2 }), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Checkbox_1)), i0.ɵdid(9, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.styleClass; var currVal_1 = "ot-ui-chkbox ot-ui-widget"; _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = _co.style; _ck(_v, 2, 0, currVal_2); var currVal_9 = "ot-ui-chkbox-box ot-ui-widget ot-ui-corner-all"; var currVal_10 = _ck(_v, 7, 0, _co.checked, _co.disabled, _co.focused); _ck(_v, 6, 0, currVal_9, currVal_10); var currVal_11 = _co.label; _ck(_v, 9, 0, currVal_11); }, function (_ck, _v) { var _co = _v.component; var currVal_3 = _co.inputId; var currVal_4 = _co.name; var currVal_5 = _co.value; var currVal_6 = _co.checked; var currVal_7 = _co.disabled; var currVal_8 = _co.tabindex; _ck(_v, 4, 0, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
export function View_Checkbox_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "ot-checkbox", [], null, null, null, View_Checkbox_0, RenderType_Checkbox)), i0.ɵprd(5120, null, i3.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i1.Checkbox]), i0.ɵdid(2, 49152, null, 0, i1.Checkbox, [i0.ChangeDetectorRef], null, null)], null, null); }
var CheckboxNgFactory = i0.ɵccf("ot-checkbox", i1.Checkbox, View_Checkbox_Host_0, { value: "value", name: "name", disabled: "disabled", binary: "binary", label: "label", disableLabelEvent: "disableLabelEvent", tabindex: "tabindex", inputId: "inputId", style: "style", styleClass: "styleClass", formControl: "formControl" }, { onChange: "onChange" }, []);
export { CheckboxNgFactory as CheckboxNgFactory };
//# sourceMappingURL=checkbox.ngfactory.js.map
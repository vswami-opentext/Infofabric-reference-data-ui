/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./paginator";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "../common/shared";
import * as i5 from "../mini-dropdown/mini-dropdown";
import * as i6 from "../common/shared.ngfactory";
import * as i7 from "../mini-dropdown/mini-dropdown.ngfactory";
import * as i8 from "../dom/domhandler";
import * as i9 from "../utils/objectutils";
var MiniPaginatorModuleNgFactory = i0.ɵcmf(i1.MiniPaginatorModule, [], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, []], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(4608, i2.NgLocalization, i2.NgLocaleLocalization, [i0.LOCALE_ID, [2, i2.ɵangular_packages_common_common_a]]), i0.ɵmpd(4608, i3.ɵangular_packages_forms_forms_j, i3.ɵangular_packages_forms_forms_j, []), i0.ɵmpd(1073742336, i2.CommonModule, i2.CommonModule, []), i0.ɵmpd(1073742336, i4.SharedModule, i4.SharedModule, []), i0.ɵmpd(1073742336, i5.MiniDropdownModule, i5.MiniDropdownModule, []), i0.ɵmpd(1073742336, i3.ɵangular_packages_forms_forms_bc, i3.ɵangular_packages_forms_forms_bc, []), i0.ɵmpd(1073742336, i3.FormsModule, i3.FormsModule, []), i0.ɵmpd(1073742336, i1.MiniPaginatorModule, i1.MiniPaginatorModule, [])]); });
export { MiniPaginatorModuleNgFactory as MiniPaginatorModuleNgFactory };
var styles_MiniPaginator = [];
var RenderType_MiniPaginator = i0.ɵcrt({ encapsulation: 2, styles: styles_MiniPaginator, data: {} });
export { RenderType_MiniPaginator as RenderType_MiniPaginator };
function View_MiniPaginator_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "div", [["class", "ot-ui-mini-paginator-left-content"]], null, null, null, null, null)), (_l()(), i0.ɵeld(1, 16777216, null, null, 1, "ot-templateLoader", [], null, null, null, i6.View_TemplateLoader_0, i6.RenderType_TemplateLoader)), i0.ɵdid(2, 245760, null, 0, i4.TemplateLoader, [i0.ViewContainerRef], { template: [0, "template"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.templateLeft; _ck(_v, 2, 0, currVal_0); }, null); }
function View_MiniPaginator_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, "a", [["class", "ot-ui-mini-paginator-page ot-ui-mini-paginator-element ot-ui-state-default ot-ui-corner-all"], ["href", "#"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onPageLinkClick($event, (_v.context.$implicit - 1)) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(2, { "ot-ui-state-active": 0 }), (_l()(), i0.ɵted(3, null, ["", ""]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "ot-ui-mini-paginator-page ot-ui-mini-paginator-element ot-ui-state-default ot-ui-corner-all"; var currVal_1 = _ck(_v, 2, 0, ((_v.context.$implicit - 1) == _co.getPage())); _ck(_v, 1, 0, currVal_0, currVal_1); }, function (_ck, _v) { var currVal_2 = _v.context.$implicit; _ck(_v, 3, 0, currVal_2); }); }
function View_MiniPaginator_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 8, "ot-mini-dropdown", [], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "onChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.rows = $event) !== false);
        ad = (pd_0 && ad);
    } if (("onChange" === en)) {
        var pd_1 = (_co.onRppChange($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, i7.View_MiniDropdown_0, i7.RenderType_MiniDropdown)), i0.ɵprd(512, null, i8.DomHandler, i8.DomHandler, []), i0.ɵprd(512, null, i9.ObjectUtils, i9.ObjectUtils, []), i0.ɵdid(3, 13877248, null, 1, i5.MiniDropdown, [i0.ElementRef, i8.DomHandler, i0.Renderer2, i0.ChangeDetectorRef, i9.ObjectUtils, i0.NgZone], { autoWidth: [0, "autoWidth"], lazy: [1, "lazy"], options: [2, "options"] }, { onChange: "onChange" }), i0.ɵqud(603979776, 1, { templates: 1 }), i0.ɵprd(1024, null, i3.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i5.MiniDropdown]), i0.ɵdid(6, 671744, null, 0, i3.NgModel, [[8, null], [8, null], [8, null], [6, i3.NG_VALUE_ACCESSOR]], { model: [0, "model"] }, { update: "ngModelChange" }), i0.ɵprd(2048, null, i3.NgControl, null, [i3.NgModel]), i0.ɵdid(8, 16384, null, 0, i3.NgControlStatus, [[4, i3.NgControl]], null, null)], function (_ck, _v) { var _co = _v.component; var currVal_7 = false; var currVal_8 = false; var currVal_9 = _co.rowsPerPageItems; _ck(_v, 3, 0, currVal_7, currVal_8, currVal_9); var currVal_10 = _co.rows; _ck(_v, 6, 0, currVal_10); }, function (_ck, _v) { var currVal_0 = i0.ɵnov(_v, 8).ngClassUntouched; var currVal_1 = i0.ɵnov(_v, 8).ngClassTouched; var currVal_2 = i0.ɵnov(_v, 8).ngClassPristine; var currVal_3 = i0.ɵnov(_v, 8).ngClassDirty; var currVal_4 = i0.ɵnov(_v, 8).ngClassValid; var currVal_5 = i0.ɵnov(_v, 8).ngClassInvalid; var currVal_6 = i0.ɵnov(_v, 8).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); }); }
function View_MiniPaginator_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "div", [["class", "ot-ui-mini-paginator-right-content"]], null, null, null, null, null)), (_l()(), i0.ɵeld(1, 16777216, null, null, 1, "ot-templateLoader", [], null, null, null, i6.View_TemplateLoader_0, i6.RenderType_TemplateLoader)), i0.ɵdid(2, 245760, null, 0, i4.TemplateLoader, [i0.ViewContainerRef], { template: [0, "template"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.templateRight; _ck(_v, 2, 0, currVal_0); }, null); }
function View_MiniPaginator_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 27, "div", [], null, null, null, null, null)), i0.ɵdid(1, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵdid(2, 278528, null, 0, i2.NgStyle, [i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngStyle: [0, "ngStyle"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_MiniPaginator_2)), i0.ɵdid(4, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵeld(5, 0, null, null, 3, "a", [["class", "ot-ui-mini-paginator-first ot-ui-mini-paginator-element ot-ui-state-default ot-ui-corner-all"], ["href", "#"]], [[8, "tabIndex", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePageToFirst($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(6, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(7, { "ot-ui-state-disabled": 0 }), (_l()(), i0.ɵeld(8, 0, null, null, 0, "span", [["class", "ot-fa ot-fa-step-backward"]], null, null, null, null, null)), (_l()(), i0.ɵeld(9, 0, null, null, 3, "a", [["class", "ot-ui-mini-paginator-prev ot-ui-mini-paginator-element ot-ui-state-default ot-ui-corner-all"], ["href", "#"]], [[8, "tabIndex", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePageToPrev($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(10, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(11, { "ot-ui-state-disabled": 0 }), (_l()(), i0.ɵeld(12, 0, null, null, 0, "span", [["class", "ot-fa ot-fa-backward"]], null, null, null, null, null)), (_l()(), i0.ɵeld(13, 0, null, null, 2, "span", [["class", "ot-ui-mini-paginator-pages"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_MiniPaginator_3)), i0.ɵdid(15, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵeld(16, 0, null, null, 3, "a", [["class", "ot-ui-mini-paginator-next ot-ui-mini-paginator-element ot-ui-state-default ot-ui-corner-all"], ["href", "#"]], [[8, "tabIndex", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePageToNext($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(17, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(18, { "ot-ui-state-disabled": 0 }), (_l()(), i0.ɵeld(19, 0, null, null, 0, "span", [["class", "ot-fa ot-fa-forward"]], null, null, null, null, null)), (_l()(), i0.ɵeld(20, 0, null, null, 3, "a", [["class", "ot-ui-mini-paginator-last ot-ui-mini-paginator-element ot-ui-state-default ot-ui-corner-all"], ["href", "#"]], [[8, "tabIndex", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePageToLast($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(21, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(22, { "ot-ui-state-disabled": 0 }), (_l()(), i0.ɵeld(23, 0, null, null, 0, "span", [["class", "ot-fa ot-fa-step-forward"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_MiniPaginator_4)), i0.ɵdid(25, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_MiniPaginator_5)), i0.ɵdid(27, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.styleClass; var currVal_1 = "ot-ui-mini-paginator ot-ui-widget ot-ui-widget-header ot-ui-unselectable-text ot-ui-helper-clearfix"; _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = _co.style; _ck(_v, 2, 0, currVal_2); var currVal_3 = _co.templateLeft; _ck(_v, 4, 0, currVal_3); var currVal_5 = "ot-ui-mini-paginator-first ot-ui-mini-paginator-element ot-ui-state-default ot-ui-corner-all"; var currVal_6 = _ck(_v, 7, 0, _co.isFirstPage()); _ck(_v, 6, 0, currVal_5, currVal_6); var currVal_8 = "ot-ui-mini-paginator-prev ot-ui-mini-paginator-element ot-ui-state-default ot-ui-corner-all"; var currVal_9 = _ck(_v, 11, 0, _co.isFirstPage()); _ck(_v, 10, 0, currVal_8, currVal_9); var currVal_10 = _co.pageLinks; _ck(_v, 15, 0, currVal_10); var currVal_12 = "ot-ui-mini-paginator-next ot-ui-mini-paginator-element ot-ui-state-default ot-ui-corner-all"; var currVal_13 = _ck(_v, 18, 0, _co.isLastPage()); _ck(_v, 17, 0, currVal_12, currVal_13); var currVal_15 = "ot-ui-mini-paginator-last ot-ui-mini-paginator-element ot-ui-state-default ot-ui-corner-all"; var currVal_16 = _ck(_v, 22, 0, _co.isLastPage()); _ck(_v, 21, 0, currVal_15, currVal_16); var currVal_17 = _co.rowsPerPageOptions; _ck(_v, 25, 0, currVal_17); var currVal_18 = _co.templateRight; _ck(_v, 27, 0, currVal_18); }, function (_ck, _v) { var _co = _v.component; var currVal_4 = (_co.isFirstPage() ? (0 - 1) : null); _ck(_v, 5, 0, currVal_4); var currVal_7 = (_co.isFirstPage() ? (0 - 1) : null); _ck(_v, 9, 0, currVal_7); var currVal_11 = (_co.isLastPage() ? (0 - 1) : null); _ck(_v, 16, 0, currVal_11); var currVal_14 = (_co.isLastPage() ? (0 - 1) : null); _ck(_v, 20, 0, currVal_14); }); }
export function View_MiniPaginator_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵand(16777216, null, null, 1, null, View_MiniPaginator_1)), i0.ɵdid(1, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.alwaysShow ? true : (_co.pageLinks && (_co.pageLinks.length > 1))); _ck(_v, 1, 0, currVal_0); }, null); }
export function View_MiniPaginator_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "ot-mini-paginator", [], null, null, null, View_MiniPaginator_0, RenderType_MiniPaginator)), i0.ɵdid(1, 49152, null, 0, i1.MiniPaginator, [], null, null)], null, null); }
var MiniPaginatorNgFactory = i0.ɵccf("ot-mini-paginator", i1.MiniPaginator, View_MiniPaginator_Host_0, { pageLinkSize: "pageLinkSize", style: "style", styleClass: "styleClass", alwaysShow: "alwaysShow", templateLeft: "templateLeft", templateRight: "templateRight", totalRecords: "totalRecords", first: "first", rows: "rows", rowsPerPageOptions: "rowsPerPageOptions" }, { onPageChange: "onPageChange" }, []);
export { MiniPaginatorNgFactory as MiniPaginatorNgFactory };
//# sourceMappingURL=paginator.ngfactory.js.map
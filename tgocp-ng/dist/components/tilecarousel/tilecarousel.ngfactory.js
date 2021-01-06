/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./tilecarousel";
import * as i2 from "@angular/common";
import * as i3 from "../common/shared";
import * as i4 from "../dom/domhandler";
var CarouselModuleNgFactory = i0.ɵcmf(i1.CarouselModule, [], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, []], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(4608, i2.NgLocalization, i2.NgLocaleLocalization, [i0.LOCALE_ID, [2, i2.ɵangular_packages_common_common_a]]), i0.ɵmpd(1073742336, i2.CommonModule, i2.CommonModule, []), i0.ɵmpd(1073742336, i3.SharedModule, i3.SharedModule, []), i0.ɵmpd(1073742336, i1.CarouselModule, i1.CarouselModule, [])]); });
export { CarouselModuleNgFactory as CarouselModuleNgFactory };
var styles_TileCarousel = [];
var RenderType_TileCarousel = i0.ɵcrt({ encapsulation: 2, styles: styles_TileCarousel, data: {} });
export { RenderType_TileCarousel as RenderType_TileCarousel };
function View_TileCarousel_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "span", [["class", "ot-ui-carousel-button ot-ui-carousel-next-button fa fa-arrow-circle-right"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onNextNav() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(2, { "ot-ui-state-disabled": 0 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = "ot-ui-carousel-button ot-ui-carousel-next-button fa fa-arrow-circle-right"; var currVal_1 = _ck(_v, 2, 0, ((_co.page === (_co.totalPages - 1)) && !_co.circular)); _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_TileCarousel_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "span", [["class", "ot-ui-carousel-button ot-ui-carousel-prev-button fa fa-arrow-circle-left"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onPrevNav() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(2, { "ot-ui-state-disabled": 0 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = "ot-ui-carousel-button ot-ui-carousel-prev-button fa fa-arrow-circle-left"; var currVal_1 = _ck(_v, 2, 0, ((_co.page === 0) && !_co.circular)); _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_TileCarousel_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "a", [["class", "ot-ui-carousel-page-link fa fa-circle-o"], ["href", "#"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.setPageWithLink($event, _v.context.index) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(2, { "fa-dot-circle-o": 0 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = "ot-ui-carousel-page-link fa fa-circle-o"; var currVal_1 = _ck(_v, 2, 0, (_co.page === _v.context.index)); _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_TileCarousel_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "div", [["class", "ot-ui-carousel-page-links"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TileCarousel_4)), i0.ɵdid(2, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.anchorPageLinks; _ck(_v, 2, 0, currVal_0); }, null); }
function View_TileCarousel_6(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "option", [], [[8, "value", 0], [8, "selected", 0]], null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit; var currVal_1 = (_co.value == _v.context.$implicit); _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_2 = (_v.context.$implicit + 1); _ck(_v, 1, 0, currVal_2); }); }
function View_TileCarousel_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "select", [["class", "ot-ui-carousel-dropdown ot-ui-widget ot-ui-state-default ot-ui-corner-left"]], [[8, "value", 0]], [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.onDropdownChange($event.target.value) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TileCarousel_6)), i0.ɵdid(2, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.selectDropdownOptions; _ck(_v, 2, 0, currVal_1); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.page; _ck(_v, 0, 0, currVal_0); }); }
function View_TileCarousel_8(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "option", [], [[8, "value", 0], [8, "selected", 0]], null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit; var currVal_1 = (_co.value == _v.context.$implicit); _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_2 = (_v.context.$implicit + 1); _ck(_v, 1, 0, currVal_2); }); }
function View_TileCarousel_7(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "select", [["class", "ot-ui-carousel-mobiledropdown ot-ui-widget ot-ui-state-default ot-ui-corner-left"]], [[8, "value", 0], [4, "display", null]], [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.onDropdownChange($event.target.value) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TileCarousel_8)), i0.ɵdid(2, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.mobileDropdownOptions; _ck(_v, 2, 0, currVal_2); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.page; var currVal_1 = (_co.shrinked ? "block" : "none"); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_TileCarousel_10(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵand(0, null, null, 0))], null, null); }
function View_TileCarousel_9(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "li", [["class", "ot-ui-carousel-item ot-ui-widget-content ot-ui-corner-all"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TileCarousel_10)), i0.ɵdid(2, 212992, null, 0, i3.TemplateWrapper, [i0.ViewContainerRef], { item: [0, "item"], templateRef: [1, "templateRef"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit; var currVal_1 = _co.itemTemplate; _ck(_v, 2, 0, currVal_0, currVal_1); }, null); }
export function View_TileCarousel_0(_l) { return i0.ɵvid(0, [i0.ɵqud(402653184, 1, { containerViewChild: 0 }), i0.ɵqud(402653184, 2, { viewportViewChild: 0 }), i0.ɵqud(402653184, 3, { itemsViewChild: 0 }), (_l()(), i0.ɵeld(3, 0, [[1, 0], ["container", 1]], null, 20, "div", [], null, null, null, null, null)), i0.ɵdid(4, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(5, { "ot-ui-carousel ot-ui-widget ot-ui-widget-content ot-ui-corner-all": 0 }), i0.ɵdid(6, 278528, null, 0, i2.NgStyle, [i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngStyle: [0, "ngStyle"] }, null), (_l()(), i0.ɵeld(7, 0, null, null, 12, "div", [["class", "ot-ui-carousel-header ot-ui-widget-header ot-ui-corner-all"]], null, null, null, null, null)), (_l()(), i0.ɵeld(8, 0, null, null, 1, "span", [["class", "ot-ui-carousel-header-title"]], null, null, null, null, null)), (_l()(), i0.ɵted(9, null, ["", ""])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TileCarousel_1)), i0.ɵdid(11, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TileCarousel_2)), i0.ɵdid(13, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TileCarousel_3)), i0.ɵdid(15, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TileCarousel_5)), i0.ɵdid(17, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TileCarousel_7)), i0.ɵdid(19, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵeld(20, 0, [[2, 0], ["viewport", 1]], null, 3, "div", [["class", "ot-ui-carousel-viewport"]], null, null, null, null, null)), (_l()(), i0.ɵeld(21, 0, [[3, 0], ["items", 1]], null, 2, "ul", [["class", "ot-ui-carousel-items"]], [[4, "left", "px"], [4, "transitionProperty", null], [4, "transitionDuration", null], [4, "transitionTimingFunction", null]], null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_TileCarousel_9)), i0.ɵdid(23, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.styleClass; var currVal_1 = _ck(_v, 5, 0, true); _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_2 = _co.style; _ck(_v, 6, 0, currVal_2); var currVal_4 = (_co.value && _co.value.length); _ck(_v, 11, 0, currVal_4); var currVal_5 = (_co.value && _co.value.length); _ck(_v, 13, 0, currVal_5); var currVal_6 = _co.displayPageLinks; _ck(_v, 15, 0, currVal_6); var currVal_7 = _co.displayPageDropdown; _ck(_v, 17, 0, currVal_7); var currVal_8 = ((_co.responsive && _co.value) && _co.value.length); _ck(_v, 19, 0, currVal_8); var currVal_13 = _co.value; _ck(_v, 23, 0, currVal_13); }, function (_ck, _v) { var _co = _v.component; var currVal_3 = _co.headerText; _ck(_v, 9, 0, currVal_3); var currVal_9 = _co.left; var currVal_10 = "left"; var currVal_11 = _co.effectDuration; var currVal_12 = _co.easing; _ck(_v, 21, 0, currVal_9, currVal_10, currVal_11, currVal_12); }); }
export function View_TileCarousel_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, "ot-carousel", [], null, null, null, View_TileCarousel_0, RenderType_TileCarousel)), i0.ɵprd(512, null, i4.DomHandler, i4.DomHandler, []), i0.ɵdid(2, 13811712, null, 1, i1.TileCarousel, [i0.ElementRef, i4.DomHandler, i0.Renderer2, i0.ChangeDetectorRef], null, null), i0.ɵqud(603979776, 1, { templates: 1 })], null, null); }
var TileCarouselNgFactory = i0.ɵccf("ot-carousel", i1.TileCarousel, View_TileCarousel_Host_0, { numVisible: "numVisible", firstVisible: "firstVisible", headerText: "headerText", circular: "circular", breakpoint: "breakpoint", responsive: "responsive", autoplayInterval: "autoplayInterval", effectDuration: "effectDuration", easing: "easing", pageLinks: "pageLinks", style: "style", styleClass: "styleClass", value: "value" }, { onPage: "onPage" }, []);
export { TileCarouselNgFactory as TileCarouselNgFactory };
//# sourceMappingURL=tilecarousel.ngfactory.js.map
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./carousel.component";
import * as i3 from "./carousel-config";
var styles_OtCarousel = [];
var RenderType_OtCarousel = i0.ɵcrt({ encapsulation: 2, styles: styles_OtCarousel, data: {} });
export { RenderType_OtCarousel as RenderType_OtCarousel };
function View_OtCarousel_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, "li", [], [[8, "id", 0], [2, "ot-active", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.select(_v.context.$implicit.id, _co.NgbSlideEventSource.INDICATOR) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit.id; var currVal_1 = (_v.context.$implicit.id === _co.activeId); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_OtCarousel_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "ol", [["class", "ot-carousel-indicators"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_OtCarousel_2)), i0.ɵdid(2, 278528, null, 0, i1.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.slides; _ck(_v, 2, 0, currVal_0); }, null); }
function View_OtCarousel_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵand(0, null, null, 0))], null, null); }
function View_OtCarousel_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "div", [["class", "ot-carousel-item"]], [[2, "ot-active", null]], null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_OtCarousel_4)), i0.ɵdid(2, 540672, null, 0, i1.NgTemplateOutlet, [i0.ViewContainerRef], { ngTemplateOutlet: [0, "ngTemplateOutlet"] }, null)], function (_ck, _v) { var currVal_1 = _v.context.$implicit.tplRef; _ck(_v, 2, 0, currVal_1); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = (_v.context.$implicit.id === _co.activeId); _ck(_v, 0, 0, currVal_0); }); }
function View_OtCarousel_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, "a", [["class", "ot-carousel-control-prev"], ["role", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.prev(_co.NgbSlideEventSource.ARROW_LEFT) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 0, "span", [["aria-hidden", "true"], ["class", "ot-carousel-control-prev-icon"]], null, null, null, null, null)), (_l()(), i0.ɵeld(2, 0, null, null, 1, "span", [["class", "sr-only"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Previous"]))], null, null); }
function View_OtCarousel_6(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, "a", [["class", "ot-carousel-control-next"], ["role", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.next(_co.NgbSlideEventSource.ARROW_RIGHT) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 0, "span", [["aria-hidden", "true"], ["class", "ot-carousel-control-next-icon"]], null, null, null, null, null)), (_l()(), i0.ɵeld(2, 0, null, null, 1, "span", [["class", "sr-only"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Next"]))], null, null); }
export function View_OtCarousel_0(_l) { return i0.ɵvid(2, [(_l()(), i0.ɵand(16777216, null, null, 1, null, View_OtCarousel_1)), i0.ɵdid(1, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵeld(2, 0, null, null, 2, "div", [["class", "ot-carousel-inner"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_OtCarousel_3)), i0.ɵdid(4, 278528, null, 0, i1.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_OtCarousel_5)), i0.ɵdid(6, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_OtCarousel_6)), i0.ɵdid(8, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.showNavigationIndicators; _ck(_v, 1, 0, currVal_0); var currVal_1 = _co.slides; _ck(_v, 4, 0, currVal_1); var currVal_2 = _co.showNavigationArrows; _ck(_v, 6, 0, currVal_2); var currVal_3 = _co.showNavigationArrows; _ck(_v, 8, 0, currVal_3); }, null); }
export function View_OtCarousel_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "ot-carousel", [["class", "ot-carousel slide"], ["tabIndex", "0"]], [[4, "display", null]], [[null, "keydown.arrowLeft"], [null, "keydown.arrowRight"], [null, "mouseenter"], [null, "mouseleave"]], function (_v, en, $event) { var ad = true; if (("keydown.arrowLeft" === en)) {
        var pd_0 = ((i0.ɵnov(_v, 1).keyboard && i0.ɵnov(_v, 1).prev(i0.ɵnov(_v, 1).NgbSlideEventSource.ARROW_LEFT)) !== false);
        ad = (pd_0 && ad);
    } if (("keydown.arrowRight" === en)) {
        var pd_1 = ((i0.ɵnov(_v, 1).keyboard && i0.ɵnov(_v, 1).next(i0.ɵnov(_v, 1).NgbSlideEventSource.ARROW_RIGHT)) !== false);
        ad = (pd_1 && ad);
    } if (("mouseenter" === en)) {
        var pd_2 = (i0.ɵnov(_v, 1).mouseEnter() !== false);
        ad = (pd_2 && ad);
    } if (("mouseleave" === en)) {
        var pd_3 = (i0.ɵnov(_v, 1).mouseLeave() !== false);
        ad = (pd_3 && ad);
    } return ad; }, View_OtCarousel_0, RenderType_OtCarousel)), i0.ɵdid(1, 3325952, null, 1, i2.OtCarousel, [i3.OTCarouselConfig, i0.PLATFORM_ID, i0.NgZone, i0.ChangeDetectorRef], null, null), i0.ɵqud(603979776, 1, { slides: 1 })], null, function (_ck, _v) { var currVal_0 = "block"; _ck(_v, 0, 0, currVal_0); }); }
var OtCarouselNgFactory = i0.ɵccf("ot-carousel", i2.OtCarousel, View_OtCarousel_Host_0, { activeId: "activeId", interval: "interval", wrap: "wrap", keyboard: "keyboard", pauseOnHover: "pauseOnHover", showNavigationArrows: "showNavigationArrows", showNavigationIndicators: "showNavigationIndicators" }, { slide: "slide" }, []);
export { OtCarouselNgFactory as OtCarouselNgFactory };
//# sourceMappingURL=carousel.component.ngfactory.js.map
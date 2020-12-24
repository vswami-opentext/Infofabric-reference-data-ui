/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
import * as i3 from "./breadcrumbs.component";
import * as i4 from "./breadcrumbs.service";
import * as i5 from "@ngx-translate/core";
var styles_BreadCrumbsComponent = [];
var RenderType_BreadCrumbsComponent = i0.ɵcrt({ encapsulation: 2, styles: styles_BreadCrumbsComponent, data: {} });
export { RenderType_BreadCrumbsComponent as RenderType_BreadCrumbsComponent };
function View_BreadCrumbsComponent_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "a", [["class", "ot-breadcrumb-item"]], [[8, "href", 4], [8, "target", 0]], null, null, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 1, "span", [["class", "ot-breadcrumb-item-title"]], null, null, null, null, null)), (_l()(), i0.ɵted(2, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = _v.parent.parent.context.$implicit.url; var currVal_1 = (_v.parent.parent.context.first ? "_top" : "_self"); _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_2 = _v.parent.parent.context.$implicit.label; _ck(_v, 2, 0, currVal_2); }); }
function View_BreadCrumbsComponent_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, "a", [["class", "ot-breadcrumb-item"], ["skipLocationChange", ""]], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (i0.ɵnov(_v, 1).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 671744, null, 0, i1.RouterLinkWithHref, [i1.Router, i1.ActivatedRoute, i2.LocationStrategy], { target: [0, "target"], skipLocationChange: [1, "skipLocationChange"], routerLink: [2, "routerLink"] }, null), (_l()(), i0.ɵeld(2, 0, null, null, 1, "span", [["class", "ot-breadcrumb-item-title"]], null, null, null, null, null)), (_l()(), i0.ɵted(3, null, ["", ""]))], function (_ck, _v) { var currVal_2 = (_v.parent.parent.context.first ? "_top" : "_self"); var currVal_3 = ""; var currVal_4 = (_v.parent.parent.context.$implicit.url || "#"); _ck(_v, 1, 0, currVal_2, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_0 = i0.ɵnov(_v, 1).target; var currVal_1 = i0.ɵnov(_v, 1).href; _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_5 = _v.parent.parent.context.$implicit.label; _ck(_v, 3, 0, currVal_5); }); }
function View_BreadCrumbsComponent_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 5, null, null, null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_BreadCrumbsComponent_3)), i0.ɵdid(2, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_BreadCrumbsComponent_4)), i0.ɵdid(4, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵeld(5, 0, null, null, 0, "span", [["class", "ot-breadcrumb-navigation-icon"]], null, null, null, null, null))], function (_ck, _v) { var currVal_0 = _v.parent.context.first; _ck(_v, 2, 0, currVal_0); var currVal_1 = !_v.parent.context.first; _ck(_v, 4, 0, currVal_1); }, null); }
function View_BreadCrumbsComponent_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [["class", "ot-breadcrumb-item-title-active"]], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.label; _ck(_v, 1, 0, currVal_0); }); }
function View_BreadCrumbsComponent_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, "span", [], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_BreadCrumbsComponent_2)), i0.ɵdid(2, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"], ngIfElse: [1, "ngIfElse"] }, null), (_l()(), i0.ɵand(0, [["lastOne", 2]], null, 0, null, View_BreadCrumbsComponent_5))], function (_ck, _v) { var currVal_0 = !_v.context.last; var currVal_1 = i0.ɵnov(_v, 3); _ck(_v, 2, 0, currVal_0, currVal_1); }, null); }
export function View_BreadCrumbsComponent_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "nav", [["class", "ot-breadcrumb ot-breadcrumb-container"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_BreadCrumbsComponent_1)), i0.ɵdid(2, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.items; _ck(_v, 2, 0, currVal_0); }, null); }
export function View_BreadCrumbsComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "ot-breadcrumb", [], null, null, null, View_BreadCrumbsComponent_0, RenderType_BreadCrumbsComponent)), i0.ɵdid(1, 245760, null, 0, i3.BreadCrumbsComponent, [i1.Router, i4.BreadCrumbsService, i1.ActivatedRoute, i5.TranslateService], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var BreadCrumbsComponentNgFactory = i0.ɵccf("ot-breadcrumb", i3.BreadCrumbsComponent, View_BreadCrumbsComponent_Host_0, { appHomeLabel: "appHomeLabel", appHomeRoute: "appHomeRoute" }, {}, []);
export { BreadCrumbsComponentNgFactory as BreadCrumbsComponentNgFactory };
//# sourceMappingURL=breadcrumbs.component.ngfactory.js.map
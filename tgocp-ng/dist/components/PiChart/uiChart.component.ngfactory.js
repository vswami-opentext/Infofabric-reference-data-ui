/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./uiChart.component";
import * as i2 from "@angular/common";
var ChartModuleNgFactory = i0.ɵcmf(i1.ChartModule, [], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, []], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(4608, i2.NgLocalization, i2.NgLocaleLocalization, [i0.LOCALE_ID, [2, i2.ɵangular_packages_common_common_a]]), i0.ɵmpd(1073742336, i2.CommonModule, i2.CommonModule, []), i0.ɵmpd(1073742336, i1.ChartModule, i1.ChartModule, [])]); });
export { ChartModuleNgFactory as ChartModuleNgFactory };
var styles_UIChart = [];
var RenderType_UIChart = i0.ɵcrt({ encapsulation: 2, styles: styles_UIChart, data: {} });
export { RenderType_UIChart as RenderType_UIChart };
export function View_UIChart_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "div", [["style", "position:relative"]], [[4, "width", null], [4, "height", null]], null, null, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 0, "canvas", [], [[1, "width", 0], [1, "height", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onCanvasClick($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = ((_co.responsive && !_co.width) ? null : _co.width); var currVal_1 = ((_co.responsive && !_co.height) ? null : _co.height); _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_2 = ((_co.responsive && !_co.width) ? null : _co.width); var currVal_3 = ((_co.responsive && !_co.height) ? null : _co.height); _ck(_v, 1, 0, currVal_2, currVal_3); }); }
export function View_UIChart_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "ot-chart", [], null, null, null, View_UIChart_0, RenderType_UIChart)), i0.ɵdid(1, 4374528, null, 0, i1.UIChart, [i0.ElementRef], null, null)], null, null); }
var UIChartNgFactory = i0.ɵccf("ot-chart", i1.UIChart, View_UIChart_Host_0, { type: "type", options: "options", width: "width", height: "height", responsive: "responsive", data: "data" }, { onDataSelect: "onDataSelect" }, []);
export { UIChartNgFactory as UIChartNgFactory };
//# sourceMappingURL=uiChart.component.ngfactory.js.map
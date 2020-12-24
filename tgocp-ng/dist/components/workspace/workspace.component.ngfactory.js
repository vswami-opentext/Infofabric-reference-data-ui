/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./workspace.component";
import * as i2 from "@angular/common";
import * as i3 from "../tab/tab";
import * as i4 from "../PiChart/uiChart.component";
import * as i5 from "../tab/tab.ngfactory";
import * as i6 from "../dom/domhandler";
var WorkspaceModuleNgFactory = i0.ɵcmf(i1.WorkspaceModule, [], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, []], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(4608, i2.NgLocalization, i2.NgLocaleLocalization, [i0.LOCALE_ID, [2, i2.ɵangular_packages_common_common_a]]), i0.ɵmpd(4608, i1.WorkspaceService, i1.WorkspaceService, []), i0.ɵmpd(1073742336, i2.CommonModule, i2.CommonModule, []), i0.ɵmpd(1073742336, i3.TabModule, i3.TabModule, []), i0.ɵmpd(1073742336, i4.ChartModule, i4.ChartModule, []), i0.ɵmpd(1073742336, i1.WorkspaceModule, i1.WorkspaceModule, [])]); });
export { WorkspaceModuleNgFactory as WorkspaceModuleNgFactory };
var styles_WorkspaceComponent = [];
var RenderType_WorkspaceComponent = i0.ɵcrt({ encapsulation: 2, styles: styles_WorkspaceComponent, data: {} });
export { RenderType_WorkspaceComponent as RenderType_WorkspaceComponent };
function View_WorkspaceComponent_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "li", [], null, null, null, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 1, "a", [["aria-selected", "true"], ["class", "ot-ux-tab-nav-link"]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.tabClick(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵted(2, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = i0.ɵinlineInterpolate(1, "", _v.context.$implicit, ""); _ck(_v, 1, 0, currVal_0); var currVal_1 = _v.context.$implicit; _ck(_v, 2, 0, currVal_1); }); }
export function View_WorkspaceComponent_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 5, "div", [["class", "ot-landing-page-header"]], null, null, null, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 0, "div", [["class", "ot-ui-app-icon"]], null, null, null, null, null)), (_l()(), i0.ɵeld(2, 0, null, null, 1, "div", [["class", "ot-ui-app-title"]], null, null, null, null, null)), (_l()(), i0.ɵted(3, null, ["", ""])), (_l()(), i0.ɵeld(4, 0, null, null, 1, "div", [["class", "ot-ui-chart"], ["style", "width: 20.89em;float:right;margin-top: -.9em;"]], null, null, null, null, null)), i0.ɵncd(null, 0), (_l()(), i0.ɵeld(6, 0, null, null, 4, "ot-tab", [["align", "right"], ["theme", "dark"]], null, null, null, i5.View_Tab_0, i5.RenderType_Tab)), i0.ɵprd(512, null, i6.DomHandler, i6.DomHandler, []), i0.ɵdid(8, 4243456, null, 0, i3.Tab, [i6.DomHandler], { theme: [0, "theme"], align: [1, "align"] }, null), (_l()(), i0.ɵand(16777216, null, 0, 1, null, View_WorkspaceComponent_1)), i0.ɵdid(10, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_1 = "dark"; var currVal_2 = "right"; _ck(_v, 8, 0, currVal_1, currVal_2); var currVal_3 = _co.tabNameList; _ck(_v, 10, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.appName; _ck(_v, 3, 0, currVal_0); }); }
export function View_WorkspaceComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "ot-workspace", [], null, null, null, View_WorkspaceComponent_0, RenderType_WorkspaceComponent)), i0.ɵdid(1, 114688, null, 0, i1.WorkspaceComponent, [i1.WorkspaceService], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var WorkspaceComponentNgFactory = i0.ɵccf("ot-workspace", i1.WorkspaceComponent, View_WorkspaceComponent_Host_0, { appName: "appName", tabNameList: "tabNameList" }, {}, ["*"]);
export { WorkspaceComponentNgFactory as WorkspaceComponentNgFactory };
//# sourceMappingURL=workspace.component.ngfactory.js.map
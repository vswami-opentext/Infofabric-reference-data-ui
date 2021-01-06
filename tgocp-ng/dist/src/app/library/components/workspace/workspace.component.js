var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabModule } from '../tab/tab';
import { ChartModule } from '../PiChart/uiChart.component';
import { Subject } from 'rxjs';
var WorkspaceService = /** @class */ (function () {
    function WorkspaceService() {
        this.workSpaceTabSubject = new Subject();
    }
    WorkspaceService.prototype._clickTab = function (tabName) {
        this.workSpaceTabSubject.next(tabName);
    };
    WorkspaceService = __decorate([
        Injectable()
    ], WorkspaceService);
    return WorkspaceService;
}());
export { WorkspaceService };
var WorkspaceComponent = /** @class */ (function () {
    function WorkspaceComponent(wService) {
        this.wService = wService;
        this.tabNameList = [];
    }
    WorkspaceComponent.prototype.ngOnInit = function () {
    };
    WorkspaceComponent.prototype.tabClick = function (tabName) {
        this.wService._clickTab(tabName);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], WorkspaceComponent.prototype, "appName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], WorkspaceComponent.prototype, "tabNameList", void 0);
    WorkspaceComponent = __decorate([
        Component({
            selector: 'ot-workspace',
            template: "<div class=\"ot-landing-page-header\">\r\n    <div class=\"ot-ui-app-icon\"></div>\r\n    <div class=\"ot-ui-app-title\">{{appName}}</div>\r\n    <div class=\"ot-ui-chart\" style=\"width: 20.89em;float:right;margin-top: -.9em;\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n</div>\r\n<ot-tab theme=\"dark\" align=\"right\">\r\n    <li *ngFor=\"let tabName of tabNameList\">\r\n        <a class=\"ot-ux-tab-nav-link\" aria-selected=\"true\" title=\"{{tabName}}\" (click)=\"tabClick(tabName)\">{{tabName}}</a>\r\n    </li>\r\n</ot-tab>"
        }),
        __metadata("design:paramtypes", [WorkspaceService])
    ], WorkspaceComponent);
    return WorkspaceComponent;
}());
export { WorkspaceComponent };
var WorkspaceModule = /** @class */ (function () {
    function WorkspaceModule() {
    }
    WorkspaceModule = __decorate([
        NgModule({
            imports: [CommonModule, TabModule, ChartModule],
            exports: [WorkspaceComponent],
            declarations: [WorkspaceComponent],
            providers: [WorkspaceService]
        })
    ], WorkspaceModule);
    return WorkspaceModule;
}());
export { WorkspaceModule };
//# sourceMappingURL=workspace.component.js.map
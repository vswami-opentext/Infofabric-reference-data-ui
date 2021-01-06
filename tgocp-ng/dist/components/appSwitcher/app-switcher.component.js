var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Input, ViewChild } from "@angular/core";
import { OverlayPanelModule } from "../overlaypanel/overlaypanel";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
var AppSwitcherComponent = /** @class */ (function () {
    function AppSwitcherComponent() {
        this.showContent = false;
    }
    AppSwitcherComponent.prototype.ngOnInit = function () {
        //throw new Error("Method not implemented.");
    };
    ;
    AppSwitcherComponent.prototype.openAppPanel = function () {
        this.showContent = !this.showContent;
    };
    AppSwitcherComponent.prototype.handleOnClick = function (value) {
        if (!value) {
            return;
        }
        window.open(value);
    };
    AppSwitcherComponent.prototype.onAfterHideFun = function () {
        // console.log(" onAfterHideFun:", this.showContent)
        this.showContent = false;
    };
    __decorate([
        ViewChild(PerfectScrollbarDirective),
        __metadata("design:type", PerfectScrollbarDirective)
    ], AppSwitcherComponent.prototype, "directiveScroll", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AppSwitcherComponent.prototype, "appLauncherList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AppSwitcherComponent.prototype, "flag", void 0);
    AppSwitcherComponent = __decorate([
        Component({
            selector: 'ot-app-switcher',
            template: "<div [ngClass]=\"[showContent ? 'ot-app-switcher-icon-wrapper-active':'',flag ? 'ot-app-switcher-icon' : '']\"(click)=\"openAppPanel();op.toggle($event)\">\r\n    <span class=\"ot-header-app-switcher-icon\" [ngClass]=\"showContent ? 'ot-header-app-switcher-icon-active':'ot-header-app-switcher-icon'\">\r\n    </span>\r\n</div>\r\n<div class=\"ot-app-switcher-panel-pos\" [ngClass]=\"showContent ? 'ot-app-switcher-panel-pos':'ot-app-switcher-panel-postn'\">\r\n    <p-overlayPanel #op (onAfterHide)=\"onAfterHideFun()\">\r\n        <div class=\"ot-flex-container\" [perfectScrollbar]=\"{suppressScrollX: true, minScrollbarLength:16}\">\r\n            <div *ngFor=\"let app of appLauncherList;let i=index\">\r\n                <div class=\"ot-app-switcher-icon-container\" (click)=\"handleOnClick(app.src);op.hide($event)\">\r\n                    <div class=\"ot-app-switcher-img-folder\">\r\n                        <span style=\"width:100%;height:100%\" [ngStyle]=\"{background: 'url(' + app.tileMetaInfo.appSwitcherIconURL + ')'}\"></span>\r\n                    </div>\r\n                    <span class=\"ot-app-switcher-text\">{{app.header.displayText}}</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </p-overlayPanel>\r\n</div>"
        }),
        __metadata("design:paramtypes", [])
    ], AppSwitcherComponent);
    return AppSwitcherComponent;
}());
export { AppSwitcherComponent };
var AppSwitcherModule = /** @class */ (function () {
    function AppSwitcherModule() {
    }
    AppSwitcherModule = __decorate([
        NgModule({
            declarations: [AppSwitcherComponent],
            exports: [AppSwitcherComponent],
            imports: [OverlayPanelModule, CommonModule, PerfectScrollbarModule]
        })
    ], AppSwitcherModule);
    return AppSwitcherModule;
}());
export { AppSwitcherModule };
//# sourceMappingURL=app-switcher.component.js.map
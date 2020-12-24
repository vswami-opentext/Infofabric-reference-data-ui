var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgModule, EventEmitter, Output, Input, HostListener, ElementRef } from '@angular/core';
import { SearchModule } from "../search/search.component";
import { CommonModule } from '@angular/common';
var HomepageHeaderComponent = /** @class */ (function () {
    function HomepageHeaderComponent(el) {
        this.el = el;
        this.myProfileActive = false;
        this.clickOn = new EventEmitter();
    }
    HomepageHeaderComponent.prototype.ngOnInit = function () {
    };
    HomepageHeaderComponent.prototype.myProfileClick = function () {
        this.myProfileActive = !this.myProfileActive;
    };
    HomepageHeaderComponent.prototype.clicked = function (button) {
        this.clickOn.emit(button);
    };
    HomepageHeaderComponent.prototype.handleClick = function (event) {
        if (event.target.className) {
            if ((event.target.className.toString().indexOf('ot-header-profile-pic-image') > -1) || (event.target.className.toString().indexOf('ot-header-profile-pic-mask') > -1)) {
                this.myProfileActive = this.myProfileActive;
            }
            else {
                this.myProfileActive = false;
            }
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HomepageHeaderComponent.prototype, "profileImageSrc", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], HomepageHeaderComponent.prototype, "clickOn", void 0);
    __decorate([
        HostListener('document:click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], HomepageHeaderComponent.prototype, "handleClick", null);
    HomepageHeaderComponent = __decorate([
        Component({
            selector: 'ot-homepage-header',
            template: "<div class=\"ot-homepage-header\">\n    <ng-content select=\"[customContent]\"></ng-content>\n    <div *ngIf=false class=\"ot-help-btn ot-icon\" (click)=\"clicked('help')\"></div>\n   <!--  <div class=\"ot-home-btn ot-icon\" (click)=\"clicked('home')\"></div> -->\n    <!--<div class=\"ot-carrot ot-carrot-down ot-icon\"></div>-->\n    <div class=\"ot-brand\">\n        <div class=\"ot-brand-image-container\">\n            <div class=\"ot-brand-image\"></div>\n        </div>\n        <!--<div class=\"ot-search-bar\">   \n    <ot-search></ot-search>\n    </div>-->\n    </div>\n    <!--<div class=\"ot-favorite-btn ot-icon\"></div>-->\n    <ng-content select=\"[appSwitcher]\"></ng-content>\n    <div [attr.data-active]=\"myProfileActive\" (click)=\"myProfileClick()\" class=\"ot-profile-pic ot-profile-custm\">\n        <div class=\"ot-header-profile-pic-mask\">\n            <span *ngIf=\"profileImageSrc; else defaultImage\" class=\"ot-profile-placeholder\" [ngStyle]=\"{background: 'url(' + profileImageSrc + ')'}\"></span>\n            <ng-template #defaultImage>\n                <span class=\"ot-header-profile-pic-image\" [ngStyle]=\"!myProfileActive ? '':{'background-color':'#111b57'}\"></span>\n            </ng-template>\n        </div>\n        <ul [hidden]=\"!myProfileActive\" class=\"ot-profile-dropdown-menu ot-profile-dropdown\">\n            <ng-content select=\"[profileLinks]\"></ng-content>\n        </ul>\n    </div>\n  </div>"
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], HomepageHeaderComponent);
    return HomepageHeaderComponent;
}());
export { HomepageHeaderComponent };
var HomePageHeaderModule = /** @class */ (function () {
    function HomePageHeaderModule() {
    }
    HomePageHeaderModule = __decorate([
        NgModule({
            declarations: [HomepageHeaderComponent],
            exports: [HomepageHeaderComponent],
            imports: [SearchModule, CommonModule]
        })
    ], HomePageHeaderModule);
    return HomePageHeaderModule;
}());
export { HomePageHeaderModule };
//# sourceMappingURL=homepage-header.component.js.map
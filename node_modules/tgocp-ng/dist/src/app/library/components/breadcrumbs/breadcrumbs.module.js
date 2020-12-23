var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbsComponent } from "./breadcrumbs.component";
import { BreadCrumbsService } from "./breadcrumbs.service";
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
var BreadCrumbsModule = /** @class */ (function () {
    function BreadCrumbsModule() {
    }
    BreadCrumbsModule = __decorate([
        NgModule({
            imports: [CommonModule, RouterModule],
            declarations: [BreadCrumbsComponent],
            exports: [BreadCrumbsComponent],
            providers: [BreadCrumbsService, TranslateService]
        })
    ], BreadCrumbsModule);
    return BreadCrumbsModule;
}());
export { BreadCrumbsModule };
//# sourceMappingURL=breadcrumbs.module.js.map
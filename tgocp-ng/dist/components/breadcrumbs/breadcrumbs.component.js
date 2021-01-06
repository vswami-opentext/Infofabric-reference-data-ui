var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BreadCrumbsService } from './breadcrumbs.service';
import { TranslateService } from '@ngx-translate/core';
var BreadCrumbsComponent = /** @class */ (function () {
    function BreadCrumbsComponent(router, breadCrumbsService, route, translate) {
        var _this = this;
        this.breadCrumbsService = breadCrumbsService;
        this.route = route;
        this.translate = translate;
        this.homePageUrl = "#";
        this.items = [];
        this.appHomeLabel = "";
        this.appHomeRoute = "";
        this.count = 0;
        router.events.subscribe(function (event) {
            if (event instanceof NavigationEnd) {
                var snapshot = _this.route.snapshot;
                var activated = _this.route.firstChild;
                // Traversing the active route tree
                if (activated != null) {
                    while (activated != null) {
                        snapshot = activated.snapshot;
                        activated = activated.firstChild;
                    }
                }
                var label = snapshot.data['breadcrumb-label'] || "";
                var hide = snapshot.data['hideBreadcrumb'] || false;
                if (snapshot.data.userLocale) {
                    _this.translate.use(snapshot.data.userLocale);
                }
                if (_this.count == 0 && !hide) {
                    _this.translate.get("common.breadCrumb.home").subscribe(function (res) {
                        _this.breadCrumbsService.addBreadCrumbItem({ label: res, url: '/neocp/#/homepage' });
                        if (_this.appHomeLabel && _this.appHomeRoute) {
                            _this.translate.get(_this.appHomeLabel + '.title').subscribe(function (res) {
                                _this.breadCrumbsService.addBreadCrumbItem({ label: res, url: _this.appHomeRoute });
                            });
                        }
                        _this.count++;
                    });
                }
                if (label) {
                    _this.translate.get(label + '.title').subscribe(function (res) {
                        _this.breadCrumbsService.addBreadCrumbItem({ label: res, url: event['urlAfterRedirects'] }, (_this.appHomeLabel && _this.appHomeRoute) ? true : false);
                        _this.count++;
                    });
                }
                else if (event['urlAfterRedirects']) {
                    var items = _this.breadCrumbsService.items;
                    var existingItem = items.find(function (x) { return x.url === event['urlAfterRedirects']; });
                    if (existingItem) {
                        _this.breadCrumbsService.addBreadCrumbItem({ label: existingItem.label, url: event['urlAfterRedirects'] }, (_this.appHomeLabel && _this.appHomeRoute) ? true : false);
                        _this.count++;
                    }
                }
            }
        });
    }
    BreadCrumbsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            if (data.userLocale) {
                _this.translate.use(data.userLocale);
            }
        });
        this.subscription = this.breadCrumbsService.breadCrumbsState
            .subscribe(function (state) {
            _this.items = state;
        });
        this.initVariables();
    };
    BreadCrumbsComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    BreadCrumbsComponent.prototype.initVariables = function () {
        this.homePage = { url: this.homePageUrl, target: '_top' };
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BreadCrumbsComponent.prototype, "appHomeLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BreadCrumbsComponent.prototype, "appHomeRoute", void 0);
    BreadCrumbsComponent = __decorate([
        Component({
            selector: 'ot-breadcrumb',
            template: "\r\n    <nav class=\"ot-breadcrumb ot-breadcrumb-container\">\r\n        <span *ngFor=\"let item of items; let last = last; let first= first;\"  >\r\n            <ng-container *ngIf=\"!last else lastOne\">\r\n                    <a *ngIf=\"first\" [href]=\"item.url\"  class=\"ot-breadcrumb-item\"  [target]=\"first?'_top': '_self'\" >\r\n                            <span class=\"ot-breadcrumb-item-title\">{{item.label}}</span>\r\n                     </a>\r\n                <a *ngIf=\"!first\"  [routerLink]=\"item.url||'#'\" skipLocationChange class=\"ot-breadcrumb-item\"  [target]=\"first?'_top': '_self'\" >\r\n                    <span class=\"ot-breadcrumb-item-title\">{{item.label}}</span>\r\n                </a>\r\n                <span class=\"ot-breadcrumb-navigation-icon\"></span>\r\n            </ng-container>\r\n            <ng-template #lastOne>\r\n                <span class=\"ot-breadcrumb-item-title-active\">{{item.label}}</span>\r\n            </ng-template>\r\n        </span>\r\n      </nav>"
        }),
        __metadata("design:paramtypes", [Router,
            BreadCrumbsService,
            ActivatedRoute,
            TranslateService])
    ], BreadCrumbsComponent);
    return BreadCrumbsComponent;
}());
export { BreadCrumbsComponent };
//# sourceMappingURL=breadcrumbs.component.js.map
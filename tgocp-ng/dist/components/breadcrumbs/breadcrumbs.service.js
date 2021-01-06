var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var BreadCrumbsService = /** @class */ (function () {
    function BreadCrumbsService() {
        this.items = [];
        this.breadCrumbsSubject = new Subject();
        this.breadCrumbsState = this.breadCrumbsSubject.asObservable();
    }
    BreadCrumbsService.prototype.addBreadCrumbItem = function (data, hasAppHome) {
        data.url = data.url;
        var index = this.items.findIndex(function (x) { return x.label == data.label; });
        if (index != -1) {
            this.items.splice(index + 1, this.items.length);
        }
        else {
            if (!hasAppHome && this.items.length > 1 && data.url.search(this.items[this.items.length - 1].url) == -1) {
                this.items.splice(this.items.length - 1, 1);
            }
            else if (hasAppHome && this.items.length > 2 && data.url.search(this.items[this.items.length - 1].url) == -1) {
                this.items.splice(this.items.length - 1, 1);
            }
            this.items.push(data);
        }
        this.breadCrumbsSubject.next(this.items);
    };
    BreadCrumbsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], BreadCrumbsService);
    return BreadCrumbsService;
}());
export { BreadCrumbsService };
//# sourceMappingURL=breadcrumbs.service.js.map
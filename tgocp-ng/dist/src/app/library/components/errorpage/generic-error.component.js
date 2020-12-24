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
import { Location } from '@angular/common';
var GenericErrorComponent = /** @class */ (function () {
    function GenericErrorComponent(location) {
        this.location = location;
        this.errorMsg = [];
    }
    GenericErrorComponent.prototype.goback = function () {
        this.location.back();
    };
    GenericErrorComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], GenericErrorComponent.prototype, "errorMsg", void 0);
    GenericErrorComponent = __decorate([
        Component({
            selector: 'ot-system-error',
            template: "<div class=\"ot-error-page\">\r\n  <div class=\"ot-homepage-header\">\r\n      <div class=\"ot-brand\">\r\n          <div class=\"ot-brand-image-container\">\r\n              <div class=\"ot-brand-image\"></div>\r\n          </div>\r\n      </div>\r\n  </div>\r\n  <div class=\"ot-errorContent\">\r\n      <div class=\"ot-message-ui-overlay-header\"\r\n          *ngIf=\"pageNotFound; else elseBlock\"><div *ngFor=\"let errorMsg of ErrorMsg \">{{ErrorMsg}}</div></div>\r\n      <ng-template #elseBlock>\r\n          <div class=\"ot-message-ui-overlay-header\">\r\n            <div *ngFor=\"let ErrorMsg of errorMsg \">{{ErrorMsg}}</div></div>\r\n          <!-- <div class=\"errorType\">500 internal server error</div> -->\r\n      </ng-template>\r\n      <div class=\"ot-error-flex\">\r\n          <div class=\"ot-error-mr\">\r\n              <div class=\"ot-error-img\">\r\n                  <div class=\"ot-error-back\"></div>\r\n              </div>\r\n              <a (click)=\"goback()\" href=\"javascript:void(0)\" class=\"ot-error-ah\">Go back</a>\r\n          </div>\r\n          <div class=\"ot-error-ml\">\r\n              <div class=\"ot-error-img\">\r\n                  <div class=\"ot-error-home\"></div>\r\n              </div>\r\n              <a class=\"ot-error-ah\" href=\"\">Home</a>\r\n          </div>\r\n      </div>\r\n  </div>\r\n</div>"
        }),
        __metadata("design:paramtypes", [Location])
    ], GenericErrorComponent);
    return GenericErrorComponent;
}());
export { GenericErrorComponent };
//# sourceMappingURL=generic-error.component.js.map
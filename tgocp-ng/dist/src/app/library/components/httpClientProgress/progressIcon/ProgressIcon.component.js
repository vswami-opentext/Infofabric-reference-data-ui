var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClientInterceptorService } from '../services/httpInteceptor.service';
var ProgressIconComponent = /** @class */ (function () {
    function ProgressIconComponent(httpService, ref) {
        this.httpService = httpService;
        this.ref = ref;
        this.show = false;
    }
    ProgressIconComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.httpService.pendingRequestsStatus
            .subscribe(function (state) {
            _this.show = state;
            _this.ref.detectChanges();
        });
    };
    ProgressIconComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ProgressIconComponent = __decorate([
        Component({
            selector: 'http-loader',
            template: "<div class=\"ot-load-container\" [style.display]=\"show ? 'block' : 'none'\">\r\n    <div class=\"ot-outer-border\">\r\n      <div class=\"ot-loader\">\r\n      </div>\r\n    </div>\r\n</div>"
        }),
        __metadata("design:paramtypes", [HttpClientInterceptorService, ChangeDetectorRef])
    ], ProgressIconComponent);
    return ProgressIconComponent;
}());
export { ProgressIconComponent };
//# sourceMappingURL=ProgressIcon.component.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { throwError as observableThrowError, Subject } from 'rxjs';
import { finalize, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// This will intercept http call and display/hide loader icon
var HttpClientInterceptorService = /** @class */ (function () {
    function HttpClientInterceptorService() {
        this._pendingRequests = 0;
        this._pendingRequestsStatus = new Subject();
    }
    Object.defineProperty(HttpClientInterceptorService.prototype, "pendingRequestsStatus", {
        get: function () {
            return this._pendingRequestsStatus.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HttpClientInterceptorService.prototype, "pendingRequests", {
        get: function () {
            return this._pendingRequests;
        },
        enumerable: true,
        configurable: true
    });
    HttpClientInterceptorService.prototype.intercept = function (request, next) {
        var _this = this;
        // Below code Lets http call use wihout Loader
        var showLoader = true;
        if (request.params.has('hideLoader') && request.params.get('hideLoader') == 'true') {
            showLoader = false;
        }
        else {
            this._pendingRequests++;
        }
        request = request.clone({
            setHeaders: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        if (1 === this._pendingRequests && showLoader) {
            this._pendingRequestsStatus.next(true);
        }
        return next.handle(request).pipe(map(function (event) {
            return event;
        }), catchError(function (error) {
            return observableThrowError(error);
        }), finalize(function () {
            if (_this._pendingRequests > 0)
                _this._pendingRequests--;
            if (0 === _this._pendingRequests) {
                _this._pendingRequestsStatus.next(false);
            }
        }));
    };
    HttpClientInterceptorService = __decorate([
        Injectable()
    ], HttpClientInterceptorService);
    return HttpClientInterceptorService;
}());
export { HttpClientInterceptorService };
export function HttpInterceptorServiceFactory() {
    return new HttpClientInterceptorService();
}
export var HttpInterceptorServiceFactoryProvider = {
    provide: HttpClientInterceptorService,
    useFactory: HttpInterceptorServiceFactory
};
//# sourceMappingURL=httpInteceptor.service.js.map
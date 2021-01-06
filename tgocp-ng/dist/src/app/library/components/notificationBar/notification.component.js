var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, ChangeDetectorRef, Input } from '@angular/core';
import { trigger, animate, transition, style } from '@angular/animations';
import { NotificationService } from './notification.service';
import { NotificationProperties } from './notification.properties';
import notificationLocalelabels from './notification_labels.json';
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(notificationService, cdr) {
        this.notificationService = notificationService;
        this.cdr = cdr;
        this.showDetails = false;
        this.properties = new NotificationProperties();
        this._locale = {
            moredetails: "More Details...",
            fewerdetails: "Fewer Details...",
            title: "Server unable to process request"
        };
        this._language = "en";
    }
    NotificationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.notificationService.notificationState
            .subscribe(function (state) {
            _this.properties = state;
            _this.showDetails = false;
            _this.cdr.detectChanges();
        });
    };
    NotificationComponent.prototype.ngAfterViewChecked = function () {
        this.cdr.detectChanges();
    };
    NotificationComponent.prototype.applyContentWidth = function () {
        var width = this.h1.nativeElement.offsetWidth;
        return width + 'px';
    };
    NotificationComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    Object.defineProperty(NotificationComponent.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        set: function (newLocale) {
            if (newLocale) {
                this._language = newLocale;
                this._locale = notificationLocalelabels[newLocale] ? notificationLocalelabels[newLocale] : this._locale;
            }
        },
        enumerable: true,
        configurable: true
    });
    NotificationComponent.prototype.changeIcon = function () {
        var iconStyle = "";
        switch (this.properties.type) {
            case "success": {
                iconStyle = "ot-notification-icons ot-notification-icon-success";
                break;
            }
            case "warning": {
                iconStyle = "ot-notification-icons ot-notification-icon-warning";
                break;
            }
            case "error": {
                iconStyle = "ot-notification-icons  ot-notification-icon-error";
                break;
            }
            case "info": {
                iconStyle = "ot-notification-icons  ot-notification-icon-info";
                break;
            }
        }
        return iconStyle;
    };
    NotificationComponent.prototype.toggleContentIcon = function () {
        if (this.showDetails == false) {
            return "ot-caret-down";
        }
        else {
            return "ot-caret-up";
        }
    };
    __decorate([
        ViewChild('h1'),
        __metadata("design:type", ElementRef)
    ], NotificationComponent.prototype, "h1", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NotificationComponent.prototype, "locale", null);
    NotificationComponent = __decorate([
        Component({
            selector: 'ot-notification',
            template: "<div class=\"ot-notification-container\">\r\n    <div [@dialog]='showDetails' *ngIf=\"properties.show\" class=\"ot-notification-position\">\r\n        <div class=\"ot-notification-content\">\r\n            <div #h1 class=\"ot-notification-panel ot-notificationHeight ot-notification-panel-body  {{showDetails?(properties.moreDetails.length == 1?'':'ot-border-bottom-collapsed-') : 'ot-border-bottom-'}}{{properties.type}}\">\r\n                <p class=\"ot-notification-header\">\r\n                    <i class=\"ot-notification-pull-left\" [ngClass]=\"changeIcon()\"></i>\r\n                    <span class=\"ot-notification-title\"> {{properties.title?properties.title:_locale.title}}</span>\r\n                    <span (click)=\"properties.show=false\" aria-label=\"Close\" class=\"ot-close-icon ot-notification-pull-right\"></span>\r\n                    <i *ngIf=\"properties.moreDetails.length &gt; 1\" (click)=\"showDetails=!showDetails;\" class=\"ot-notification-pull-right\" [ngClass]=\"toggleContentIcon()\"></i>\r\n                </p>\r\n                <div *ngIf=\"properties.moreDetails.length == 1 && !showDetails\" class=\"ot-notification-detail-link\"><a (click)=\"showDetails=true\"> {{_locale.moredetails}}</a></div>\r\n            </div>\r\n            <div [ngStyle]=\"{'width':applyContentWidth()}\" *ngIf=\"showDetails\" class=\"ot-border-bottom-{{properties.type}}\">\r\n  \r\n                <div class=\"ot-notification-body ot-notification-panel-body\">\r\n  \r\n                    <div *ngFor=\"let i of properties.moreDetails\">\r\n                        <p>{{i}}</p>\r\n                        <hr *ngIf=\"properties.moreDetails.length &gt; 1\">\r\n                    </div>\r\n                    <p class=\"ot-notification-detail-link\"><a (click)=\"showDetails=false\">{{_locale.fewerdetails}}</a></p>\r\n                </div>\r\n  \r\n                <!-- <ng-content></ng-content> -->\r\n            </div>\r\n        </div>\r\n    </div>\r\n  </div>",
            animations: [
                trigger('dialog', [
                    transition(':enter', [
                        style({ transform: 'translateY(-100%)', opacity: 0 }),
                        animate('800ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }))
                    ]),
                    transition(':leave', [
                        style({ transform: 'translateY(1%)', opacity: 1 }),
                        animate('800ms ease-out', style({ transform: 'translateY(-100%)', opacity: 0 }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [NotificationService,
            ChangeDetectorRef])
    ], NotificationComponent);
    return NotificationComponent;
}());
export { NotificationComponent };
//# sourceMappingURL=notification.component.js.map
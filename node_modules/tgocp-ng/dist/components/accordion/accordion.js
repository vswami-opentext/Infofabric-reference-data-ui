var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, ContentChildren, QueryList, ChangeDetectorRef, Inject, forwardRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Header } from '../common/shared';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PSscrollUtils } from '../../shared/perfect-scrollbar-config';
var idx = 0;
var AccordionTab = /** @class */ (function () {
    function AccordionTab(accordion) {
        this.accordion = accordion;
        this.selectedChange = new EventEmitter();
        this.onApply = new EventEmitter();
        this.onCancel = new EventEmitter();
        this.id = "ot-ui-accordiontab-" + idx++;
    }
    AccordionTab.prototype.toggle = function (event) {
        if (this.disabled || this.animating) {
            return false;
        }
        this.animating = true;
        var index = this.findTabIndex();
        if (this.selected) {
            this.selected = false;
            this.accordion.onClose.emit({ originalEvent: event, index: index });
        }
        else {
            if (!this.accordion.multiple) {
                for (var i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].selected = false;
                    this.accordion.tabs[i].selectedChange.emit(false);
                }
            }
            this.selected = true;
            this.accordion.onOpen.emit({ originalEvent: event, index: index });
        }
        this.selectedChange.emit(this.selected);
        event.preventDefault();
    };
    AccordionTab.prototype.onApplyFn = function ($event) {
        this.onApply.emit($event);
    };
    AccordionTab.prototype.onCancelFn = function ($event) {
        this.onCancel.emit($event);
    };
    AccordionTab.prototype.findTabIndex = function () {
        var index = -1;
        for (var i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    };
    Object.defineProperty(AccordionTab.prototype, "lazy", {
        get: function () {
            return this.accordion.lazy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionTab.prototype, "hasHeaderFacet", {
        get: function () {
            return this.headerFacet && this.headerFacet.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    AccordionTab.prototype.onToggleDone = function (event) {
        this.animating = false;
    };
    AccordionTab.prototype.ngOnDestroy = function () {
        this.accordion.tabs.splice(this.findTabIndex(), 1);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AccordionTab.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AccordionTab.prototype, "selected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AccordionTab.prototype, "disabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AccordionTab.prototype, "selectedChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AccordionTab.prototype, "onApply", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AccordionTab.prototype, "onCancel", void 0);
    __decorate([
        ContentChildren(Header),
        __metadata("design:type", QueryList)
    ], AccordionTab.prototype, "headerFacet", void 0);
    AccordionTab = __decorate([
        Component({
            selector: 'ot-accordionTab',
            template: "\r\n        <a href=\"#\" [attr.id]=\"id\" [attr.aria-controls]=\"id + '-content'\" role=\"tab\" [attr.aria-expanded]=\"selected\" (click)=\"toggle($event)\" (keydown.space)=\"toggle($event)\">\r\n            <div class=\"ot-ui-accordion-header ot-ui-corner-all\" [ngClass]=\"{'ot-ui-state-active': selected,'ot-ui-state-disabled':disabled}\">\r\n               \r\n                    <div class=\"ot-title-position\">\r\n                    <ng-container *ngIf=\"!hasHeaderFacet\">\r\n                        {{header}}\r\n                    </ng-container>\r\n                    <ng-content select=\"ot-header\" *ngIf=\"hasHeaderFacet\"></ng-content>\r\n                    </div>\r\n                    <div class=\"ot-ui-pull-right ot-circle-hover\">\r\n                     \r\n                        <span class=\"\" [ngClass]=\"{'ot-fa-direction-up': selected, 'ot-fa-direction-down': !selected}\"></span>\r\n                    </div>           \r\n            </div></a>\r\n            <div [attr.id]=\"id + '-content'\" class=\"ot-ui-accordion-content-wrapper\" [@tabContent]=\"selected ? 'visible' : 'hidden'\" (@tabContent.done)=\"onToggleDone($event)\"\r\n                [ngClass]=\"{'ot-ui-accordion-content-wrapper-overflown': !selected||animating}\" \r\n                role=\"region\" [attr.aria-hidden]=\"!selected\" [attr.aria-labelledby]=\"id\">\r\n                <div class=\"ot-ui-accordion-content ot-ui-widget-content\" *ngIf=\"lazy ? selected : true\">\r\n                    <ng-content></ng-content>\r\n                   <!-- <div class=\"ot-ui-helper-clearfix\">\r\n                     <div class=\"ot-ui-pull-right\" >\r\n                        <button class=\"ot-ux-btn-micro ot-ux-primary\" (click)=\"onApplyFn($event)\">Apply</button>\r\n                        <button class=\"ot-ux-btn-micro ot-ux-secondary\" (click)=\"onCancelFn($event)\">Cancel</button> \r\n                    </div>\r\n                    </div> -->\r\n                </div>            \r\n            </div>",
            animations: [
                trigger('tabContent', [
                    state('hidden', style({
                        height: '0'
                    })),
                    state('visible', style({
                        height: '*'
                    })),
                    transition('visible <=> hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
                ])
            ]
        }),
        __param(0, Inject(forwardRef(function () { return Accordion; }))),
        __metadata("design:paramtypes", [Accordion])
    ], AccordionTab);
    return AccordionTab;
}());
export { AccordionTab };
var Accordion = /** @class */ (function () {
    function Accordion(el, changeDetector) {
        this.el = el;
        this.changeDetector = changeDetector;
        this.onClose = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.psConfig = PSscrollUtils.scrollY();
        this.tabs = [];
    }
    Accordion.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.initTabs();
        this.tabListSubscription = this.tabList.changes.subscribe(function (_) {
            _this.initTabs();
            _this.changeDetector.markForCheck();
        });
    };
    Accordion.prototype.initTabs = function () {
        this.tabs = this.tabList.toArray();
    };
    Accordion.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Object.defineProperty(Accordion.prototype, "activeIndex", {
        get: function () {
            return this._activeIndex;
        },
        set: function (val) {
            this._activeIndex = val;
            if (this.tabs && this.tabs.length && this._activeIndex != null) {
                for (var i = 0; i < this.tabs.length; i++) {
                    var selected = this.multiple ? this._activeIndex.includes(i) : (i === this._activeIndex);
                    var changed = selected !== this.tabs[i].selected;
                    if (changed) {
                        this.tabs[i].animating = true;
                    }
                    this.tabs[i].selected = selected;
                    this.tabs[i].selectedChange.emit(selected);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Accordion.prototype.ngOnDestroy = function () {
        if (this.tabListSubscription) {
            this.tabListSubscription.unsubscribe();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Accordion.prototype, "multiple", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Accordion.prototype, "onClose", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Accordion.prototype, "onOpen", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Accordion.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Accordion.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Accordion.prototype, "lazy", void 0);
    __decorate([
        ContentChildren(AccordionTab),
        __metadata("design:type", QueryList)
    ], Accordion.prototype, "tabList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], Accordion.prototype, "activeIndex", null);
    Accordion = __decorate([
        Component({
            selector: 'ot-accordion',
            template: "\n        <div [ngClass]=\"'ot-ui-accordion ot-ui-widget ot-ui-helper-reset'\" [ngStyle]=\"style\" [class]=\"styleClass\" role=\"presentation\" [perfectScrollbar]=\"psConfig\">\n            <ng-content></ng-content>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [ElementRef, ChangeDetectorRef])
    ], Accordion);
    return Accordion;
}());
export { Accordion };
var AccordionModule = /** @class */ (function () {
    function AccordionModule() {
    }
    AccordionModule = __decorate([
        NgModule({
            imports: [CommonModule, PerfectScrollbarModule],
            exports: [Accordion, AccordionTab],
            declarations: [Accordion, AccordionTab]
        })
    ], AccordionModule);
    return AccordionModule;
}());
export { AccordionModule };
//# sourceMappingURL=accordion.js.map
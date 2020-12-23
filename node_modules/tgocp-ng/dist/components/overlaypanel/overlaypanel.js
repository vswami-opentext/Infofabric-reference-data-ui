var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Input, Output, EventEmitter, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
var OverlayPanel = /** @class */ (function () {
    function OverlayPanel(el, domHandler, renderer, cd) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.cd = cd;
        this.dismissable = true;
        this.onBeforeShow = new EventEmitter();
        this.onAfterShow = new EventEmitter();
        this.onBeforeHide = new EventEmitter();
        this.onAfterHide = new EventEmitter();
        this.visible = false;
    }
    OverlayPanel.prototype.ngOnInit = function () {
        var _this = this;
        if (this.dismissable) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.selfClick && !_this.targetEvent) {
                    _this.hide();
                }
                _this.selfClick = false;
                _this.targetEvent = false;
                _this.cd.markForCheck();
            });
        }
    };
    OverlayPanel.prototype.ngAfterViewInit = function () {
        this.container = this.el.nativeElement.children[0];
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                this.domHandler.appendChild(this.container, this.appendTo);
        }
    };
    OverlayPanel.prototype.toggle = function (event, target) {
        var currentTarget = (target || event.currentTarget || event.target);
        if (!this.target || this.target == currentTarget) {
            if (this.visible)
                this.hide();
            else
                this.show(event, target);
        }
        else {
            this.show(event, target);
        }
        if (this.dismissable) {
            this.targetEvent = true;
        }
        this.target = currentTarget;
    };
    OverlayPanel.prototype.show = function (event, target) {
        if (this.dismissable) {
            this.targetEvent = true;
        }
        this.onBeforeShow.emit(null);
        var elementTarget = target || event.currentTarget || event.target;
        this.container.style.zIndex = ++DomHandler.zindex + 1;
        if (this.visible) {
            this.absolutePosition(this.container, elementTarget);
        }
        else {
            this.visible = true;
            this.absolutePosition(this.container, elementTarget);
            this.domHandler.fadeIn(this.container, 250);
        }
        this.onAfterShow.emit(null);
    };
    OverlayPanel.prototype.hide = function () {
        if (this.visible) {
            this.onBeforeHide.emit(null);
            this.visible = false;
            this.onAfterHide.emit(null);
        }
    };
    OverlayPanel.prototype.onPanelClick = function () {
        if (this.dismissable) {
            this.selfClick = true;
        }
    };
    OverlayPanel.prototype.onCloseClick = function (event) {
        this.hide();
        if (this.dismissable) {
            this.selfClick = true;
        }
        event.preventDefault();
    };
    OverlayPanel.prototype.absolutePosition = function (element, target) {
        var elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.domHandler.getHiddenElementDimensions(element);
        var elementOuterHeight = elementDimensions.height;
        var elementOuterWidth = elementDimensions.width;
        var targetOuterHeight = target.offsetHeight;
        var targetOuterWidth = target.offsetWidth;
        var targetOffset = target.getBoundingClientRect();
        var windowScrollTop = this.domHandler.getWindowScrollTop();
        var windowScrollLeft = this.domHandler.getWindowScrollLeft();
        var viewport = this.domHandler.getViewport();
        var top, left;
        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
            if (top < 0) {
                top = 0 + windowScrollTop - 20;
                element.setAttribute('data-position', 'top');
            }
        }
        else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop + 20;
            element.setAttribute('data-position', 'bottom');
        }
        if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width) {
            left = targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth;
            element.setAttribute('data-side', 'left');
        }
        else {
            left = targetOffset.left + windowScrollLeft;
            element.setAttribute('data-side', 'right');
        }
        element.style.top = top + 'px';
        element.style.left = left + 'px';
    };
    OverlayPanel.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
        this.target = null;
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], OverlayPanel.prototype, "dismissable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], OverlayPanel.prototype, "showCloseIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], OverlayPanel.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], OverlayPanel.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], OverlayPanel.prototype, "appendTo", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], OverlayPanel.prototype, "onBeforeShow", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], OverlayPanel.prototype, "onAfterShow", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], OverlayPanel.prototype, "onBeforeHide", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], OverlayPanel.prototype, "onAfterHide", void 0);
    OverlayPanel = __decorate([
        Component({
            selector: 'p-overlayPanel',
            template: "<div [ngClass]=\"'ot-ui-overlaypanel ot-ui-widget ot-ui-widget-content ot-ui-corner-all ot-ui-shadow'\" [ngStyle]=\"style\" [class]=\"styleClass\" [style.display]=\"visible ? 'block' : 'none'\" (click)=\"onPanelClick()\">\r\n    <div class=\"ot-ui-overlaypanel-content\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n    <a href=\"#\" *ngIf=\"showCloseIcon\" class=\"ot-ui-overlaypanel-close ot-ui-state-default\" (click)=\"onCloseClick($event)\">\r\n        <span class=\"fa fa-fw fa-close\"></span>\r\n    </a>\r\n</div>",
            providers: [DomHandler]
        }),
        __metadata("design:paramtypes", [ElementRef, DomHandler, Renderer2, ChangeDetectorRef])
    ], OverlayPanel);
    return OverlayPanel;
}());
export { OverlayPanel };
var OverlayPanelModule = /** @class */ (function () {
    function OverlayPanelModule() {
    }
    OverlayPanelModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [OverlayPanel],
            declarations: [OverlayPanel]
        })
    ], OverlayPanelModule);
    return OverlayPanelModule;
}());
export { OverlayPanelModule };
//# sourceMappingURL=overlaypanel.js.map
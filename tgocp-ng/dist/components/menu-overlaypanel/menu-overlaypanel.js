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
import { trigger, state, style, transition, animate } from '@angular/animations';
var MenuOverlayPanel = /** @class */ (function () {
    function MenuOverlayPanel(el, domHandler, renderer, cd) {
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
    MenuOverlayPanel.prototype.ngAfterViewInit = function () {
        this.container = this.el.nativeElement.children[0];
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                this.domHandler.appendChild(this.container, this.appendTo);
        }
    };
    MenuOverlayPanel.prototype.ngAfterViewChecked = function () {
        if (this.willShow) {
            this.domHandler.absolutePosition(this.container, this.target);
            this.bindDocumentClickListener();
            this.onAfterShow.emit(null);
            this.willShow = false;
        }
        if (this.willHide) {
            this.onAfterHide.emit(null);
            this.willHide = false;
        }
    };
    MenuOverlayPanel.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener && this.dismissable) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.selfClick && !_this.targetClickEvent) {
                    _this.hide();
                }
                _this.selfClick = false;
                _this.targetClickEvent = false;
                _this.cd.markForCheck();
            });
        }
    };
    MenuOverlayPanel.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    MenuOverlayPanel.prototype.toggle = function (event, target) {
        if (!this.target || this.target === (target || event.currentTarget || event.target)) {
            if (this.visible)
                this.hide();
            else
                this.show(event, target);
        }
        else {
            this.show(event, target);
        }
    };
    MenuOverlayPanel.prototype.show = function (event, target) {
        this.onBeforeShow.emit(null);
        this.target = target || event.currentTarget || event.target;
        this.container.style.zIndex = ++DomHandler.zindex;
        this.visible = true;
        this.willShow = true;
        if (event.type === 'click') {
            this.targetClickEvent = true;
        }
    };
    MenuOverlayPanel.prototype.hide = function () {
        if (this.visible) {
            this.onBeforeHide.emit(null);
            this.willHide = true;
            this.visible = false;
            this.selfClick = false;
            this.targetClickEvent = false;
            this.unbindDocumentClickListener();
        }
    };
    MenuOverlayPanel.prototype.onPanelClick = function (event) {
        if (this.closeClick) {
            this.hide();
            this.closeClick = false;
        }
        else if (this.dismissable) {
            this.selfClick = true;
        }
    };
    MenuOverlayPanel.prototype.onCloseClick = function (event) {
        this.closeClick = true;
        event.preventDefault();
    };
    MenuOverlayPanel.prototype.ngOnDestroy = function () {
        this.unbindDocumentClickListener();
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
        this.target = null;
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MenuOverlayPanel.prototype, "dismissable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MenuOverlayPanel.prototype, "showCloseIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MenuOverlayPanel.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MenuOverlayPanel.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MenuOverlayPanel.prototype, "appendTo", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MenuOverlayPanel.prototype, "onBeforeShow", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MenuOverlayPanel.prototype, "onAfterShow", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MenuOverlayPanel.prototype, "onBeforeHide", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MenuOverlayPanel.prototype, "onAfterHide", void 0);
    MenuOverlayPanel = __decorate([
        Component({
            selector: 'ot-menu-overlayPanel',
            template: "<div [ngClass]=\"'ot-ui-menu-overlaypanel ot-ui-widget ot-ui-widget-content ot-ui-corner-all ot-ui-shadow'\" [ngStyle]=\"style\" [class]=\"styleClass\" [style.display]=\"visible ? 'block' : 'none'\" (click)=\"onPanelClick($event)\" [@panelState]=\"visible ? 'visible' : 'hidden'\">\r\n    <div class=\"ot-ui-menu-overlaypanel-content\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n    <a href=\"#\" *ngIf=\"showCloseIcon\" class=\"ot-ui-menu-overlaypanel-close ot-ui-state-default\" (click)=\"onCloseClick($event)\">\r\n        <span class=\"fa fa-fw fa-close\"></span>\r\n    </a>\r\n</div>",
            animations: [
                trigger('panelState', [
                    state('hidden', style({
                        opacity: 0
                    })),
                    state('visible', style({
                        opacity: 1
                    })),
                    transition('visible => hidden', animate('400ms ease-in')),
                    transition('hidden => visible', animate('400ms ease-out'))
                ])
            ],
            providers: [DomHandler]
        }),
        __metadata("design:paramtypes", [ElementRef, DomHandler, Renderer2, ChangeDetectorRef])
    ], MenuOverlayPanel);
    return MenuOverlayPanel;
}());
export { MenuOverlayPanel };
var MenuOverlayPanelModule = /** @class */ (function () {
    function MenuOverlayPanelModule() {
    }
    MenuOverlayPanelModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [MenuOverlayPanel],
            declarations: [MenuOverlayPanel]
        })
    ], MenuOverlayPanelModule);
    return MenuOverlayPanelModule;
}());
export { MenuOverlayPanelModule };
//# sourceMappingURL=menu-overlaypanel.js.map
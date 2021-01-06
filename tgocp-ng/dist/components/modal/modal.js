var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CommonModule } from '@angular/common';
import { Component, Injectable, Input, NgModule, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DomHandler } from '../dom/domhandler';
var TGOCPNGService = /** @class */ (function () {
    function TGOCPNGService() {
        this.showModalSubject = new Subject();
    }
    TGOCPNGService.prototype.showModal = function () {
        this.showModalSubject.next(true);
    };
    TGOCPNGService.prototype.hideModal = function () {
        this.showModalSubject.next(false);
    };
    TGOCPNGService = __decorate([
        Injectable()
    ], TGOCPNGService);
    return TGOCPNGService;
}());
export { TGOCPNGService };
var Modal = /** @class */ (function () {
    function Modal(domHandler, uiHandlerService) {
        var _this = this;
        this.domHandler = domHandler;
        this.uiHandlerService = uiHandlerService;
        this.size = 'std';
        this.visible = false;
        uiHandlerService.showModalSubject.subscribe(function (data) {
            if (data) {
                _this.showModal();
            }
            else {
                _this.hideModal();
            }
        });
    }
    Modal.prototype.showModal = function () {
        this.overlay.nativeElement.className = 'ot-overlay ot-fade-in';
    };
    Modal.prototype.hideModal = function () {
        this.overlay.nativeElement.className = 'ot-overlay ot-fade-out';
    };
    Modal.prototype.center = function () {
        var elementWidth = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
        var elementHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
        if (elementWidth == 0 && elementHeight == 0) {
            this.containerViewChild.nativeElement.style.visibility = 'hidden';
            this.containerViewChild.nativeElement.style.display = 'block';
            elementWidth = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
            elementHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
            this.containerViewChild.nativeElement.style.display = 'none';
            this.containerViewChild.nativeElement.style.visibility = 'visible';
        }
        var viewport = this.domHandler.getViewport();
        var x = Math.max((viewport.width - elementWidth) / 2, 0);
        var y = Math.max((viewport.height - elementHeight) / 2, 0);
        this.containerViewChild.nativeElement.style.left = x - 20 + 'px';
        this.containerViewChild.nativeElement.style.top = y - 20 + 'px';
    };
    Modal.prototype.ngOnDestroy = function () {
        // window.removeEventListener('resize',this.center);
    };
    __decorate([
        ViewChild('container'),
        __metadata("design:type", Object)
    ], Modal.prototype, "containerViewChild", void 0);
    __decorate([
        ViewChild('overlay'),
        __metadata("design:type", Object)
    ], Modal.prototype, "overlay", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Modal.prototype, "size", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Modal.prototype, "visible", void 0);
    Modal = __decorate([
        Component({
            selector: 'ot-modal',
            template: "<div [ngClass]=\"{'ot-fade-in':visible, 'ot-fade-out':!visible}\" class=\"ot-overlay\" #overlay>\r\n    <div #container [ngClass]=\"{'ot-modal-md-width': 'md'===size, 'ot-modal-lg-width':'lg'===size, 'ot-modal-sm-width': 'sm'===size, 'ot-modal-std-width': 'std'===size }\"  class=\"ot-modal ot-background-white\">\r\n    <ng-content></ng-content>\r\n</div>\r\n</div>",
            providers: [DomHandler]
        }),
        __metadata("design:paramtypes", [DomHandler, TGOCPNGService])
    ], Modal);
    return Modal;
}());
export { Modal };
var ModalModule = /** @class */ (function () {
    function ModalModule() {
    }
    ModalModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Modal],
            declarations: [Modal],
            providers: [TGOCPNGService]
        })
    ], ModalModule);
    return ModalModule;
}());
export { ModalModule };
//# sourceMappingURL=modal.js.map
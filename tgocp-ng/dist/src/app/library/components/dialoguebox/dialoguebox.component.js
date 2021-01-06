var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgModule, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DialogueboxService } from './dialoguebox.service';
var DialogueboxComponent = /** @class */ (function () {
    function DialogueboxComponent(el, domHandler, dialogueboxService) {
        var _this = this;
        this.el = el;
        this.domHandler = domHandler;
        this.dialogueboxService = dialogueboxService;
        this.name = 'myDialog';
        this.showFooter = true;
        this.acceptButton = 'Yes';
        this.rejectButton = 'Cancel';
        this.iconClass = "ot-question-icon";
        this.subscription = this.dialogueboxService.confirmationSource$.subscribe(function (data) {
            if (data.dialogName == _this.name) {
                if (data.accept) {
                    //console.debug('accept block')
                    _this.confirmationEvent = new EventEmitter();
                    _this.confirmationEvent.subscribe(data.accept);
                }
                if (data.reject) {
                    //console.debug('reject block')
                    _this.rejectionEvent = new EventEmitter();
                    _this.rejectionEvent.subscribe(data.reject);
                }
                _this.visible = true;
            }
        });
    }
    DialogueboxComponent.prototype.ngOnInit = function () {
    };
    DialogueboxComponent.prototype.ngAfterViewInit = function () {
    };
    DialogueboxComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    Object.defineProperty(DialogueboxComponent.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (val) {
            this._visible = val;
        },
        enumerable: true,
        configurable: true
    });
    // @ViewChild('modalDialog') modalDialog;
    /*  center() {
      let container = this.modalDialog.nativeElement;
      let elementWidth = this.domHandler.getOuterWidth(container);
      let elementHeight = this.domHandler.getOuterHeight(container);
      if(elementWidth == 0 && elementHeight == 0) {
          container.style.visibility = 'hidden';
          container.style.display = 'block';
          elementWidth = this.domHandler.getOuterWidth(container);
          elementHeight = this.domHandler.getOuterHeight(container);
          container.style.display = 'none';
          container.style.visibility = 'visible';
      }
      let viewport = this.domHandler.getViewport();
      let x = (viewport.width - elementWidth) / 2;
      let y = (viewport.height - elementHeight) / 2;
    
      container.style.left = x + 'px';
      container.style.top = 100 + 'px';
    } */
    DialogueboxComponent.prototype.hide = function () {
        this.visible = false;
    };
    DialogueboxComponent.prototype.confirm = function () {
        if (this.confirmationEvent) {
            this.confirmationEvent.emit();
        }
        this.hide();
    };
    DialogueboxComponent.prototype.reject = function () {
        if (this.rejectionEvent) {
            this.rejectionEvent.emit();
        }
        this.hide();
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DialogueboxComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DialogueboxComponent.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DialogueboxComponent.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DialogueboxComponent.prototype, "contentClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DialogueboxComponent.prototype, "overlayClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DialogueboxComponent.prototype, "showFooter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DialogueboxComponent.prototype, "acceptButton", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DialogueboxComponent.prototype, "rejectButton", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DialogueboxComponent.prototype, "messages", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DialogueboxComponent.prototype, "confirmationEvent", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DialogueboxComponent.prototype, "rejectionEvent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DialogueboxComponent.prototype, "iconClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], DialogueboxComponent.prototype, "visible", null);
    DialogueboxComponent = __decorate([
        Component({
            selector: 'ot-dialoguebox',
            template: "<div class=\"ot-overlay\" [ngClass]=\"overlayClass\" [style.display]=\"visible ? 'block' : 'none'\" [@dialogState]=\"visible ? 'visible' : 'hidden'\">\n    <div class=\"ot-modal-dialog\" [ngStyle]=\"style\" [ngClass]=\"contentClass\" #modalDialog>\n        <div class=\"ot-ui-helper-clearfix ot-header\">\n            <div>\n                <span [class]=\"iconClass\"></span>\n                <span class=\"ot-text\">{{header}}</span>\n            </div>\n        </div>\n        <div class=\"ot-content\">\n            <ng-content select=\"[dialog-message]\"></ng-content>\n        </div>\n        <div class=\"ot-footer\" *ngIf=\"showFooter\">\n            <button type=\"button\" id=\"submit\" class=\"ot-primary\" (click)=\"confirm()\">{{acceptButton}}</button>\n            <button type=\"button\" id=\"cancel\" class=\"ot-secondary ot-margin-left-1em\" (click)=\"reject()\">{{rejectButton}}</button>\n        </div>\n    </div>\n  </div>",
            animations: [
                trigger('dialogState', [
                    state('hidden', style({
                        opacity: 0
                    })),
                    state('visible', style({
                        opacity: 1
                    })),
                    transition('visible => hidden', animate('400ms ease-in')),
                    transition('hidden => visible', animate('400ms ease-out'))
                ]),
            ],
            providers: [DomHandler]
        }),
        __metadata("design:paramtypes", [ElementRef, DomHandler, DialogueboxService])
    ], DialogueboxComponent);
    return DialogueboxComponent;
}());
export { DialogueboxComponent };
var DialogueboxModule = /** @class */ (function () {
    function DialogueboxModule() {
    }
    DialogueboxModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [DialogueboxComponent],
            exports: [DialogueboxComponent],
            providers: [DialogueboxService]
        })
    ], DialogueboxModule);
    return DialogueboxModule;
}());
export { DialogueboxModule };
//# sourceMappingURL=dialoguebox.component.js.map
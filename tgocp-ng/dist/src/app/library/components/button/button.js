var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Directive, ElementRef, Input } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { CommonModule } from '@angular/common';
var Button = /** @class */ (function () {
    function Button(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.iconPos = 'left';
        this.cornerStyleClass = 'ot-ui-corner-all';
    }
    Button.prototype.ngAfterViewInit = function () {
        this.domHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());
        if (this.icon) {
            var iconElement = document.createElement("span");
            var iconPosClass = (this.iconPos == 'right') ? 'ot-ui-button-icon-right' : 'ot-ui-button-icon-left';
            iconElement.className = iconPosClass + ' ot-ui-clickable ot-fa ot-fa-fw ' + this.icon;
            this.el.nativeElement.appendChild(iconElement);
        }
        var labelElement = document.createElement("span");
        labelElement.className = 'ot-ui-button-text ot-ui-clickable';
        labelElement.appendChild(document.createTextNode(this.label || 'ot-ui-btn'));
        this.el.nativeElement.appendChild(labelElement);
        this.initialized = true;
    };
    Button.prototype.getStyleClass = function () {
        var styleClass = 'ot-ui-button ot-ui-widget ot-ui-state-default ' + this.cornerStyleClass;
        if (this.icon) {
            if (this.label != null && this.label != undefined) {
                if (this.iconPos == 'left')
                    styleClass = styleClass + ' ot-ui-button-text-icon-left';
                else
                    styleClass = styleClass + ' ot-ui-button-text-icon-right';
            }
            else {
                styleClass = styleClass + ' ot-ui-button-icon-only';
            }
        }
        else {
            styleClass = styleClass + ' ot-ui-button-text-only';
        }
        return styleClass;
    };
    Object.defineProperty(Button.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (val) {
            this._label = val;
            if (this.initialized) {
                this.domHandler.findSingle(this.el.nativeElement, '.ot-ui-button-text').textContent = this._label;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        set: function (val) {
            this._icon = val;
            if (this.initialized) {
                var iconPosClass = (this.iconPos == 'right') ? 'ot-ui-button-icon-right' : 'ot-ui-button-icon-left';
                this.domHandler.findSingle(this.el.nativeElement, '.fa').className =
                    iconPosClass + ' ot-ui-clickable ot-fa ot-fa-fw ' + this.icon;
            }
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.ngOnDestroy = function () {
        while (this.el.nativeElement.hasChildNodes()) {
            this.el.nativeElement.removeChild(this.el.nativeElement.lastChild);
        }
        this.initialized = false;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Button.prototype, "iconPos", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Button.prototype, "cornerStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], Button.prototype, "label", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], Button.prototype, "icon", null);
    Button = __decorate([
        Directive({
            selector: '[pButton]',
            providers: [DomHandler]
        }),
        __metadata("design:paramtypes", [ElementRef, DomHandler])
    ], Button);
    return Button;
}());
export { Button };
var ButtonModule = /** @class */ (function () {
    function ButtonModule() {
    }
    ButtonModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Button],
            declarations: [Button]
        })
    ], ButtonModule);
    return ButtonModule;
}());
export { ButtonModule };
//# sourceMappingURL=button.js.map
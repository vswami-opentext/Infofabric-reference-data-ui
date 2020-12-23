var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, ElementRef, HostListener, Input, Renderer2, Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
var Bubbletip2 = /** @class */ (function () {
    function Bubbletip2(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.tooltipPosition = 'right';
        this.tooltipEvent = 'hover';
        this.appendTo = 'body';
        this.tooltipZIndex = 'auto';
        this.escape = false;
    }
    Bubbletip2.prototype.onMouseEnter = function () {
        if (this.tooltipEvent === 'hover') {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.destroy();
            }
            this.activate();
        }
    };
    Bubbletip2.prototype.onMouseLeave = function () {
        if (this.tooltipEvent === 'hover') {
            this.deactivate();
        }
    };
    Bubbletip2.prototype.onFocus = function () {
        if (this.tooltipEvent === 'focus') {
            this.activate();
        }
    };
    Bubbletip2.prototype.onBlur = function () {
        if (this.tooltipEvent === 'focus') {
            this.deactivate();
        }
    };
    Bubbletip2.prototype.activate = function () {
        var _this = this;
        this.active = true;
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
        if (this.showDelay)
            this.showTimeout = setTimeout(function () { _this.show(); }, this.showDelay);
        else
            this.show();
    };
    Bubbletip2.prototype.deactivate = function () {
        var _this = this;
        this.active = false;
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
        }
        if (this.hideDelay)
            this.hideTimeout = setTimeout(function () { _this.hide(); }, this.hideDelay);
        else
            this.hide();
    };
    Object.defineProperty(Bubbletip2.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            this._text = text;
            if (this.active) {
                if (this._text) {
                    if (this.container && this.container.offsetParent)
                        this.updateText();
                    else
                        this.show();
                }
                else {
                    this.hide();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Bubbletip2.prototype.create = function () {
        this.container = document.createElement('div');
        var tooltipArrow = document.createElement('div');
        tooltipArrow.className = 'ot-ui-bubbletip-arrow';
        this.container.appendChild(tooltipArrow);
        this.tooltipText = document.createElement('div');
        this.tooltipText.className = 'ot-ui-bubbletip-text ot-ui-shadow ot-ui-corner-all';
        this.updateText();
        if (this.positionStyle) {
            this.container.style.position = this.positionStyle;
        }
        this.container.appendChild(this.tooltipText);
        if (this.appendTo === 'body')
            document.body.appendChild(this.container);
        else if (this.appendTo === 'target')
            this.domHandler.appendChild(this.container, this.el.nativeElement);
        else
            this.domHandler.appendChild(this.container, this.appendTo);
        this.container.style.display = 'inline-block';
    };
    Bubbletip2.prototype.show = function () {
        if (!this.text || this.disabled) {
            return;
        }
        this.create();
        this.align();
        if (this.tooltipStyleClass) {
            this.container.className = this.container.className + ' ' + this.tooltipStyleClass;
        }
        this.domHandler.fadeIn(this.container, 250);
        if (this.tooltipZIndex === 'auto')
            this.container.style.zIndex = ++DomHandler.zindex;
        else
            this.container.style.zIndex = this.tooltipZIndex;
        this.bindDocumentResizeListener();
    };
    Bubbletip2.prototype.hide = function () {
        this.destroy();
    };
    Bubbletip2.prototype.updateText = function () {
        if (this.escape) {
            this.tooltipText.innerHTML = '';
            this.tooltipText.appendChild(document.createTextNode(this._text));
        }
        else {
            this.tooltipText.innerHTML = this._text;
        }
    };
    Bubbletip2.prototype.align = function () {
        var position = this.tooltipPosition;
        switch (position) {
            case 'top':
                this.alignTop();
                if (this.isOutOfBounds()) {
                    this.alignBottom();
                }
                break;
            case 'bottom':
                this.alignBottom();
                if (this.isOutOfBounds()) {
                    this.alignTop();
                }
                break;
            case 'left':
                this.alignLeft();
                if (this.isOutOfBounds()) {
                    this.alignRight();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;
            case 'right':
                this.alignRight();
                if (this.isOutOfBounds()) {
                    this.alignLeft();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;
        }
    };
    Bubbletip2.prototype.getHostOffset = function () {
        var offset = this.el.nativeElement.getBoundingClientRect();
        var targetLeft = offset.left + this.domHandler.getWindowScrollLeft();
        var targetTop = offset.top + this.domHandler.getWindowScrollTop();
        return { left: targetLeft, top: targetTop };
    };
    Bubbletip2.prototype.alignRight = function () {
        this.preAlign();
        this.container.className = 'ot-ui-bubbletip ot-ui-widget ot-ui-bubbletip-right';
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left + this.domHandler.getOuterWidth(this.el.nativeElement);
        var top = hostOffset.top + (this.domHandler.getOuterHeight(this.el.nativeElement) - this.domHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    Bubbletip2.prototype.alignLeft = function () {
        this.preAlign();
        this.container.className = 'ot-ui-bubbletip ot-ui-widget ot-ui-bubbletip-left';
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left - this.domHandler.getOuterWidth(this.container);
        var top = hostOffset.top + (this.domHandler.getOuterHeight(this.el.nativeElement) - this.domHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    Bubbletip2.prototype.alignTop = function () {
        this.preAlign();
        this.container.className = 'ot-ui-bubbletip ot-ui-widget ot-ui-bubbletip-top';
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left + (this.domHandler.getOuterWidth(this.el.nativeElement) - this.domHandler.getOuterWidth(this.container)) / 2;
        var top = hostOffset.top - this.domHandler.getOuterHeight(this.container);
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    Bubbletip2.prototype.alignBottom = function () {
        this.preAlign();
        this.container.className = 'ot-ui-bubbletip ot-ui-widget ot-ui-bubbletip-bottom';
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left + (this.domHandler.getOuterWidth(this.el.nativeElement) - this.domHandler.getOuterWidth(this.container)) / 2;
        var top = hostOffset.top + this.domHandler.getOuterHeight(this.el.nativeElement);
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    Bubbletip2.prototype.preAlign = function () {
        this.container.style.left = -999 + 'px';
        this.container.style.top = -999 + 'px';
    };
    Bubbletip2.prototype.isOutOfBounds = function () {
        var offset = this.container.getBoundingClientRect();
        var targetTop = offset.top;
        var targetLeft = offset.left;
        var width = this.domHandler.getOuterWidth(this.container);
        var height = this.domHandler.getOuterHeight(this.container);
        var viewport = this.domHandler.getViewport();
        return (targetLeft + width > viewport.width) || (targetLeft < 0) || (targetTop < 0) || (targetTop + height > viewport.height);
    };
    Bubbletip2.prototype.bindDocumentResizeListener = function () {
        var _this = this;
        this.documentResizeListener = this.renderer.listen('window', 'resize', function () {
            _this.hide();
        });
    };
    Bubbletip2.prototype.unbindDocumentResizeListener = function () {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    };
    Bubbletip2.prototype.destroy = function () {
        this.unbindDocumentResizeListener();
        if (this.container && this.container.parentElement) {
            if (this.appendTo === 'body')
                document.body.removeChild(this.container);
            else if (this.appendTo === 'target')
                this.el.nativeElement.removeChild(this.container);
            else
                this.domHandler.removeChild(this.container, this.appendTo);
        }
        this.container = null;
    };
    Bubbletip2.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], Bubbletip2.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Bubbletip2.prototype, "tooltipPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Bubbletip2.prototype, "tooltipEvent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Bubbletip2.prototype, "appendTo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Bubbletip2.prototype, "positionStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Bubbletip2.prototype, "tooltipStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Bubbletip2.prototype, "tooltipZIndex", void 0);
    __decorate([
        Input("tooltipDisabled"),
        __metadata("design:type", Boolean)
    ], Bubbletip2.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Bubbletip2.prototype, "escape", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Bubbletip2.prototype, "showDelay", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Bubbletip2.prototype, "hideDelay", void 0);
    __decorate([
        HostListener('mouseenter', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Bubbletip2.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Bubbletip2.prototype, "onMouseLeave", null);
    __decorate([
        HostListener('focus', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Bubbletip2.prototype, "onFocus", null);
    __decorate([
        HostListener('blur', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Bubbletip2.prototype, "onBlur", null);
    __decorate([
        Input('bubbletip2'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], Bubbletip2.prototype, "text", null);
    Bubbletip2 = __decorate([
        Component({
            selector: '[bubbletip2]',
            providers: [DomHandler],
            template: "\n       <div>\n        \n       </div>\n    "
        }),
        __metadata("design:paramtypes", [ElementRef, DomHandler, Renderer2])
    ], Bubbletip2);
    return Bubbletip2;
}());
export { Bubbletip2 };
var Bubbletip2Module = /** @class */ (function () {
    function Bubbletip2Module() {
    }
    Bubbletip2Module = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Bubbletip2],
            declarations: [Bubbletip2]
        })
    ], Bubbletip2Module);
    return Bubbletip2Module;
}());
export { Bubbletip2Module };
//# sourceMappingURL=tooltip.js.map
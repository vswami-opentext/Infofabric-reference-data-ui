var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Directive, ElementRef, Input, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../../components/dom/domhandler';
var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(el, domHandler, zone) {
        this.el = el;
        this.domHandler = domHandler;
        this.zone = zone;
        this.tooltipPosition = 'bottom';
        this.tooltipEvent = 'hover';
        this.appendTo = 'body';
        this.tooltipZIndex = 'auto';
        this.escape = true;
    }
    TooltipDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            if (_this.tooltipEvent === 'hover') {
                _this.mouseEnterListener = _this.onMouseEnter.bind(_this);
                _this.mouseLeaveListener = _this.onMouseLeave.bind(_this);
                _this.clickListener = _this.onClick.bind(_this);
                _this.el.nativeElement.addEventListener('mouseenter', _this.mouseEnterListener);
                _this.el.nativeElement.addEventListener('mouseleave', _this.mouseLeaveListener);
                _this.el.nativeElement.addEventListener('click', _this.clickListener);
            }
            else if (_this.tooltipEvent === 'focus') {
                _this.focusListener = _this.onFocus.bind(_this);
                _this.blurListener = _this.onBlur.bind(_this);
                _this.el.nativeElement.addEventListener('focus', _this.focusListener);
                _this.el.nativeElement.addEventListener('blur', _this.blurListener);
            }
        });
    };
    TooltipDirective.prototype.onMouseEnter = function (e) {
        if (!this.container && !this.showTimeout) {
            this.activate();
        }
    };
    TooltipDirective.prototype.onMouseLeave = function (e) {
        this.deactivate();
    };
    TooltipDirective.prototype.onFocus = function (e) {
        this.activate();
    };
    TooltipDirective.prototype.onBlur = function (e) {
        this.deactivate();
    };
    TooltipDirective.prototype.onClick = function (e) {
        this.deactivate();
    };
    TooltipDirective.prototype.activate = function () {
        var _this = this;
        this.active = true;
        this.clearHideTimeout();
        if (this.showDelay)
            this.showTimeout = setTimeout(function () { _this.show(); }, this.showDelay);
        else
            this.show();
        if (this.life) {
            var duration = this.showDelay ? this.life + this.showDelay : this.life;
            this.hideTimeout = setTimeout(function () { _this.hide(); }, duration);
        }
    };
    TooltipDirective.prototype.deactivate = function () {
        var _this = this;
        this.active = false;
        this.clearShowTimeout();
        if (this.hideDelay) {
            this.clearHideTimeout(); //life timeout
            this.hideTimeout = setTimeout(function () { _this.hide(); }, this.hideDelay);
        }
        else {
            this.hide();
        }
    };
    Object.defineProperty(TooltipDirective.prototype, "text", {
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
    TooltipDirective.prototype.create = function () {
        this.container = document.createElement('div');
        var tooltipArrow = document.createElement('div');
        tooltipArrow.className = 'ot-ui-tooltip-arrow';
        this.container.appendChild(tooltipArrow);
        this.tooltipText = document.createElement('div');
        this.tooltipText.className = 'ot-ui-tooltip-text ot-ui-shadow ot-ui-corner-all';
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
    TooltipDirective.prototype.show = function () {
        if (!this.text || this.disabled) {
            return;
        }
        this.create();
        this.align();
        this.domHandler.fadeIn(this.container, 250);
        if (this.tooltipZIndex === 'auto')
            this.container.style.zIndex = ++DomHandler.zindex;
        else
            this.container.style.zIndex = this.tooltipZIndex;
        this.bindDocumentResizeListener();
    };
    TooltipDirective.prototype.hide = function () {
        this.remove();
    };
    TooltipDirective.prototype.updateText = function () {
        if (this.escape) {
            this.tooltipText.innerHTML = '';
            this.tooltipText.appendChild(document.createTextNode(this._text));
        }
        else {
            this.tooltipText.innerHTML = this._text;
        }
    };
    TooltipDirective.prototype.align = function () {
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
    TooltipDirective.prototype.getHostOffset = function () {
        if (this.appendTo === 'body' || this.appendTo === 'target') {
            var offset = this.el.nativeElement.getBoundingClientRect();
            var targetLeft = offset.left + this.domHandler.getWindowScrollLeft();
            var targetTop = offset.top + this.domHandler.getWindowScrollTop();
            return { left: targetLeft, top: targetTop };
        }
        else {
            return { left: 0, top: 0 };
        }
    };
    TooltipDirective.prototype.alignRight = function () {
        this.preAlign('right');
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left + this.domHandler.getOuterWidth(this.el.nativeElement);
        var top = hostOffset.top + (this.domHandler.getOuterHeight(this.el.nativeElement) - this.domHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    TooltipDirective.prototype.alignLeft = function () {
        this.preAlign('left');
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left - this.domHandler.getOuterWidth(this.container);
        var top = hostOffset.top + (this.domHandler.getOuterHeight(this.el.nativeElement) - this.domHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    TooltipDirective.prototype.alignTop = function () {
        this.preAlign('top');
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left + (this.domHandler.getOuterWidth(this.el.nativeElement) - this.domHandler.getOuterWidth(this.container)) / 2;
        var top = hostOffset.top - this.domHandler.getOuterHeight(this.container);
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    TooltipDirective.prototype.alignBottom = function () {
        this.preAlign('bottom');
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left + (this.domHandler.getOuterWidth(this.el.nativeElement) - this.domHandler.getOuterWidth(this.container)) / 2;
        var top = hostOffset.top + this.domHandler.getOuterHeight(this.el.nativeElement);
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    TooltipDirective.prototype.preAlign = function (position) {
        this.container.style.left = -999 + 'px';
        this.container.style.top = -999 + 'px';
        var defaultClassName = 'ot-ui-tooltip ot-ui-widget ot-ui-tooltip-' + position;
        this.container.className = this.tooltipStyleClass ? defaultClassName + ' ' + this.tooltipStyleClass : defaultClassName;
    };
    TooltipDirective.prototype.isOutOfBounds = function () {
        var offset = this.container.getBoundingClientRect();
        var targetTop = offset.top;
        var targetLeft = offset.left;
        var width = this.domHandler.getOuterWidth(this.container);
        var height = this.domHandler.getOuterHeight(this.container);
        var viewport = this.domHandler.getViewport();
        return (targetLeft + width > viewport.width) || (targetLeft < 0) || (targetTop < 0) || (targetTop + height > viewport.height);
    };
    TooltipDirective.prototype.onWindowResize = function (e) {
        this.hide();
    };
    TooltipDirective.prototype.bindDocumentResizeListener = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.resizeListener = _this.onWindowResize.bind(_this);
            window.addEventListener('resize', _this.resizeListener);
        });
    };
    TooltipDirective.prototype.unbindDocumentResizeListener = function () {
        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null;
        }
    };
    TooltipDirective.prototype.unbindEvents = function () {
        if (this.tooltipEvent === 'hover') {
            this.el.nativeElement.removeEventListener('mouseenter', this.mouseEnterListener);
            this.el.nativeElement.removeEventListener('mouseleave', this.mouseLeaveListener);
            this.el.nativeElement.removeEventListener('click', this.clickListener);
        }
        else if (this.tooltipEvent === 'focus') {
            this.el.nativeElement.removeEventListener('focus', this.focusListener);
            this.el.nativeElement.removeEventListener('blur', this.blurListener);
        }
        this.unbindDocumentResizeListener();
    };
    TooltipDirective.prototype.remove = function () {
        if (this.container && this.container.parentElement) {
            if (this.appendTo === 'body')
                document.body.removeChild(this.container);
            else if (this.appendTo === 'target')
                this.el.nativeElement.removeChild(this.container);
            else
                this.domHandler.removeChild(this.container, this.appendTo);
        }
        this.unbindDocumentResizeListener();
        this.clearTimeouts();
        this.container = null;
    };
    TooltipDirective.prototype.clearShowTimeout = function () {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
    };
    TooltipDirective.prototype.clearHideTimeout = function () {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    };
    TooltipDirective.prototype.clearTimeouts = function () {
        this.clearShowTimeout();
        this.clearHideTimeout();
    };
    TooltipDirective.prototype.ngOnDestroy = function () {
        this.unbindEvents();
        this.remove();
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TooltipDirective.prototype, "tooltipPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TooltipDirective.prototype, "tooltipEvent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TooltipDirective.prototype, "appendTo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TooltipDirective.prototype, "positionStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TooltipDirective.prototype, "tooltipStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TooltipDirective.prototype, "tooltipZIndex", void 0);
    __decorate([
        Input("tooltipDisabled"),
        __metadata("design:type", Boolean)
    ], TooltipDirective.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TooltipDirective.prototype, "escape", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TooltipDirective.prototype, "showDelay", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TooltipDirective.prototype, "hideDelay", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TooltipDirective.prototype, "life", void 0);
    __decorate([
        Input('tooltip'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TooltipDirective.prototype, "text", null);
    TooltipDirective = __decorate([
        Directive({
            selector: '[tooltip]',
            providers: [DomHandler]
        }),
        __metadata("design:paramtypes", [ElementRef, DomHandler, NgZone])
    ], TooltipDirective);
    return TooltipDirective;
}());
export { TooltipDirective };
var TooltipModule = /** @class */ (function () {
    function TooltipModule() {
    }
    TooltipModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [TooltipDirective],
            declarations: [TooltipDirective]
        })
    ], TooltipModule);
    return TooltipModule;
}());
export { TooltipModule };
//# sourceMappingURL=tooltip.directive.js.map
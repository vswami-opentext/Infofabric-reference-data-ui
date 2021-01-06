var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ViewChild, ElementRef, Input, Output, EventEmitter, ContentChildren, QueryList, Renderer2, forwardRef, ChangeDetectorRef, IterableDiffers } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InputTextModule } from '../inputtext/inputtext';
import { ButtonModule } from '../button/button';
import { SharedModule, PrimeTemplate } from '../common/shared';
import { DomHandler } from './DOM';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ObjectUtils } from './ObjectUTIL';
import { PerfectScrollbarModule, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
export var AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return AutoComplete; }),
    multi: true
};
var AutoComplete = /** @class */ (function () {
    function AutoComplete(el, renderer, cd, differs) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.differs = differs;
        this.minLength = 1;
        this.delay = 0;
        this.type = 'text';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.completeMethod = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onUnselect = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onDropdownClick = new EventEmitter();
        this.onClear = new EventEmitter();
        this.onKeyUp = new EventEmitter();
        this.onScrollEnd = new EventEmitter();
        this.scrollHeight = '250px';
        this.dropdownMode = 'blank';
        this.immutable = true;
        this.showTransitionOptions = '10ms ease-out';
        this.hideTransitionOptions = '10ms ease-in';
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.overlayVisible = false;
        this.focus = false;
        this.inputFieldValue = null;
        this.differ = differs.find([]).create(null);
    }
    Object.defineProperty(AutoComplete.prototype, "suggestions", {
        get: function () {
            return this._suggestions;
        },
        set: function (val) {
            this._suggestions = val;
            if (this.immutable) {
                this.handleSuggestionsChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    AutoComplete.prototype.ngDoCheck = function () {
        if (!this.immutable) {
            var changes = this.differ.diff(this.suggestions);
            if (changes) {
                this.handleSuggestionsChange();
            }
        }
    };
    AutoComplete.prototype.onScrollReachEndEvent = function (event) {
        if (event.target.className.indexOf("active-y") > 0) {
            this.onScrollEnd.emit(event);
            // Scrolbar not updating new scroll positions
            //For now manually moving scroller
            //     setTimeout(()=>{    
            //         this.pScrollBar.scrollToBottom(50,0);
            //    }, 500);
        }
    };
    AutoComplete.prototype.ngAfterViewChecked = function () {
        var _this = this;
        //Use timeouts as since Angular 4.2, AfterViewChecked is broken and not called after panel is updated
        if (this.suggestionsUpdated && this.overlay && this.overlay.offsetParent) {
            setTimeout(function () { return _this.alignOverlay(); }, 1);
            this.suggestionsUpdated = false;
        }
        if (this.highlightOptionChanged) {
            setTimeout(function () {
                var listItem = DomHandler.findSingle(_this.overlay, 'li.ot-ui-state-highlight');
                if (listItem) {
                    DomHandler.scrollInView(_this.overlay, listItem);
                }
            }, 1);
            this.highlightOptionChanged = false;
        }
    };
    AutoComplete.prototype.handleSuggestionsChange = function () {
        if (this._suggestions != null && this.loading) {
            this.highlightOption = null;
            if (this._suggestions.length) {
                this.noResults = false;
                this.show();
                this.suggestionsUpdated = true;
                if (this.autoHighlight) {
                    this.highlightOption = this._suggestions[0];
                }
            }
            else {
                this.noResults = true;
                if (this.emptyMessage) {
                    this.show();
                    this.suggestionsUpdated = true;
                }
                else {
                    this.hide();
                }
            }
            this.loading = false;
        }
    };
    AutoComplete.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                case 'selectedItem':
                    _this.selectedItemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    AutoComplete.prototype.writeValue = function (value) {
        this.value = value;
        this.filled = this.value && this.value != '';
        this.updateInputField();
    };
    AutoComplete.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    AutoComplete.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    AutoComplete.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    AutoComplete.prototype.onInput = function (event) {
        var _this = this;
        if (!this.inputKeyDown) {
            return;
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        var value = event.target.value;
        if (!this.multiple && !this.forceSelection) {
            this.onModelChange(value);
        }
        if (value.length === 0) {
            this.hide();
            this.onClear.emit(event);
            this.onModelChange(value);
        }
        if (value.length >= this.minLength) {
            this.timeout = setTimeout(function () {
                _this.search(event, value);
            }, this.delay);
        }
        else {
            this.suggestions = null;
            this.hide();
        }
        this.updateFilledState();
        this.inputKeyDown = false;
    };
    AutoComplete.prototype.onInputClick = function (event) {
        if (this.documentClickListener) {
            this.inputClick = true;
        }
    };
    AutoComplete.prototype.search = function (event, query) {
        //allow empty string but not undefined or null
        if (query === undefined || query === null) {
            return;
        }
        this.loading = true;
        this.completeMethod.emit({
            originalEvent: event,
            query: query
        });
    };
    AutoComplete.prototype.selectItem = function (option, focus) {
        if (focus === void 0) { focus = true; }
        if (this.forceSelectionUpdateModelTimeout) {
            clearTimeout(this.forceSelectionUpdateModelTimeout);
            this.forceSelectionUpdateModelTimeout = null;
        }
        if (this.multiple) {
            this.multiInputEL.nativeElement.value = '';
            this.value = this.value || [];
            if (!this.isSelected(option)) {
                this.value = this.value.concat([option]);
                this.onModelChange(this.value);
            }
        }
        else {
            this.inputEL.nativeElement.value = this.field ? ObjectUtils.resolveFieldData(option, this.field) || '' : option;
            this.value = option;
            this.onModelChange(this.value);
        }
        this.onSelect.emit(option);
        this.updateFilledState();
        if (focus) {
            this.focusInput();
        }
    };
    AutoComplete.prototype.show = function () {
        if (this.multiInputEL || this.inputEL) {
            var hasFocus = this.multiple ? document.activeElement == this.multiInputEL.nativeElement : document.activeElement == this.inputEL.nativeElement;
            if (!this.overlayVisible && hasFocus) {
                this.overlayVisible = true;
            }
        }
    };
    AutoComplete.prototype.onOverlayAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.appendOverlay();
                if (this.autoZIndex) {
                    this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                this.alignOverlay();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                break;
            case 'void':
                this.onOverlayHide();
                break;
        }
    };
    AutoComplete.prototype.onOverlayAnimationDone = function (event) {
        if (event.toState === 'void') {
            this._suggestions = null;
        }
    };
    AutoComplete.prototype.appendOverlay = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
            this.overlay.style.minWidth = DomHandler.getWidth(this.el.nativeElement.children[0]) + 'px';
        }
    };
    AutoComplete.prototype.resolveFieldData = function (value) {
        return this.field ? ObjectUtils.resolveFieldData(value, this.field) : value;
    };
    AutoComplete.prototype.restoreOverlayAppend = function () {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    };
    AutoComplete.prototype.alignOverlay = function () {
        if (this.appendTo)
            DomHandler.absolutePosition(this.overlay, (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
        else
            DomHandler.relativePosition(this.overlay, (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
    };
    AutoComplete.prototype.hide = function () {
        this.overlayVisible = false;
    };
    AutoComplete.prototype.handleDropdownClick = function (event) {
        this.focusInput();
        var queryValue = this.multiple ? this.multiInputEL.nativeElement.value : this.inputEL.nativeElement.value;
        if (this.dropdownMode === 'blank')
            this.search(event, '');
        else if (this.dropdownMode === 'current')
            this.search(event, queryValue);
        this.onDropdownClick.emit({
            originalEvent: event,
            query: queryValue
        });
    };
    AutoComplete.prototype.focusInput = function () {
        if (this.multiple)
            this.multiInputEL.nativeElement.focus();
        else
            this.inputEL.nativeElement.focus();
    };
    AutoComplete.prototype.removeItem = function (item) {
        var itemIndex = DomHandler.index(item);
        var removedValue = this.value[itemIndex];
        this.value = this.value.filter(function (val, i) { return i != itemIndex; });
        this.onModelChange(this.value);
        this.updateFilledState();
        this.onUnselect.emit(removedValue);
    };
    AutoComplete.prototype.onKeydown = function (event) {
        if (this.overlayVisible) {
            var highlightItemIndex = this.findOptionIndex(this.highlightOption);
            switch (event.which) {
                //down
                case 40:
                    if (highlightItemIndex != -1) {
                        var nextItemIndex = highlightItemIndex + 1;
                        if (nextItemIndex != (this.suggestions.length)) {
                            this.highlightOption = this.suggestions[nextItemIndex];
                            this.highlightOptionChanged = true;
                        }
                    }
                    else {
                        this.highlightOption = this.suggestions[0];
                    }
                    event.preventDefault();
                    break;
                //up
                case 38:
                    if (highlightItemIndex > 0) {
                        var prevItemIndex = highlightItemIndex - 1;
                        this.highlightOption = this.suggestions[prevItemIndex];
                        this.highlightOptionChanged = true;
                    }
                    event.preventDefault();
                    break;
                //enter
                case 13:
                    if (this.highlightOption) {
                        this.selectItem(this.highlightOption);
                        this.hide();
                    }
                    event.preventDefault();
                    break;
                //escape
                case 27:
                    this.hide();
                    event.preventDefault();
                    break;
                //tab
                case 9:
                    if (this.highlightOption) {
                        this.selectItem(this.highlightOption);
                    }
                    this.hide();
                    break;
            }
        }
        else {
            if (event.which === 40 && this.suggestions) {
                this.search(event, event.target.value);
            }
        }
        if (this.multiple) {
            switch (event.which) {
                //backspace
                case 8:
                    if (this.value && this.value.length && !this.multiInputEL.nativeElement.value) {
                        this.value = this.value.slice();
                        var removedValue = this.value.pop();
                        this.onModelChange(this.value);
                        this.updateFilledState();
                        this.onUnselect.emit(removedValue);
                    }
                    break;
            }
        }
        this.inputKeyDown = true;
    };
    AutoComplete.prototype.onKeyup = function (event) {
        this.onKeyUp.emit(event);
    };
    AutoComplete.prototype.onInputFocus = function (event) {
        this.focus = true;
        this.onFocus.emit(event);
    };
    AutoComplete.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    AutoComplete.prototype.onInputChange = function (event) {
        var _this = this;
        if (this.forceSelection && this.suggestions) {
            var valid = false;
            var inputValue = event.target.value.trim();
            if (this.suggestions) {
                var _loop_1 = function (suggestion) {
                    var itemValue = this_1.field ? ObjectUtils.resolveFieldData(suggestion, this_1.field) : suggestion;
                    if (itemValue && inputValue === itemValue.trim()) {
                        valid = true;
                        this_1.forceSelectionUpdateModelTimeout = setTimeout(function () {
                            _this.selectItem(suggestion, false);
                        }, 250);
                        return "break";
                    }
                };
                var this_1 = this;
                for (var _i = 0, _a = this.suggestions; _i < _a.length; _i++) {
                    var suggestion = _a[_i];
                    var state_1 = _loop_1(suggestion);
                    if (state_1 === "break")
                        break;
                }
            }
            if (!valid) {
                if (this.multiple) {
                    this.multiInputEL.nativeElement.value = '';
                }
                else {
                    this.value = null;
                    this.inputEL.nativeElement.value = '';
                }
                this.onClear.emit(event);
                this.onModelChange(this.value);
            }
        }
    };
    AutoComplete.prototype.onInputPaste = function (event) {
        this.onKeydown(event);
    };
    AutoComplete.prototype.isSelected = function (val) {
        var selected = false;
        if (this.value && this.value.length) {
            for (var i = 0; i < this.value.length; i++) {
                if (ObjectUtils.equals(this.value[i], val, this.dataKey)) {
                    selected = true;
                    break;
                }
            }
        }
        return selected;
    };
    AutoComplete.prototype.findOptionIndex = function (option) {
        var index = -1;
        if (this.suggestions) {
            for (var i = 0; i < this.suggestions.length; i++) {
                if (ObjectUtils.equals(option, this.suggestions[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    AutoComplete.prototype.updateFilledState = function () {
        if (this.multiple)
            this.filled = (this.value && this.value.length) || (this.multiInputEL && this.multiInputEL.nativeElement && this.multiInputEL.nativeElement.value != '');
        else
            this.filled = (this.inputFieldValue && this.inputFieldValue != '') || (this.inputEL && this.inputEL.nativeElement && this.inputEL.nativeElement.value != '');
        ;
    };
    AutoComplete.prototype.updateInputField = function () {
        var formattedValue = this.value ? (this.field ? ObjectUtils.resolveFieldData(this.value, this.field) || '' : this.value) : '';
        this.inputFieldValue = formattedValue;
        if (this.inputEL && this.inputEL.nativeElement) {
            this.inputEL.nativeElement.value = formattedValue;
        }
        this.updateFilledState();
    };
    AutoComplete.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
                if (event.which === 3) {
                    return;
                }
                if (!_this.inputClick && !_this.isDropdownClick(event)) {
                    _this.hide();
                }
                _this.inputClick = false;
                _this.cd.markForCheck();
            });
        }
    };
    AutoComplete.prototype.isDropdownClick = function (event) {
        if (this.dropdown) {
            var target = event.target;
            return (target === this.dropdownButton.nativeElement || target.parentNode === this.dropdownButton.nativeElement);
        }
        else {
            return false;
        }
    };
    AutoComplete.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    AutoComplete.prototype.bindDocumentResizeListener = function () {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    };
    AutoComplete.prototype.unbindDocumentResizeListener = function () {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    };
    AutoComplete.prototype.onWindowResize = function () {
        this.hide();
    };
    AutoComplete.prototype.onOverlayHide = function () {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.overlay = null;
    };
    AutoComplete.prototype.ngOnDestroy = function () {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    };
    __decorate([
        ViewChild('pscrollBar', { read: PerfectScrollbarDirective }),
        __metadata("design:type", PerfectScrollbarDirective)
    ], AutoComplete.prototype, "pScrollBar", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "minLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "delay", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AutoComplete.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AutoComplete.prototype, "inputStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "inputId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "inputStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "maxlength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "required", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "size", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AutoComplete.prototype, "appendTo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "autoHighlight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "forceSelection", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "autoZIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "baseZIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "ariaLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "ariaLabelledBy", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AutoComplete.prototype, "completeMethod", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AutoComplete.prototype, "onSelect", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AutoComplete.prototype, "onUnselect", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AutoComplete.prototype, "onFocus", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AutoComplete.prototype, "onBlur", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AutoComplete.prototype, "onDropdownClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AutoComplete.prototype, "onClear", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AutoComplete.prototype, "onKeyUp", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AutoComplete.prototype, "onScrollEnd", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "field", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "scrollHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "dropdown", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "dropdownMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "multiple", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "tabindex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "dataKey", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "emptyMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "immutable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "showTransitionOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "hideTransitionOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "autofocus", void 0);
    __decorate([
        ViewChild('in'),
        __metadata("design:type", ElementRef)
    ], AutoComplete.prototype, "inputEL", void 0);
    __decorate([
        ViewChild('multiIn'),
        __metadata("design:type", ElementRef)
    ], AutoComplete.prototype, "multiInputEL", void 0);
    __decorate([
        ViewChild('multiContainer'),
        __metadata("design:type", ElementRef)
    ], AutoComplete.prototype, "multiContainerEL", void 0);
    __decorate([
        ViewChild('ddBtn'),
        __metadata("design:type", ElementRef)
    ], AutoComplete.prototype, "dropdownButton", void 0);
    __decorate([
        ContentChildren(PrimeTemplate),
        __metadata("design:type", QueryList)
    ], AutoComplete.prototype, "templates", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], AutoComplete.prototype, "suggestions", null);
    AutoComplete = __decorate([
        Component({
            selector: 'ot-autoComplete',
            template: "\r\n        <span [ngClass]=\"{'ot-ui-autocomplete ot-ui-widget':true,'ot-ui-autocomplete-dd':dropdown,'ot-ui-autocomplete-multiple':multiple}\" [ngStyle]=\"style\" [class]=\"styleClass\">\r\n            <input *ngIf=\"!multiple\" #in [attr.type]=\"type\" [attr.id]=\"inputId\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" autocomplete=\"off\" [attr.required]=\"required\"\r\n            [ngClass]=\"'ot-ui-inputtext ot-ui-widget ot-ui-state-default ot-ui-corner-all ot-ui-autocomplete-input'\" [value]=\"inputFieldValue\"\r\n            (click)=\"onInputClick($event)\" (input)=\"onInput($event)\" (keydown)=\"onKeydown($event)\" (keyup)=\"onKeyup($event)\" [attr.autofocus]=\"autofocus\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" (change)=\"onInputChange($event)\" (paste)=\"onInputPaste($event)\"\r\n            [attr.placeholder]=\"placeholder\" [attr.size]=\"size\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [readonly]=\"readonly\" [disabled]=\"disabled\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledBy\" [attr.aria-required]=\"required\"\r\n            ><ul *ngIf=\"multiple\" #multiContainer class=\"ot-ui-autocomplete-multiple-container ot-ui-widget ot-ui-inputtext ot-ui-state-default ot-ui-corner-all\" [ngClass]=\"{'ot-ui-state-disabled':disabled,'ot-ui-state-focus':focus}\" (click)=\"multiIn.focus()\">\r\n                <li #token *ngFor=\"let val of value\" class=\"ot-ui-autocomplete-token ot-ui-state-highlight ot-ui-corner-all\">\r\n                    <span class=\"ot-ui-autocomplete-token-icon pi pi-fw pi-times\" (click)=\"removeItem(token)\" *ngIf=\"!disabled\"></span>\r\n                    <span *ngIf=\"!selectedItemTemplate\" class=\"ot-ui-autocomplete-token-label\">{{resolveFieldData(val)}}</span>\r\n                    <ng-container *ngTemplateOutlet=\"selectedItemTemplate; context: {$implicit: val}\"></ng-container>\r\n                </li>\r\n                <li class=\"ot-ui-autocomplete-input-token\">\r\n                    <input #multiIn [attr.type]=\"type\" [attr.id]=\"inputId\" [disabled]=\"disabled\" [attr.placeholder]=\"(value&&value.length ? null : placeholder)\" [attr.tabindex]=\"tabindex\" (input)=\"onInput($event)\"  (click)=\"onInputClick($event)\"\r\n                            (keydown)=\"onKeydown($event)\" [readonly]=\"readonly\" (keyup)=\"onKeyup($event)\" [attr.autofocus]=\"autofocus\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" (change)=\"onInputChange($event)\" (paste)=\"onInputPaste($event)\" autocomplete=\"off\" \r\n                            [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledBy\" [attr.aria-required]=\"required\">\r\n                </li>\r\n            </ul\r\n            ><i *ngIf=\"loading\" class=\"ot-ui-autocomplete-loader pi pi-spinner pi-spin\"></i><button #ddBtn type=\"button\" pButton icon=\"pi pi-fw pi-caret-down\" class=\"ot-ui-autocomplete-dropdown\" [disabled]=\"disabled\"\r\n                (click)=\"handleDropdownClick($event)\" *ngIf=\"dropdown\"></button>\r\n            <div #panel *ngIf=\"overlayVisible\"  class=\"ot-ui-autocomplete-panel ot-ui-widget ot-ui-widget-content ot-ui-corner-all ot-ui-shadow\"\r\n                [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationDone($event)\">\r\n               <div  [style.max-height]=\"scrollHeight\"  (psYReachEnd)=\"onScrollReachEndEvent($event)\" [perfectScrollbar]=\"{suppressScrollX: false, minScrollbarLength:16}\">\r\n                <ul class=\"ot-ui-autocomplete-items ot-ui-autocomplete-list ot-ui-widget-content ot-ui-widget ot-ui-corner-all ot-ui-helper-reset\">\r\n                    <li *ngFor=\"let option of suggestions; let idx = index\" [ngClass]=\"{'ot-ui-autocomplete-list-item ot-ui-corner-all':true,'ot-ui-state-highlight':(highlightOption==option)}\"\r\n                        (mouseenter)=\"highlightOption=option\" (mouseleave)=\"highlightOption=null\" (click)=\"selectItem(option)\">\r\n                        <span *ngIf=\"!itemTemplate\">{{resolveFieldData(option)}}</span>\r\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: idx}\"></ng-container>\r\n                    </li>\r\n                    <li *ngIf=\"noResults && emptyMessage\" class=\"ot-ui-autocomplete-list-item ot-ui-corner-all\">{{emptyMessage}}</li>\r\n                </ul>\r\n                </div>\r\n            </div>\r\n        </span>",
            animations: [
                trigger('overlayAnimation', [
                    state('void', style({
                        transform: 'translateY(5%)',
                        opacity: 0
                    })),
                    state('visible', style({
                        transform: 'translateY(0)',
                        opacity: 1
                    })),
                    transition('void => visible', animate('{{showTransitionParams}}')),
                    transition('visible => void', animate('{{hideTransitionParams}}'))
                ])
            ],
            host: {
                '[class.ot-ui-inputwrapper-filled]': 'filled',
                '[class.ot-ui-inputwrapper-focus]': 'focus && !disabled'
            },
            providers: [AUTOCOMPLETE_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2, ChangeDetectorRef, IterableDiffers])
    ], AutoComplete);
    return AutoComplete;
}());
export { AutoComplete };
var PERFECT_SCROLLBAR_CONFIG = {};
var AutoCompleteModule = /** @class */ (function () {
    function AutoCompleteModule() {
    }
    AutoCompleteModule = __decorate([
        NgModule({
            imports: [CommonModule, InputTextModule, ButtonModule, SharedModule, PerfectScrollbarModule],
            exports: [AutoComplete, SharedModule],
            declarations: [AutoComplete],
            providers: [ObjectUtils]
        })
    ], AutoCompleteModule);
    return AutoCompleteModule;
}());
export { AutoCompleteModule };
//# sourceMappingURL=autocomplete.js.map
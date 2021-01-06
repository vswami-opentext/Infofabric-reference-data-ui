var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, Renderer2, EventEmitter, ContentChildren, QueryList, ViewChild, forwardRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate } from '../common/shared';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var DROPDOWN_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MiniDropdown; }),
    multi: true
};
var MiniDropdown = /** @class */ (function () {
    function MiniDropdown(el, domHandler, renderer, cd, objectUtils, zone) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.cd = cd;
        this.objectUtils = objectUtils;
        this.zone = zone;
        this.scrollHeight = '200px';
        this.autoWidth = true;
        this.filterBy = 'label';
        this.lazy = true;
        this.resetFilterOnHide = false;
        this.dropdownIcon = 'ot-fa ot-fa-fw ot-fa-caret-down';
        this.onChange = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.panelVisible = false;
    }
    MiniDropdown.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    MiniDropdown.prototype.ngOnInit = function () {
        this.optionsToDisplay = this.options;
        this.updateSelectedOption(null);
    };
    Object.defineProperty(MiniDropdown.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (val) {
            var opts = this.optionLabel ? this.objectUtils.generateSelectItems(val, this.optionLabel) : val;
            this._options = opts;
            this.optionsToDisplay = this._options;
            this.updateSelectedOption(this.value);
            this.optionsChanged = true;
            if (this.filterValue && this.filterValue.length) {
                this.activateFilter();
            }
        },
        enumerable: true,
        configurable: true
    });
    MiniDropdown.prototype.ngAfterViewInit = function () {
        this.container = this.containerViewChild.nativeElement;
        this.panel = this.panelViewChild.nativeElement;
        this.itemsWrapper = this.itemsWrapperViewChild.nativeElement;
        if (this.editable) {
            this.updateEditableLabel();
        }
        this.updateDimensions();
        this.initialized = true;
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                this.domHandler.appendChild(this.panel, this.appendTo);
        }
    };
    Object.defineProperty(MiniDropdown.prototype, "label", {
        get: function () {
            return (this.selectedOption ? this.selectedOption.label : null);
        },
        enumerable: true,
        configurable: true
    });
    MiniDropdown.prototype.updateEditableLabel = function () {
        if (this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
            this.editableInputViewChild.nativeElement.value = (this.selectedOption ? this.selectedOption.label : this.value || '');
        }
    };
    MiniDropdown.prototype.onItemClick = function (event, option) {
        this.itemClick = true;
        this.selectItem(event, option);
        this.focusViewChild.nativeElement.focus();
        this.hide();
    };
    MiniDropdown.prototype.selectItem = function (event, option) {
        if (this.selectedOption != option) {
            this.selectedOption = option;
            this.value = option.value;
            this.onModelChange(this.value);
            this.updateEditableLabel();
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    MiniDropdown.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.shown) {
            this.onShow();
            this.shown = false;
        }
        if (this.optionsChanged && this.panelVisible) {
            this.optionsChanged = false;
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.updateDimensions();
                    _this.alignPanel();
                }, 1);
            });
        }
        if (this.selectedOptionUpdated && this.itemsWrapper) {
            var selectedItem = this.domHandler.findSingle(this.panel, 'li.ot-ui-state-highlight');
            if (selectedItem) {
                this.domHandler.scrollInView(this.itemsWrapper, this.domHandler.findSingle(this.panel, 'li.ot-ui-state-highlight'));
            }
            this.selectedOptionUpdated = false;
        }
    };
    MiniDropdown.prototype.writeValue = function (value) {
        if (this.filter) {
            this.resetFilter();
        }
        this.value = value;
        this.updateSelectedOption(value);
        this.updateEditableLabel();
        this.cd.markForCheck();
    };
    MiniDropdown.prototype.resetFilter = function () {
        if (this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterViewChild.nativeElement.value = '';
        }
        this.optionsToDisplay = this.options;
    };
    MiniDropdown.prototype.updateSelectedOption = function (val) {
        this.selectedOption = this.findOption(val, this.optionsToDisplay);
        if (!this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
            this.selectedOption = this.optionsToDisplay[0];
        }
        this.selectedOptionUpdated = true;
    };
    MiniDropdown.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    MiniDropdown.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    MiniDropdown.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    MiniDropdown.prototype.updateDimensions = function () {
        if (this.autoWidth) {
            var select = this.domHandler.findSingle(this.el.nativeElement, 'select');
            if (!this.style || (!this.style['width'] && !this.style['min-width'])) {
                this.el.nativeElement.children[0].style.width = select.offsetWidth + 30 + 'px';
            }
        }
    };
    MiniDropdown.prototype.onMouseclick = function (event) {
        var _this = this;
        if (this.disabled || this.readonly) {
            return;
        }
        this.selfClick = true;
        if (!this.itemClick) {
            this.focusViewChild.nativeElement.focus();
            if (this.panelVisible)
                this.hide();
            else {
                this.show();
                if (this.filterViewChild != undefined) {
                    setTimeout(function () {
                        _this.filterViewChild.nativeElement.focus();
                    }, 200);
                }
            }
        }
    };
    MiniDropdown.prototype.onEditableInputClick = function (event) {
        this.itemClick = true;
        this.bindDocumentClickListener();
    };
    MiniDropdown.prototype.onEditableInputFocus = function (event) {
        this.focus = true;
        this.hide();
    };
    MiniDropdown.prototype.onEditableInputChange = function (event) {
        this.value = event.target.value;
        this.updateSelectedOption(this.value);
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    MiniDropdown.prototype.onShow = function () {
        if (this.options && this.options.length) {
            this.alignPanel();
            this.bindDocumentClickListener();
            var selectedListItem = this.domHandler.findSingle(this.itemsWrapper, '.ot-ui-mini-dropdown-item.ot-ui-state-highlight');
            if (selectedListItem) {
                this.domHandler.scrollInView(this.itemsWrapper, selectedListItem);
            }
        }
    };
    MiniDropdown.prototype.show = function () {
        if (this.appendTo) {
            this.panel.style.minWidth = this.domHandler.getWidth(this.container) + 'px';
        }
        this.panel.style.zIndex = String(++DomHandler.zindex);
        this.panelVisible = true;
        this.shown = true;
    };
    MiniDropdown.prototype.hide = function () {
        this.panelVisible = false;
        if (this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }
    };
    MiniDropdown.prototype.alignPanel = function () {
        if (this.appendTo)
            this.domHandler.absolutePosition(this.panel, this.container);
        else
            this.domHandler.relativePosition(this.panel, this.container);
    };
    MiniDropdown.prototype.onInputFocus = function (event) {
        this.focus = true;
        this.onFocus.emit(event);
    };
    MiniDropdown.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    MiniDropdown.prototype.onKeydown = function (event) {
        if (this.readonly) {
            return;
        }
        var selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
        switch (event.which) {
            //down
            case 40:
                if (!this.panelVisible && event.altKey) {
                    this.show();
                }
                else {
                    if (selectedItemIndex !== -1) {
                        var nextItemIndex = selectedItemIndex + 1;
                        if (nextItemIndex != (this.optionsToDisplay.length)) {
                            this.selectItem(event, this.optionsToDisplay[nextItemIndex]);
                            this.selectedOptionUpdated = true;
                        }
                    }
                    else if (this.optionsToDisplay) {
                        this.selectItem(event, this.optionsToDisplay[0]);
                    }
                }
                event.preventDefault();
                break;
            //up
            case 38:
                if (selectedItemIndex > 0) {
                    var prevItemIndex = selectedItemIndex - 1;
                    this.selectItem(event, this.optionsToDisplay[prevItemIndex]);
                    this.selectedOptionUpdated = true;
                }
                event.preventDefault();
                break;
            //space
            case 32:
            case 32:
                if (!this.panelVisible) {
                    this.show();
                    event.preventDefault();
                }
                break;
            //enter
            case 13:
                this.hide();
                event.preventDefault();
                break;
            //escape and tab
            case 27:
            case 9:
                this.hide();
                break;
        }
    };
    MiniDropdown.prototype.findOptionIndex = function (val, opts) {
        var index = -1;
        if (opts) {
            for (var i = 0; i < opts.length; i++) {
                if ((val == null && opts[i].value == null) || this.objectUtils.equals(val, opts[i].value, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    MiniDropdown.prototype.findOption = function (val, opts) {
        var index = this.findOptionIndex(val, opts);
        return (index != -1) ? opts[index] : null;
    };
    MiniDropdown.prototype.onFilter = function (event) {
        var inputValue = event.target.value.toLowerCase();
        if (inputValue && inputValue.length) {
            this.filterValue = inputValue;
            this.activateFilter();
        }
        else {
            this.filterValue = null;
            this.optionsToDisplay = this.options;
        }
        this.optionsChanged = true;
    };
    MiniDropdown.prototype.activateFilter = function () {
        var searchFields = this.filterBy.split(',');
        if (this.options && this.options.length) {
            this.optionsToDisplay = this.objectUtils.filter(this.options, searchFields, this.filterValue);
            this.optionsChanged = true;
        }
    };
    MiniDropdown.prototype.applyFocus = function () {
        if (this.editable)
            this.domHandler.findSingle(this.el.nativeElement, '.ot-ui-mini-dropdown-label.ot-ui-inputtext').focus();
        else
            this.domHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
    };
    MiniDropdown.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.selfClick && !_this.itemClick) {
                    _this.panelVisible = false;
                    _this.unbindDocumentClickListener();
                }
                _this.selfClick = false;
                _this.itemClick = false;
                _this.cd.markForCheck();
            });
        }
    };
    MiniDropdown.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    MiniDropdown.prototype.ngOnDestroy = function () {
        this.initialized = false;
        this.unbindDocumentClickListener();
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.panel);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MiniDropdown.prototype, "scrollHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MiniDropdown.prototype, "filter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MiniDropdown.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MiniDropdown.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MiniDropdown.prototype, "panelStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MiniDropdown.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MiniDropdown.prototype, "panelStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MiniDropdown.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MiniDropdown.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MiniDropdown.prototype, "autoWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MiniDropdown.prototype, "required", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MiniDropdown.prototype, "editable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MiniDropdown.prototype, "appendTo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MiniDropdown.prototype, "tabindex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MiniDropdown.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MiniDropdown.prototype, "filterPlaceholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MiniDropdown.prototype, "inputId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MiniDropdown.prototype, "dataKey", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MiniDropdown.prototype, "filterBy", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MiniDropdown.prototype, "lazy", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MiniDropdown.prototype, "autofocus", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MiniDropdown.prototype, "resetFilterOnHide", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MiniDropdown.prototype, "dropdownIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MiniDropdown.prototype, "optionLabel", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MiniDropdown.prototype, "onChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MiniDropdown.prototype, "onFocus", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MiniDropdown.prototype, "onBlur", void 0);
    __decorate([
        ViewChild('container'),
        __metadata("design:type", ElementRef)
    ], MiniDropdown.prototype, "containerViewChild", void 0);
    __decorate([
        ViewChild('panel'),
        __metadata("design:type", ElementRef)
    ], MiniDropdown.prototype, "panelViewChild", void 0);
    __decorate([
        ViewChild('itemswrapper'),
        __metadata("design:type", ElementRef)
    ], MiniDropdown.prototype, "itemsWrapperViewChild", void 0);
    __decorate([
        ViewChild('filter'),
        __metadata("design:type", ElementRef)
    ], MiniDropdown.prototype, "filterViewChild", void 0);
    __decorate([
        ViewChild('in'),
        __metadata("design:type", ElementRef)
    ], MiniDropdown.prototype, "focusViewChild", void 0);
    __decorate([
        ViewChild('editableInput'),
        __metadata("design:type", ElementRef)
    ], MiniDropdown.prototype, "editableInputViewChild", void 0);
    __decorate([
        ContentChildren(PrimeTemplate),
        __metadata("design:type", QueryList)
    ], MiniDropdown.prototype, "templates", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], MiniDropdown.prototype, "options", null);
    MiniDropdown = __decorate([
        Component({
            selector: 'ot-mini-dropdown',
            template: "<div #container [ngClass]=\"{'ot-ui-mini-dropdown ot-ui-widget ot-ui-state-default ot-ui-corner-all ot-ui-helper-clearfix':true,\r\n    'ot-ui-state-disabled':disabled,'ot-ui-mini-dropdown-open':panelVisible,'ot-ui-state-focus':focus}\" (click)=\"onMouseclick($event)\" [ngStyle]=\"style\" [class]=\"styleClass\">\r\n        <div class=\"ot-ui-helper-hidden-accessible\" *ngIf=\"autoWidth\">\r\n            <select [required]=\"required\" [attr.name]=\"name\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" tabindex=\"-1\" aria-hidden=\"true\">\r\n            <option *ngIf=\"placeholder\">{{placeholder}}</option>\r\n            <option *ngFor=\"let option of options\" [value]=\"option.value\" [selected]=\"selectedOption == option\">{{option.label}}</option>\r\n        </select>\r\n        </div>\r\n        <div class=\"ot-ui-helper-hidden-accessible\">\r\n            <input #in [attr.id]=\"inputId\" type=\"text\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" readonly (focus)=\"onInputFocus($event)\" role=\"listbox\" (blur)=\"onInputBlur($event)\" (keydown)=\"onKeydown($event)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\"\r\n                [attr.autofocus]=\"autofocus\">\r\n        </div>\r\n        <label [ngClass]=\"{'ot-ui-mini-dropdown-label ot-ui-inputtext ot-ui-corner-all':true,'ot-ui-mini-dropdown-label-empty':(label == null || label.length === 0)}\" *ngIf=\"!editable && (label != null)\">{{label||'empty'}}</label>\r\n        <label [ngClass]=\"{'ot-ui-mini-dropdown-label ot-ui-inputtext ot-ui-corner-all ot-ui-placeholder':true,'ot-ui-mini-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}\" *ngIf=\"!editable && (label == null)\">{{placeholder||'empty'}}</label>\r\n        <input #editableInput type=\"text\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" class=\"ot-ui-mini-dropdown-label ot-ui-inputtext ot-ui-corner-all\" *ngIf=\"editable\" [disabled]=\"disabled\" [attr.placeholder]=\"placeholder\" (click)=\"onEditableInputClick($event)\"\r\n            (input)=\"onEditableInputChange($event)\" (focus)=\"onEditableInputFocus($event)\" (blur)=\"onInputBlur($event)\">\r\n        <div class=\"ot-ui-mini-dropdown-trigger ot-ui-state-default ot-ui-corner-right\">\r\n            <span class=\"ot-ui-clickable\" [ngClass]=\"dropdownIcon\"></span>\r\n        </div>\r\n        <div #panel [ngClass]=\"'ot-ui-mini-dropdown-panel ot-ui-widget-content ot-ui-corner-all ot-ui-shadow'\" [@panelState]=\"panelVisible ? 'visible' : 'hidden'\" [style.display]=\"panelVisible ? 'block' : 'none'\" [ngStyle]=\"panelStyle\" [class]=\"panelStyleClass\">\r\n            <div *ngIf=\"filter\" class=\"ot-ui-mini-dropdown-filter-container\" (input)=\"onFilter($event)\" (click)=\"$event.stopPropagation()\">\r\n                <input #filter type=\"text\" autocomplete=\"off\" class=\"ot-ui-mini-dropdown-filter ot-ui-inputtext ot-ui-widget ot-ui-state-default ot-ui-corner-all\" [attr.placeholder]=\"filterPlaceholder\" (keydown.enter)=\"$event.preventDefault()\" (keydown)=\"onKeydown($event)\">\r\n                <span class=\"ot-fa ot-fa-search\"></span>\r\n            </div>\r\n            <div #itemswrapper class=\"ot-ui-mini-dropdown-items-wrapper\" [style.max-height]=\"scrollHeight||'auto'\">\r\n                <ul class=\"ot-ui-mini-dropdown-items ot-ui-mini-dropdown-list ot-ui-widget-content ot-ui-widget ot-ui-corner-all ot-ui-helper-reset\" *ngIf=\"lazy ? panelVisible : true\">\r\n                    <li *ngFor=\"let option of optionsToDisplay;let i=index\" [ngClass]=\"{'ot-ui-mini-dropdown-item ot-ui-corner-all':true, 'ot-ui-state-highlight':(selectedOption == option),\r\n                    'ot-ui-mini-dropdown-item-empty':!option.label||option.label.length === 0}\" (click)=\"onItemClick($event, option)\">\r\n                        <span *ngIf=\"!itemTemplate\">{{option.label||'empty'}}</span>\r\n                        <ng-template [pTemplateWrapper]=\"itemTemplate\" [item]=\"option\" *ngIf=\"itemTemplate\"></ng-template>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>",
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
            providers: [DomHandler, ObjectUtils, DROPDOWN_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [ElementRef, DomHandler, Renderer2, ChangeDetectorRef,
            ObjectUtils, NgZone])
    ], MiniDropdown);
    return MiniDropdown;
}());
export { MiniDropdown };
var MiniDropdownModule = /** @class */ (function () {
    function MiniDropdownModule() {
    }
    MiniDropdownModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule],
            exports: [MiniDropdown, SharedModule],
            declarations: [MiniDropdown]
        })
    ], MiniDropdownModule);
    return MiniDropdownModule;
}());
export { MiniDropdownModule };
//# sourceMappingURL=mini-dropdown.js.map
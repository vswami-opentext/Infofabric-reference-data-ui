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
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { cloneDeep } from "lodash";
import { PerfectScrollbarModule, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
export var DROPDOWN_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SelectDropdown; }),
    multi: true
};
var SelectDropdown = /** @class */ (function () {
    function SelectDropdown(el, domHandler, renderer, cd, objectUtils, zone) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.cd = cd;
        this.objectUtils = objectUtils;
        this.zone = zone;
        this.error = false;
        this.hideLoader = true;
        this.scrollHeight = '200px';
        this.autoWidth = false;
        this.editable = true;
        this.tabindex = -1;
        this.filterBy = 'label';
        this.lazy = true;
        this.resetFilterOnHide = false;
        this.dropdownIcon = 'ot-fa ot-fa-fw ot-fa-caret-down';
        this.filterMode = 'startsWith';
        this.onChange = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.loaderStatus = false;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.panelVisible = false;
        this.psYReachEnd = new EventEmitter();
    }
    SelectDropdown.prototype.ngAfterContentInit = function () {
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
    SelectDropdown.prototype.onScrollReachEndEvent = function (event) {
        if (event.target.className.indexOf("active-y") > 0) {
            this.psYReachEnd.emit(event);
        }
    };
    SelectDropdown.prototype.ngOnInit = function () {
        if (this.returnKeyOnly && (this.dataKey == null || this.optionLabel == null)) {
            throw "returnKeyOnly requires valid dataKey and optionLabel";
        }
        this.optionsToDisplay = this.options;
        this.updateSelectedOption(null);
    };
    Object.defineProperty(SelectDropdown.prototype, "options", {
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
            this.updateEditableLabel();
        },
        enumerable: true,
        configurable: true
    });
    SelectDropdown.prototype.ngAfterViewInit = function () {
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
    Object.defineProperty(SelectDropdown.prototype, "label", {
        get: function () {
            return (this.selectedOption ? this.selectedOption.label : null);
        },
        enumerable: true,
        configurable: true
    });
    SelectDropdown.prototype.updateEditableLabel = function () {
        if (this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
            this.editableInputViewChild.nativeElement.value = (this.selectedOption ? this.selectedOption.label : this.value || '');
        }
    };
    SelectDropdown.prototype.onItemClick = function (event, option) {
        this.itemClick = true;
        this.selectItem(event, option);
        this.focusViewChild.nativeElement.focus();
        this.resetFilter();
        this.hide();
    };
    SelectDropdown.prototype.selectItem = function (event, option) {
        if (!option)
            return;
        option.label = option.label.replace("<b>", "").replace("</b>", "");
        if (this.selectedOption != option) {
            this.selectedOption = option;
            if (this.returnKeyOnly) {
                this.value = option.value[this.dataKey];
            }
            else {
                this.value = option.value;
            }
            this.onModelChange(this.value);
            this.updateEditableLabel();
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    SelectDropdown.prototype.ngAfterViewChecked = function () {
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
    SelectDropdown.prototype.writeValue = function (value) {
        if (this.filter) {
            this.resetFilter();
        }
        this.value = value;
        this.updateSelectedOption(value);
        this.updateEditableLabel();
        this.cd.markForCheck();
    };
    SelectDropdown.prototype.resetFilter = function () {
        // if(this.filterViewChild && this.filterViewChild.nativeElement) {
        //     this.filterViewChild.nativeElement.value = '';
        // }
        this.optionsToDisplay = this.options;
    };
    SelectDropdown.prototype.updateSelectedOption = function (val) {
        this.selectedOption = this.findOption(val, this.optionsToDisplay);
        if (!this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
            this.selectedOption = this.optionsToDisplay[0];
            if (this.returnKeyOnly) {
                this.value = this.selectedOption.value[this.dataKey];
            }
            else {
                this.value = this.selectedOption.value;
            }
            this.onModelChange(this.value);
        }
        this.selectedOptionUpdated = true;
    };
    SelectDropdown.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    SelectDropdown.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    SelectDropdown.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    SelectDropdown.prototype.updateDimensions = function () {
        if (this.autoWidth) {
            var select = this.domHandler.findSingle(this.el.nativeElement, 'select');
            if (!this.style || (!this.style['width'] && !this.style['min-width'])) {
                this.el.nativeElement.children[0].style.width = select.offsetWidth + 30 + 'px';
            }
        }
    };
    SelectDropdown.prototype.onMouseclick = function (event) {
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
    SelectDropdown.prototype.onEditableInputClick = function (event) {
        this.itemClick = true;
        this.bindDocumentClickListener();
    };
    SelectDropdown.prototype.onEditableInputFocus = function (event) {
        this.focus = true;
        this.hide();
        this.onFocus.emit(event);
    };
    SelectDropdown.prototype.onEditableInputChange = function (event) {
        this.value = event.target.value;
        this.updateSelectedOption(this.value);
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    SelectDropdown.prototype.onShow = function () {
        if (this.options && this.options.length) {
            this.alignPanel();
            this.bindDocumentClickListener();
            var selectedListItem = this.domHandler.findSingle(this.itemsWrapper, '.ot-ui-dropdown-item.ot-ui-state-highlight');
            if (selectedListItem) {
                this.domHandler.scrollInView(this.itemsWrapper, selectedListItem);
            }
        }
    };
    SelectDropdown.prototype.show = function () {
        if (this.appendTo) {
            this.panel.style.minWidth = this.domHandler.getWidth(this.container) + 'px';
        }
        this.panel.style.zIndex = String(++DomHandler.zindex);
        this.panelVisible = true;
        this.shown = true;
    };
    SelectDropdown.prototype.hide = function () {
        this.panelVisible = false;
        if (this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }
        this.cd.markForCheck();
    };
    SelectDropdown.prototype.alignPanel = function () {
        if (this.appendTo)
            this.domHandler.absolutePosition(this.panel, this.container);
        else
            this.domHandler.relativePosition(this.panel, this.container);
    };
    SelectDropdown.prototype.onInputFocus = function (event) {
        this.focus = true;
        this.onFocus.emit(event);
    };
    SelectDropdown.prototype.onInputBlur = function (event) {
        //  debugger;
        this.focus = false;
        this.onModelTouched();
        if (!this.selectedOption && event.target.value) {
            if (this.optionsToDisplay && this.optionsToDisplay.length > 0) {
                this.value = this.returnKeyOnly ? this.optionsToDisplay[0].value[this.dataKey] : this.optionsToDisplay[0].value;
            }
            else {
                this.value = '';
                this.optionsToDisplay = this.options;
            }
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
            this.updateSelectedOption(this.value);
            this.updateEditableLabel();
        }
        this.onBlur.emit(event);
    };
    SelectDropdown.prototype.onKeydown = function (event) {
        this.panelVisible = true;
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
                    else if (this.optionsToDisplay && this.optionsToDisplay.length > 0) {
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
    SelectDropdown.prototype.findOptionIndex = function (val, opts) {
        var index = -1;
        if (opts) {
            for (var i = 0; i < opts.length; i++) {
                if ((val == null && opts[i].value == null) || (this.returnKeyOnly && val && val.length ? this.objectUtils.equals(val, opts[i].value[this.dataKey]) : this.objectUtils.equals(val, opts[i].value, this.dataKey))) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    SelectDropdown.prototype.findOption = function (val, opts) {
        var index = this.findOptionIndex(val, opts);
        return (index != -1) ? opts[index] : null;
    };
    SelectDropdown.prototype.onFilter = function (event) {
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
    SelectDropdown.prototype.activateFilter = function () {
        var searchFields = this.filterBy.split(',');
        if (this.options && this.options.length) {
            //  this.optionsToDisplay = this.options;            
            this.optionsToDisplay = cloneDeep(this.objectUtils.filterByMode(this.options, searchFields, this.filterValue, this.filterMode));
            //COMMENTED AS REGEX FAILS ON SOME OCCASSIONS. NEEDS TO BE PROPERLY FIXED.
            //NOW BOLD STYLING ON APPLIED TEXT FILTER WON'T WORK
            // let regEx = new RegExp(this.filterValue, "ig");
            // for(let index in this.optionsToDisplay)  {
            //     var keyIndex = this.optionsToDisplay[index].label.toLowerCase().indexOf(this.filterValue);
            //     this.optionsToDisplay[index].label = this.optionsToDisplay[index].label.
            // }; 
            this.scrollToTop();
            this.optionsChanged = true;
        }
    };
    SelectDropdown.prototype.applyFocus = function () {
        if (this.editable)
            this.domHandler.findSingle(this.el.nativeElement, '.ot-ui-dropdown-label.ot-ui-inputtext').focus();
        else
            this.domHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
    };
    SelectDropdown.prototype.scrollToTop = function () {
        this.directiveScroll.scrollToTop();
    };
    SelectDropdown.prototype.bindDocumentClickListener = function () {
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
    SelectDropdown.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    SelectDropdown.prototype.ngOnDestroy = function () {
        this.initialized = false;
        this.unbindDocumentClickListener();
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.panel);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdown.prototype, "error", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdown.prototype, "hideLoader", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdown.prototype, "scrollHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdown.prototype, "filter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdown.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectDropdown.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectDropdown.prototype, "panelStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdown.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdown.prototype, "panelStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdown.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdown.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdown.prototype, "autoWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdown.prototype, "required", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdown.prototype, "editable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectDropdown.prototype, "appendTo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SelectDropdown.prototype, "tabindex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdown.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdown.prototype, "filterPlaceholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdown.prototype, "inputId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdown.prototype, "dataKey", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdown.prototype, "filterBy", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdown.prototype, "lazy", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdown.prototype, "autofocus", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdown.prototype, "resetFilterOnHide", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdown.prototype, "dropdownIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdown.prototype, "optionLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdown.prototype, "filterMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdown.prototype, "returnKeyOnly", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectDropdown.prototype, "onChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectDropdown.prototype, "onFocus", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectDropdown.prototype, "onBlur", void 0);
    __decorate([
        ViewChild('container'),
        __metadata("design:type", ElementRef)
    ], SelectDropdown.prototype, "containerViewChild", void 0);
    __decorate([
        ViewChild('panel'),
        __metadata("design:type", ElementRef)
    ], SelectDropdown.prototype, "panelViewChild", void 0);
    __decorate([
        ViewChild('itemswrapper'),
        __metadata("design:type", ElementRef)
    ], SelectDropdown.prototype, "itemsWrapperViewChild", void 0);
    __decorate([
        ViewChild('filter'),
        __metadata("design:type", ElementRef)
    ], SelectDropdown.prototype, "filterViewChild", void 0);
    __decorate([
        ViewChild('in'),
        __metadata("design:type", ElementRef)
    ], SelectDropdown.prototype, "focusViewChild", void 0);
    __decorate([
        ViewChild('editableInput'),
        __metadata("design:type", ElementRef)
    ], SelectDropdown.prototype, "editableInputViewChild", void 0);
    __decorate([
        ContentChildren(PrimeTemplate),
        __metadata("design:type", QueryList)
    ], SelectDropdown.prototype, "templates", void 0);
    __decorate([
        ViewChild(PerfectScrollbarDirective),
        __metadata("design:type", PerfectScrollbarDirective)
    ], SelectDropdown.prototype, "directiveScroll", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SelectDropdown.prototype, "psYReachEnd", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], SelectDropdown.prototype, "options", null);
    SelectDropdown = __decorate([
        Component({
            selector: 'ot-select-dropdown',
            template: "<div class=\"ot-ui-select-dropdown\">\r\n    <div  #container [ngClass]=\"{'ot-ui-dropdown-container ot-ui-dropdown ot-ui-helper-clearfix':true,\r\n    'ot-ui-state-disabled':disabled,'ot-ui-dropdown-open':panelVisible}\" (click)=\"onMouseclick($event)\" [ngStyle]=\"style\" [class]=\"styleClass\">\r\n    \r\n        <div class=\"ot-ui-helper-hidden-accessible\">\r\n            <input #in [attr.id]=\"inputId\"   autocomplete=\"restricted\" type=\"text\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" readonly (focus)=\"onInputFocus($event)\"\r\n                role=\"listbox\"  (blur)=\"onInputBlur($event)\" (keydown)=\"onKeydown($event)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\"\r\n                [attr.autofocus]=\"autofocus\">\r\n        </div>\r\n        <!--<label [ngClass]=\"{'ot-ui-noBg  ot-ui-items-font':true,'ot-ui-dropdown-label-empty':(label == null || label.length === 0)}\"\r\n            *ngIf=\"!editable && (label != null)\">{{label||'empty'}}</label>\r\n        <label [ngClass]=\"{'ot-ui-noBg  ot-ui-items-font ot-ui-placeholder':true,'ot-ui-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}\"\r\n            *ngIf=\"!editable && (label == null)\">{{placeholder||'empty'}} </label>-->\r\n        <input [ngClass]=\"{'ot-error':error}\"  autocomplete=\"restricted\" #editableInput type=\"text\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" class=\"ot-ui-dropdown-label  ot-ui-dropdown-input\"\r\n             [attr.disabled]=\"disabled ? true : null\" [readonly]=\"!editable\" [attr.placeholder]=\"placeholder\" (input)=\"onFilter($event)\" (keydown.enter)=\"$event.preventDefault()\"\r\n            (keydown)=\"onKeydown($event)\"  (click)=\"show();onEditableInputClick($event);editable ? $event.target.select():null\" (input)=\"onEditableInputChange($event)\" (focus)=\"onEditableInputFocus($event)\"\r\n            (blur)=\"onInputBlur($event)\">\r\n        <div class=\" ot-ui-icon-div ot-ui-noBg ot-ui-noborder ot-ux-align-content-center  ot-ui-corner-right ot-ui-pull-right\">\r\n            <span class=\"ot-ui-clickable\">\r\n                <i class=\"ot-ui-dropdown-icon \"></i>\r\n            </span>\r\n        </div>\r\n        <div #panel [ngClass]=\"'ot-ui-dropdown-panel ot-ui-widget-content'\" [@panelState]=\"panelVisible && optionsToDisplay.length>0 ? 'visible' : 'hidden'\"\r\n            [style.display]=\"panelVisible ? 'block' : 'none'\" [ngStyle]=\"panelStyle\" [class]=\"panelStyleClass\">\r\n            <div class=\"select-loader-wrapper\" [hidden]=\"hideLoader\">\r\n                <div class=\"select-menu-loader\">\r\n                    <div class=\"select-loader-anim\"></div>\r\n                </div>\r\n            </div>\r\n            <div #itemswrapper class=\"ot-ui-items ot-ui-dropdown-items-wrapper\" (psYReachEnd)=\"onScrollReachEndEvent($event)\" [perfectScrollbar]=\"{suppressScrollX: true, minScrollbarLength:16}\" [style.max-height]=\"scrollHeight||'auto'\">\r\n                <ul class=\"ot-ui-dropdown-items ot-ui-dropdown-list ot-ui-widget-content ot-ui-widget ot-ui-helper-reset\" *ngIf=\"lazy ? panelVisible : true\">\r\n                    <li *ngFor=\"let option of optionsToDisplay;let i=index\" [ngClass]=\"{'ot-ui-dropdown-item':true, 'ot-ui-item-highlight':(selectedOption == option),\r\n                    'ot-ui-dropdown-item-empty':!option.label||option.label.length === 0}\" (click)=\"onItemClick($event, option)\">\r\n                        <div *ngIf=\"!itemTemplate\"><span class=\"ot-ui-items-font\" [innerHTML]=\"option.label||'empty'\"></span></div>\r\n                        <ng-template [pTemplateWrapper]=\"itemTemplate\" [item]=\"option\" *ngIf=\"itemTemplate\"></ng-template>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    </div>",
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
            providers: [DomHandler, ObjectUtils, DROPDOWN_VALUE_ACCESSOR],
            styles: ["@keyframes load8{\n    0% {\n  -webkit-transform: rotate(0deg);\n  transform: rotate(0deg);\n}\n100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n}\n\n}\n\n.select-loader-wrapper {\n    cursor: auto;\n  border: 0;\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  overflow: hidden;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  top: 0;\n  left: 0;\n  margin: auto;\n  z-index: 998;\n}\n \n \n.select-menu-loader {\n  /*margin: 190px auto;*/\n  border: 10px solid #fff;\n  border-radius: 100%;\n  width: 87px;\n  height: 87px;\n  background: radial-gradient(circle,rgba(0,0,0,0) 14px,#fff 5px);\n  background: -webkit-radial-gradient(circle,rgba(0,0,0,0) 14px,#fff 5px);\n  background: -o-radial-gradient(circle,rgba(0,0,0,0) 14px,#fff 5px);\n  background: -moz-radial-gradient(circle,rgba(0,0,0,0) 14px,#fff 5px);\n  transform: translate3d(10vw,12vh,0) translate3d(-50%,-50%,0);\n  margin: 0;\n  z-index: 999;\n}\n.select-loader-anim {\n  margin: auto;\n  position: relative;\n  border: 12px solid #dbf1fe;\n  border-left: 12px solid #0072aa;\n  -webkit-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-animation: load8 1.1s infinite linear;\n  animation: load8 1.1s infinite linear;\n  width: 67px;\n    border-radius: 100%;\n  height: 67px;\n}"]
        }),
        __metadata("design:paramtypes", [ElementRef, DomHandler, Renderer2, ChangeDetectorRef,
            ObjectUtils, NgZone])
    ], SelectDropdown);
    return SelectDropdown;
}());
export { SelectDropdown };
var PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
var SelectDropdownModule = /** @class */ (function () {
    function SelectDropdownModule() {
    }
    SelectDropdownModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule, FormsModule, PerfectScrollbarModule],
            exports: [SelectDropdown, SharedModule, FormsModule],
            declarations: [SelectDropdown]
        })
    ], SelectDropdownModule);
    return SelectDropdownModule;
}());
export { SelectDropdownModule };
//# sourceMappingURL=selectDropdown.js.map
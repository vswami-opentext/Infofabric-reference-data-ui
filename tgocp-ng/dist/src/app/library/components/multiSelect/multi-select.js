var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, Renderer2, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef, ContentChildren, QueryList } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
import { SharedModule, PrimeTemplate } from '../common/shared';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PerfectScrollbarModule, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { TooltipModule } from '../../directives/tooltip/tooltip.directive';
import { NotificationService } from '../notificationBar/notification.service';
import { NotificationProperties } from '../notificationBar/notification.properties';
import { NotificationModule } from '../notificationBar/notification.module';
export var MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MultiSelect; }),
    multi: true
};
var MultiSelect = /** @class */ (function () {
    function MultiSelect(el, domHandler, renderer, objectUtils, cd, notificationService) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.objectUtils = objectUtils;
        this.cd = cd;
        this.notificationService = notificationService;
        this.scrollHeight = '200px';
        this._defaultLabel = 'Choose';
        this.maxSelectionWarning = "Max {0} can be selected";
        this.showMaxSelectionWarning = false;
        this.filter = true;
        this.overlayVisible = false;
        this.displaySelectedLabel = true;
        this.maxSelectedLabels = 3;
        this.selectedItemsLabel = '{0} items selected';
        this.showToggleAll = true;
        this.resetFilterOnHide = false;
        this.dropdownIcon = 'fa fa-fw fa-caret-down';
        this.onChange = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onPanelShow = new EventEmitter();
        this.onPanelHide = new EventEmitter();
        this.onScrollEnd = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.showMaxErrorMsg = false;
        this.maxErrorMsg = '';
    }
    Object.defineProperty(MultiSelect.prototype, "defaultLabel", {
        get: function () {
            return this._defaultLabel;
        },
        set: function (val) {
            this._defaultLabel = val;
            this.updateLabel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelect.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (val) {
            var opts = this.optionLabel ? this.objectUtils.generateSelectItems(val, this.optionLabel) : val;
            this._options = opts;
            this.updateLabel();
        },
        enumerable: true,
        configurable: true
    });
    MultiSelect.prototype.onScrollReachEndEvent = function (event) {
        if (event.target.className.indexOf("active-y") > 0) {
            this.onScrollEnd.emit(event);
        }
    };
    MultiSelect.prototype.ngOnInit = function () {
        if (this.returnKeyOnly && (this.dataKey == null || this.optionLabel == null)) {
            throw "returnKeyOnly requires valid dataKey and optionLabel";
        }
        this.updateLabel();
    };
    MultiSelect.prototype.ngAfterContentInit = function () {
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
    MultiSelect.prototype.ngAfterViewInit = function () {
        if (this.containerViewChild) {
            this.container = this.containerViewChild.nativeElement;
        }
        if (this.panelViewChild) {
            this.panel = this.panelViewChild.nativeElement;
        }
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                this.domHandler.appendChild(this.panel, this.appendTo);
        }
        if (this.overlayVisible) {
            this.show();
        }
    };
    MultiSelect.prototype.ngAfterViewChecked = function () {
        if (this.filtered) {
            if (this.appendTo)
                this.domHandler.absolutePosition(this.panel, this.container);
            else
                this.domHandler.relativePosition(this.panel, this.container);
            this.filtered = false;
        }
    };
    MultiSelect.prototype.writeValue = function (value) {
        this.value = value;
        this.updateLabel();
        this.cd.markForCheck();
    };
    MultiSelect.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    MultiSelect.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    MultiSelect.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    MultiSelect.prototype.showNotification = function (max, maxErrorMsg) {
        // console.log("called");
        var notification = new NotificationProperties();
        notification.type = "warning";
        notification.title = maxErrorMsg;
        this.notificationService.show(notification);
    };
    MultiSelect.prototype.onItemClick = function (event, value) {
        this.showMaxErrorMsg = false;
        var selectionIndex = this.findSelectionIndex(value);
        if (selectionIndex != -1)
            this.value = this.value.filter(function (val, i) { return i != selectionIndex; });
        else {
            if (this.max && this.value && this.value.length && !(this.value.length < this.max)) {
                this.showMaxErrorMsg = true;
                var pattern = /{(.*?)}/;
                var matched = this.maxSelectionWarning.match(pattern);
                this.maxErrorMsg = matched != null ? this.maxSelectionWarning.replace(matched[0], this.max + '') : this.maxSelectionWarning;
                if (this.showMaxSelectionWarning) {
                    this.showNotification(this.max, this.maxErrorMsg);
                }
                return;
            }
            else {
                if (this.returnKeyOnly) {
                    this.value = (this.value || []).concat([value[this.dataKey]]);
                }
                else
                    this.value = (this.value || []).concat([value]);
            }
        }
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
        this.updateLabel();
    };
    MultiSelect.prototype.isSelected = function (value) {
        return this.findSelectionIndex(value) != -1;
    };
    MultiSelect.prototype.findSelectionIndex = function (val) {
        var index = -1;
        if (this.value) {
            if (this.returnKeyOnly) {
                for (var i = 0; i < this.value.length; i++) {
                    if (this.objectUtils.equals(this.value[i], val[this.dataKey])) {
                        index = i;
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < this.value.length; i++) {
                    if (this.objectUtils.equals(this.value[i], val, this.dataKey)) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    };
    MultiSelect.prototype.toggleAll = function (event, checkbox) {
        if (checkbox.checked) {
            this.value = [];
        }
        else {
            var opts = this.getVisibleOptions();
            if (opts) {
                this.value = [];
                for (var i = 0; i < opts.length; i++) {
                    this.value.push(opts[i].value);
                }
            }
        }
        checkbox.checked = !checkbox.checked;
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
        this.updateLabel();
    };
    MultiSelect.prototype.isAllChecked = function () {
        if (this.filterValue && this.filterValue.trim().length)
            return this.value && this.visibleOptions && this.visibleOptions.length && (this.value.length == this.visibleOptions.length);
        else
            return this.value && this.options && (this.value.length == this.options.length);
    };
    MultiSelect.prototype.show = function () {
        var _this = this;
        this.overlayVisible = true;
        this.panel.style.zIndex = String(++DomHandler.zindex);
        this.bindDocumentClickListener();
        if (this.appendTo)
            this.domHandler.absolutePosition(this.panel, this.container);
        else
            this.domHandler.relativePosition(this.panel, this.container);
        this.domHandler.fadeIn(this.panel, 250);
        if (this.optionListViewChild != undefined) {
            setTimeout(function () { return (_this.optionListViewChild.nativeElement.children[0]).focus(); }, 0);
        }
        this.onPanelShow.emit();
    };
    MultiSelect.prototype.hide = function () {
        var _this = this;
        this.overlayVisible = false;
        this.unbindDocumentClickListener();
        if (this.resetFilterOnHide) {
            this.filterValue = null;
            this.filterInputChild.nativeElement.value = null;
        }
        this.onPanelHide.emit();
        if (this.showMaxErrorMsg) {
            setTimeout(function () { return _this.showMaxErrorMsg = false; }, 2000);
        }
    };
    MultiSelect.prototype.close = function (event) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    };
    MultiSelect.prototype.onMouseclick = function (input) {
        if (this.disabled || this.readonly) {
            return;
        }
        if (!this.panelClick) {
            if (this.overlayVisible) {
                this.hide();
            }
            else {
                input.focus();
                this.show();
            }
        }
        this.selfClick = true;
    };
    MultiSelect.prototype.onInputFocus = function (event) {
        this.focus = true;
        this.onFocus.emit({ originalEvent: event });
    };
    MultiSelect.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.onBlur.emit({ originalEvent: event });
        this.onModelTouched();
    };
    MultiSelect.prototype.onOptionKeydown = function (event, option) {
        if (this.readonly) {
            return;
        }
        var item = event.currentTarget;
        switch (event.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(item);
                if (nextItem) {
                    nextItem.focus();
                }
                event.preventDefault();
                break;
            //up
            case 38:
                var prevItem = this.findPrevItem(item);
                if (prevItem) {
                    prevItem.focus();
                }
                event.preventDefault();
                break;
            //tab
            case 9:
                if (!(option && this.options.indexOf(option) <= this.options.length - 2)) {
                    this.hide();
                }
                break;
            //enter
            case 13:
                this.onItemClick(event, option.value);
                event.preventDefault();
                break;
        }
    };
    MultiSelect.prototype.findNextItem = function (item) {
        var nextItem = item.nextElementSibling;
        if (nextItem)
            return this.domHandler.hasClass(nextItem, 'ui-state-disabled') || this.domHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    };
    MultiSelect.prototype.findPrevItem = function (item) {
        var prevItem = item.previousElementSibling;
        if (prevItem)
            return this.domHandler.hasClass(prevItem, 'ui-state-disabled') || this.domHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    };
    /* onKeydown(event) {
        console.log("on key press");
        console.log("on key press",event);
        if (this.readonly) {
            return;
        }
        
        switch(event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                }
                
                event.preventDefault();
            break;
            
            //escape and tab
            case 27:
            case 9:
                this.hide();
            break;
        }
    } */
    MultiSelect.prototype.onKeydown = function (event) {
        //debugger;
        if (this.readonly) {
            return;
        }
        console.log(this.overlayVisible);
        switch (event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                }
                break;
            //space
            case 32:
                if (!this.overlayVisible) {
                    this.show();
                    event.preventDefault();
                }
                break;
            //escape
            case 27:
                this.hide();
                break;
        }
    };
    MultiSelect.prototype.updateLabel = function () {
        if (this.value && this.options && this.value.length && this.displaySelectedLabel) {
            var label = '';
            for (var i = 0; i < this.value.length; i++) {
                var itemLabel = this.findLabelByValue(this.value[i]);
                if (itemLabel) {
                    if (label.length > 0) {
                        label = label + ', ';
                    }
                    label = label + itemLabel;
                }
            }
            this.valuesForTooltipAsString = label;
            if (this.value.length <= this.maxSelectedLabels) {
                this.valuesAsString = label;
            }
            else {
                var pattern = /{(.*?)}/, newSelectedItemsLabel = this.selectedItemsLabel.replace(this.selectedItemsLabel.match(pattern)[0], this.value.length + '');
                this.valuesAsString = newSelectedItemsLabel;
            }
        }
        else {
            this.valuesAsString = this.defaultLabel;
            this.valuesForTooltipAsString = this.defaultLabel;
        }
    };
    MultiSelect.prototype.findLabelByValue = function (val) {
        var _this = this;
        var label = null;
        if (this.returnKeyOnly) {
            var foundOption = this.options.find(function (option) { return option.value[_this.dataKey] == val; });
            label = foundOption ? foundOption.label : null;
        }
        else {
            for (var i = 0; i < this.options.length; i++) {
                var option = this.options[i];
                if (val == null && option.value == null || this.objectUtils.equals(val, option.value, this.dataKey)) {
                    label = option.label;
                    break;
                }
            }
        }
        return label;
    };
    MultiSelect.prototype.onFilter = function (event) {
        this.filterValue = event.target.value.trim().toLowerCase();
        this.visibleOptions = [];
        for (var i = 0; i < this.options.length; i++) {
            var option = this.options[i];
            if (option.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1) {
                this.visibleOptions.push(option);
            }
        }
        this.filtered = true;
    };
    MultiSelect.prototype.isItemVisible = function (option) {
        if (this.filterValue && this.filterValue.trim().length) {
            for (var i = 0; i < this.visibleOptions.length; i++) {
                if (this.visibleOptions[i].value == option.value) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    };
    MultiSelect.prototype.getVisibleOptions = function () {
        if (this.filterValue && this.filterValue.trim().length) {
            var items = [];
            for (var i = 0; i < this.options.length; i++) {
                var option = this.options[i];
                if (option.label.toLowerCase().includes(this.filterValue.toLowerCase())) {
                    items.push(option);
                }
            }
            return items;
        }
        else {
            return this.options;
        }
    };
    MultiSelect.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.selfClick && !_this.panelClick && _this.overlayVisible) {
                    _this.hide();
                }
                _this.selfClick = false;
                _this.panelClick = false;
                _this.cd.markForCheck();
            });
        }
    };
    MultiSelect.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    MultiSelect.prototype.onWindowResize = function () {
        this.hide();
    };
    MultiSelect.prototype.ngOnDestroy = function () {
        this.unbindDocumentClickListener();
        if (this.appendTo) {
            this.container.appendChild(this.panel);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "scrollHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], MultiSelect.prototype, "defaultLabel", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelect.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelect.prototype, "panelStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "panelStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "inputId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "readonlyMenuItems", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MultiSelect.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "maxSelectionWarning", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "showMaxSelectionWarning", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "filter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "overlayVisible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MultiSelect.prototype, "tabindex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelect.prototype, "appendTo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "dataKey", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "displaySelectedLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MultiSelect.prototype, "maxSelectedLabels", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "selectedItemsLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "showToggleAll", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "resetFilterOnHide", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "dropdownIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelect.prototype, "optionLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiSelect.prototype, "returnKeyOnly", void 0);
    __decorate([
        ViewChild('container'),
        __metadata("design:type", ElementRef)
    ], MultiSelect.prototype, "containerViewChild", void 0);
    __decorate([
        ViewChild('panel'),
        __metadata("design:type", ElementRef)
    ], MultiSelect.prototype, "panelViewChild", void 0);
    __decorate([
        ViewChild('optionList'),
        __metadata("design:type", ElementRef)
    ], MultiSelect.prototype, "optionListViewChild", void 0);
    __decorate([
        ViewChild('filterInput'),
        __metadata("design:type", ElementRef)
    ], MultiSelect.prototype, "filterInputChild", void 0);
    __decorate([
        ViewChild(PerfectScrollbarDirective),
        __metadata("design:type", PerfectScrollbarDirective)
    ], MultiSelect.prototype, "directiveScroll", void 0);
    __decorate([
        ContentChildren(PrimeTemplate),
        __metadata("design:type", QueryList)
    ], MultiSelect.prototype, "templates", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MultiSelect.prototype, "onChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MultiSelect.prototype, "onFocus", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MultiSelect.prototype, "onBlur", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MultiSelect.prototype, "onPanelShow", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MultiSelect.prototype, "onPanelHide", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MultiSelect.prototype, "onScrollEnd", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], MultiSelect.prototype, "options", null);
    MultiSelect = __decorate([
        Component({
            selector: 'ot-multi-select',
            template: "<div *ngIf=\"showMaxSelectionWarning\">\r\n        <ot-notification></ot-notification>\r\n    </div>\r\n    <ng-container *ngIf=\"!readonlyMenuItems; else readOnlyMenuItems\">\r\n        <div #container [ngClass]=\"{'ot-ut-noBg ot-ui-multiselect ot-ui-widget  ot-ui-state-default ot-ui-corner-all':true,'ot-ui-state-focus':focus, 'ot-ui-state-disabled': disabled, 'ot-max-selection-warning':showMaxErrorMsg}\"\r\n            [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"onMouseclick(in)\">\r\n            <!-- 'ot-ui-state-focus':focus, 'ot-ui-state-disabled': disabled-->\r\n    \r\n            <div class=\"ot-ui-helper-hidden-accessible\">\r\n                <input #in type=\"text\" readonly=\"readonly\" [attr.id]=\"inputId\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\"\r\n                    [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\" (keydown)=\"onKeydown($event)\">\r\n            </div>\r\n    \r\n            <div class=\"ot-ui-multiselect-label-container\" [tooltip]=\"valuesForTooltipAsString\">\r\n                <!-- [title]=\"valuesAsString\" \"-->\r\n                <label class=\"ot-ui-multiselect-label ot-ui-corner-all\">{{valuesAsString}}</label>\r\n            </div>\r\n    \r\n            <!-- ===============dropdown icon=======================================-->\r\n    \r\n            <div class=\" ot-ui-icon-div ot-ui-noBg ot-ui-noborder ot-ux-align-content-center  ot-ui-corner-right ot-ui-pull-right\">\r\n                <span class=\"ot-ui-clickable\">\r\n                    <i class=\"ot-ui-dropdown-icon\"></i>\r\n                </span>\r\n            </div>\r\n    \r\n            <!-- ===============dropdown icon ends  =======================================-->\r\n    \r\n            <div #panel [ngClass]=\"['ot-ui-multiselect-panel ot-ui-widget ot-ui-widget-content ot-ui-corner-all ot-ui-shadow', panelStyleClass||'']\"\r\n                [ngStyle]=\"panelStyle\" [style.display]=\"overlayVisible ? 'block' : 'none'\" (click)=\"panelClick=true\">\r\n                <!-- ================= for search field in dropdown============================ -->\r\n                <!-- <div class=\"ot-ui-widget-header ot-ui-corner-all ot-ui-multiselect-header ot-ui-helper-clearfix\" [ngClass]=\"{'ot-ui-multiselect-header-no-toggleall': !showToggleAll}\">\r\n                    <div class=\"ot-ui-chkbox ot-ui-widget\" *ngIf=\"showToggleAll\">\r\n                        <div class=\"ot-ui-helper-hidden-accessible\">\r\n                            <input #cb type=\"checkbox\" readonly=\"readonly\" [checked]=\"isAllChecked()\">\r\n                        </div>\r\n                        <div class=\"ot-ui-chkbox-box ot-ui-widget ot-ui-corner-all ot-ui-state-default\" [ngClass]=\"{'ot-ui-state-active':isAllChecked()}\" (click)=\"toggleAll($event,cb)\">\r\n                            <span class=\"ot-ui-chkbox-icon ot-ui-clickable\" [ngClass]=\"{'fa fa-check':isAllChecked()}\"></span>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"ot-ui-multiselect-filter-container\" *ngIf=\"filter\">\r\n                        <input #filterInput type=\"text\" role=\"textbox\" (input)=\"onFilter($event)\"\r\n                                    class=\"ot-ui-inputtext ot-ui-widget ot-ui-state-default ot-ui-corner-all\">\r\n                        <span class=\"fa fa-fw fa-search\"></span>\r\n                    </div>\r\n                    <a class=\"ot-ui-multiselect-close ot-ui-corner-all\" href=\"#\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\">\r\n                        <span class=\"fa fa-close\"></span>\r\n                    </a>\r\n                </div> -->\r\n                <!-- ================= end for search field in dropdown============================ -->\r\n                <div class=\"ot-ui-multiselect-items-wrapper\">\r\n                    <ul #optionList class=\"ot-ui-multiselect-items ot-ui-multiselect-list ot-ui-widget-content ot-ui-widget ot-ui-corner-all ot-ui-helper-reset\"\r\n                        (psYReachEnd)=\"onScrollReachEndEvent($event)\" [perfectScrollbar]=\"{suppressScrollX: true, minScrollbarLength:16}\"\r\n                        [style.max-height]=\"scrollHeight||'auto'\">\r\n                        <li *ngFor=\"let option of options; let index = i\" class=\"ot-ui-multiselect-item ot-ui-corner-all\" (click)=\"onItemClick($event,option.value)\"\r\n                            (keydown)=\"onOptionKeydown($event,option)\" [style.display]=\"isItemVisible(option) ? 'block' : 'none'\"\r\n                            [attr.tabindex]=\"option.disabled ? null : '0'\" [ngClass]=\"{'ot-ui-state-highlight':isSelected(option.value)}\">\r\n                            <div class=\"ot-ui-chkbox ot-ui-widget\">\r\n                                <div class=\"ot-ui-helper-hidden-accessible\">\r\n                                    <input type=\"checkbox\" tabindex=\"-1\" readonly=\"readonly\" [checked]=\"isSelected(option.value)\">\r\n                                </div>\r\n                                <div class=\"ot-ui-chkbox-box ot-ui-widget ot-ui-corner-all ot-ui-state-default\" [ngClass]=\"{'ot-ui-state-active':isSelected(option.value)}\">\r\n                                    <span class=\"ot-ui-chkbox-icon ot-ui-clickable\" [ngClass]=\"{'fa fa-check':isSelected(option.value)}\"></span>\r\n                                </div>\r\n                            </div>\r\n                            <label *ngIf=\"!itemTemplate\">{{option.label}}</label>\r\n                            <ng-template [pTemplateWrapper]=\"itemTemplate\" [item]=\"option\" [index]=\"i\" *ngIf=\"itemTemplate\"></ng-template>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n            <ng-container *ngIf=\"showMaxErrorMsg\">\r\n                <label class=\"ot-error\">{{maxErrorMsg}}</label>\r\n            </ng-container>\r\n    \r\n    \r\n            <!-- checking separate HTML file support i Angular 7 -->\r\n        </div>\r\n    </ng-container>\r\n    <ng-template #readOnlyMenuItems>\r\n        <div #container class=\"ot-col-sm-5 ot-ui-multiselect-read-only-menu\" [perfectScrollbar]=\"{suppressScrollX: true, minScrollbarLength:16}\">\r\n            <ul *ngIf=\"!dataKey\">\r\n                <li *ngFor=\"let item of value; let i= index;\">\r\n                    <span> {{value[i]}}\r\n    \r\n                    </span>\r\n                </li>\r\n            </ul>\r\n            <ul *ngIf=\"dataKey\">\r\n                    <li *ngFor=\"let item of value; let i= index;\">\r\n                        <span> {{value[i][optionLabel]}}\r\n        \r\n                        </span>\r\n                    </li>\r\n                </ul>\r\n        </div>\r\n    </ng-template>",
            //template: ``,
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
                    transition('void => visible', animate('225ms ease-out')),
                    transition('visible => void', animate('195ms ease-in'))
                ])
            ],
            host: {
                '[class.ot-ui-inputwrapper-filled]': 'filled',
                '[class.ot-ui-inputwrapper-focus]': 'focus'
            },
            providers: [DomHandler, ObjectUtils, MULTISELECT_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [ElementRef, DomHandler, Renderer2,
            ObjectUtils, ChangeDetectorRef, NotificationService])
    ], MultiSelect);
    return MultiSelect;
}());
export { MultiSelect };
var MultiSelectModule = /** @class */ (function () {
    function MultiSelectModule() {
    }
    MultiSelectModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule, PerfectScrollbarModule, TooltipModule, NotificationModule,],
            exports: [MultiSelect, SharedModule],
            declarations: [MultiSelect]
        })
    ], MultiSelectModule);
    return MultiSelectModule;
}());
export { MultiSelectModule };
//# sourceMappingURL=multi-select.js.map
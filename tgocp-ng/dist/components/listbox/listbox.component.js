var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgModule, Input, ContentChildren, QueryList, ChangeDetectorRef, Output, EventEmitter, forwardRef, ContentChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectUtils } from '../utils/objectutils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule, Header, Footer } from '../common/shared';
import { DomHandler } from '../dom/domhandler';
import { PSscrollUtils } from '../../shared/perfect-scrollbar-config';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
export var LISTBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ListboxComponent; }),
    multi: true
};
var ListboxComponent = /** @class */ (function () {
    function ListboxComponent(el, domHandler, objectUtils, cd) {
        this.el = el;
        this.domHandler = domHandler;
        this.objectUtils = objectUtils;
        this.cd = cd;
        this.checkbox = false;
        this.filter = false;
        this.filterMode = 'contains';
        //@Input() metaKeySelection: boolean = true; --to stop ctrl+selection
        this.metaKeySelection = false;
        this.showToggleAll = true;
        this.onChange = new EventEmitter();
        this.onDblClick = new EventEmitter();
        this.psConfig = PSscrollUtils.scrollBoth();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Object.defineProperty(ListboxComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (val) {
            //   let opts = this.optionLabel ? this.objectUtils.generateSelectItems(val, this.optionLabel) : val;
            this._options = val;
        },
        enumerable: true,
        configurable: true
    });
    ListboxComponent.prototype.ngAfterContentInit = function () {
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
    ListboxComponent.prototype.writeValue = function (value) {
        this.value = value;
        this.cd.markForCheck();
    };
    ListboxComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    ListboxComponent.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    ListboxComponent.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    ListboxComponent.prototype.onOptionClick = function (event, option) {
        if (this.disabled) {
            return;
        }
        if (!this.checkboxClick) {
            if (this.multiple)
                this.onOptionClickMultiple(event, option);
            else
                this.onOptionClickSingle(event, option);
        }
        else {
            this.checkboxClick = false;
        }
        this.optionTouched = false;
    };
    ListboxComponent.prototype.onOptionTouchEnd = function (event, option) {
        // console.log('touch',event, option)
        if (this.disabled) {
            return;
        }
        this.optionTouched = true;
    };
    ListboxComponent.prototype.onOptionClickSingle = function (event, option) {
        var selected = this.isSelected(option);
        var valueChanged = false;
        var metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.value = null;
                    valueChanged = true;
                }
            }
            else {
                // this.value = option.value;
                this.value = option;
                valueChanged = true;
            }
        }
        else {
            // this.value = selected ? null : option.value;
            this.value = selected ? null : option;
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    ListboxComponent.prototype.onOptionClickMultiple = function (event, option) {
        var selected = this.isSelected(option);
        var valueChanged = false;
        var metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.removeOption(option);
                }
                else {
                    // this.value = [option.value];
                    this.value = [option];
                }
                valueChanged = true;
            }
            else {
                this.value = (metaKey) ? this.value || [] : [];
                // this.value = [...this.value, option.value];
                this.value = this.value.concat([option]);
                valueChanged = true;
            }
        }
        else {
            if (selected) {
                this.removeOption(option);
            }
            else {
                //this.value = [...this.value||[],option.value];
                this.value = (this.value || []).concat([option]);
            }
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    ListboxComponent.prototype.removeOption = function (option) {
        var _this = this;
        this.value = this.value.filter(function (val) { return !_this.objectUtils.equals(val, option, _this.dataKey); });
    };
    ListboxComponent.prototype.isSelected = function (option) {
        var selected = false;
        if (this.multiple) {
            if (this.value) {
                for (var _i = 0, _a = this.value; _i < _a.length; _i++) {
                    var val = _a[_i];
                    if (this.objectUtils.equals(val, option, this.dataKey)) {
                        selected = true;
                        break;
                    }
                }
            }
        }
        else {
            // selected = this.objectUtils.equals(this.value, option.value, this.dataKey);
            selected = this.objectUtils.equals(this.value, option, this.dataKey);
        }
        return selected;
    };
    Object.defineProperty(ListboxComponent.prototype, "allChecked", {
        get: function () {
            if (this.filterValue)
                return this.allFilteredSelected();
            else
                return this.value && this.options && (this.value.length === this.options.length);
        },
        enumerable: true,
        configurable: true
    });
    ListboxComponent.prototype.allFilteredSelected = function () {
        var allSelected;
        if (this.value && this.options && this.options.length) {
            //   allSelected = true;
            for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                var opt = _a[_i];
                if (this.isItemVisible(opt)) {
                    //entered here
                    allSelected = true;
                    if (!this.isSelected(opt)) {
                        allSelected = false;
                        break;
                    }
                }
            }
        }
        return allSelected;
    };
    ListboxComponent.prototype.onFilter = function (event) {
        //  console.log(event)
        var query = event.target.value.trim().toLowerCase();
        this.filterValue = query.length ? query : null;
    };
    ListboxComponent.prototype.toggleAll = function (event, checkbox) {
        if (this.disabled || !this.options || this.options.length === 0) {
            return;
        }
        if (checkbox.checked) {
            this.value = [];
        }
        else {
            if (this.options) {
                this.value = [];
                for (var i = 0; i < this.options.length; i++) {
                    var opt = this.options[i];
                    if (this.isItemVisible(opt)) {
                        // this.value.push(opt.value);
                        this.value.push(opt);
                    }
                }
            }
        }
        checkbox.checked = !checkbox.checked;
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
    };
    ListboxComponent.prototype.isItemVisible = function (option) {
        if (this.filterValue) {
            var visible = void 0;
            switch (this.filterMode) {
                case 'startsWith':
                    visible = option[this.filterBy].toLowerCase().indexOf(this.filterValue.toLowerCase()) === 0;
                    break;
                case 'contains':
                    visible = option[this.filterBy].toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1;
                    break;
                default:
                    visible = true;
            }
            return visible;
        }
        else {
            return true;
        }
    };
    ListboxComponent.prototype.onDoubleClick = function (event, option) {
        if (this.disabled) {
            return;
        }
        this.onDblClick.emit({
            originalEvent: event,
            value: this.value
        });
    };
    ListboxComponent.prototype.onCheckboxClick = function (event, option) {
        //console.log(event,option);
        if (this.disabled) {
            return;
        }
        this.checkboxClick = true;
        var selected = this.isSelected(option);
        if (selected) {
            this.removeOption(option);
        }
        else {
            this.value = this.value ? this.value : [];
            //this.value = [...this.value,option.value];
            this.value = this.value.concat([option]);
        }
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    ListboxComponent.prototype.onInputFocus = function (event) {
        this.focus = true;
    };
    ListboxComponent.prototype.onInputBlur = function (event) {
        this.focus = false;
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ListboxComponent.prototype, "multiple", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListboxComponent.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ListboxComponent.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListboxComponent.prototype, "listStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ListboxComponent.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ListboxComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ListboxComponent.prototype, "checkbox", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ListboxComponent.prototype, "filter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ListboxComponent.prototype, "filterMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ListboxComponent.prototype, "metaKeySelection", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ListboxComponent.prototype, "dataKey", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ListboxComponent.prototype, "showToggleAll", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ListboxComponent.prototype, "optionLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ListboxComponent.prototype, "filterBy", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ListboxComponent.prototype, "onChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ListboxComponent.prototype, "onDblClick", void 0);
    __decorate([
        ContentChild(Header),
        __metadata("design:type", Object)
    ], ListboxComponent.prototype, "headerFacet", void 0);
    __decorate([
        ContentChild(Footer),
        __metadata("design:type", Object)
    ], ListboxComponent.prototype, "footerFacet", void 0);
    __decorate([
        ContentChildren(PrimeTemplate),
        __metadata("design:type", QueryList)
    ], ListboxComponent.prototype, "templates", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], ListboxComponent.prototype, "options", null);
    ListboxComponent = __decorate([
        Component({
            selector: 'ot-listbox',
            template: "<div [ngClass]=\"{'ot-ui-listbox ot-ui-inputtext ot-ui-widget ot-ui-widget-content ot-ui-corner-all':true,'ot-ui-state-disabled':disabled,'ot-ui-state-focus':focus}\" [ngStyle]=\"style\" [class]=\"styleClass\">\r\n    <div class=\"ot-ui-helper-hidden-accessible\">\r\n        <input type=\"text\" readonly=\"readonly\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\">\r\n    </div>\r\n    <div class=\"ot-ui-widget-header ot-ui-corner-all ot-ui-listbox-header ot-ui-helper-clearfix\" *ngIf=\"headerFacet\">\r\n        <ng-content select=\"p-header\"></ng-content>\r\n    </div>\r\n    <div class=\"ot-ui-widget-header ot-ui-corner-all ot-ui-listbox-header ot-ui-helper-clearfix\" *ngIf=\"(checkbox && multiple) || filter\" [ngClass]=\"{'ot-ui-listbox-header-w-checkbox': checkbox}\">\r\n        <div class=\"ot-ui-chkbox ot-ui-widget\" *ngIf=\"checkbox && multiple && showToggleAll\">\r\n            <div class=\"ot-ui-helper-hidden-accessible\">\r\n                <input #cb type=\"checkbox\" readonly=\"readonly\" [checked]=\"allChecked\">\r\n            </div>\r\n            <div class=\"ot-ui-chkbox-box ot-ui-widget ot-ui-corner-all ot-ui-state-default\" [ngClass]=\"{'ot-ui-state-active':allChecked}\" (click)=\"toggleAll($event,cb)\">\r\n                <span class=\"ot-ui-chkbox-icon ot-ui-clickable\"></span>\r\n            </div>\r\n        </div>\r\n        <div class=\"ot-ui-listbox-filter-container\" *ngIf=\"filter\">\r\n            <input type=\"text\" role=\"textbox\" (input)=\"onFilter($event)\" class=\"ot-ui-widget ot-ui-state-default ot-ui-corner-all\" [disabled]=\"disabled\">\r\n    \r\n        </div>\r\n    </div>\r\n          <div class=\"ot-ui-listbox-list-wrapper\"   [perfectScrollbar]=\"psConfig\">\r\n        <ul class=\"ot-ui-listbox-list\" [ngStyle]=\"listStyle\">\r\n            <li *ngFor=\"let option of options; let i = index;\" [style.display]=\"isItemVisible(option) ? 'block' : 'none'\" [ngClass]=\"{'ot-ui-listbox-item ot-ui-corner-all':true,'ot-ui-state-highlight':isSelected(option)}\" (click)=\"onOptionClick($event,option)\" (dblclick)=\"onDoubleClick($event,option)\"\r\n                (touchend)=\"onOptionTouchEnd($event,option)\">\r\n                <div class=\"ot-ui-chkbox ot-ui-widget\" *ngIf=\"checkbox && multiple\" (click)=\"onCheckboxClick($event,option)\">\r\n                    <div class=\"ot-ui-helper-hidden-accessible\">\r\n                        <input type=\"checkbox\" [checked]=\"isSelected(option)\" [disabled]=\"disabled\">\r\n                    </div>\r\n                    <div class=\"ot-ui-chkbox-box ot-ui-widget ot-ui-corner-all ot-ui-state-default\" [ngClass]=\"{'ot-ui-state-active':isSelected(option)}\">\r\n                        <span class=\"ot-ui-chkbox-icon ot-ui-clickable\"></span>\r\n                    </div>\r\n                </div>\r\n                <span *ngIf=\"!itemTemplate\">{{option[optionLabel]}}</span>\r\n                <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: i}\"></ng-container>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <div class=\"ot-ui-listbox-footer ot-ui-widget-header ot-ui-corner-all\" *ngIf=\"footerFacet\">\r\n        <ng-content select=\"p-footer\"></ng-content>\r\n    </div>\r\n    </div>",
            providers: [DomHandler, ObjectUtils, LISTBOX_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [ElementRef, DomHandler, ObjectUtils, ChangeDetectorRef])
    ], ListboxComponent);
    return ListboxComponent;
}());
export { ListboxComponent };
var ListboxModule = /** @class */ (function () {
    function ListboxModule() {
    }
    ListboxModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule, PerfectScrollbarModule],
            declarations: [ListboxComponent],
            exports: [ListboxComponent, SharedModule]
        })
    ], ListboxModule);
    return ListboxModule;
}());
export { ListboxModule };
//# sourceMappingURL=listbox.component.js.map
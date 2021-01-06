var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgModule, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { trigger, transition, state, style, animate, group } from "@angular/animations";
import { CommonModule } from '@angular/common';
var SearchComponent = /** @class */ (function () {
    function SearchComponent() {
        this.onSearch = new EventEmitter();
        this.isEnabled = new EventEmitter();
        this.placeholder = 'Search';
        this.disableOnBlur = true;
        this.docClickHandlerRef = this.documentClickHandler.bind(this);
        this.showClearIcon = 'hidden';
        this.searchEnabled = false;
    }
    SearchComponent.prototype.divClickHandler = function (event) {
        event.stopPropagation();
    };
    SearchComponent.prototype.documentClickHandler = function (event) {
        this.disableSearch();
    };
    SearchComponent.prototype.showOrHideClearIcon = function () {
        this.showClearIcon = this.searchInput.nativeElement.value ? 'visible' : 'hidden';
    };
    SearchComponent.prototype.searchEnabledAnimation = function () {
        return this.searchEnabled ? 'in' : 'out';
    };
    SearchComponent.prototype.onClear = function () {
        this.searchInput.nativeElement.value = '';
        this.showOrHideClearIcon();
        this.searchInput.nativeElement.focus();
    };
    SearchComponent.prototype.enableSearch = function () {
        var _this = this;
        this.searchEnabled = true;
        this.container.nativeElement.addEventListener('click', this.divClickHandler);
        document.addEventListener('click', this.docClickHandlerRef);
        setTimeout(function () {
            _this.searchInput.nativeElement.focus();
        }, 2);
        this.isEnabled.emit(this.searchEnabled);
    };
    SearchComponent.prototype.disableSearch = function () {
        this.searchEnabled = false;
        this.container.nativeElement.removeEventListener('click', this.divClickHandler);
        document.removeEventListener('click', this.docClickHandlerRef);
        this.searchInput.nativeElement.value = '';
        this.showOrHideClearIcon();
        this.isEnabled.emit(this.searchEnabled);
    };
    SearchComponent.prototype.onEnterFn = function () {
        if (this.searchInput.nativeElement.value)
            this.onSearchFn();
    };
    SearchComponent.prototype.onSearchFn = function () {
        if (!this.searchEnabled) {
            this.enableSearch();
        }
        else if (!this.searchInput.nativeElement.value) {
            this.disableSearch();
        }
        else {
            this.searchInput.nativeElement.focus();
            this.onSearch.emit('this.searchInput.nativeElement.value');
        }
    };
    __decorate([
        ViewChild('searchInput'),
        __metadata("design:type", ElementRef)
    ], SearchComponent.prototype, "searchInput", void 0);
    __decorate([
        ViewChild('container'),
        __metadata("design:type", ElementRef)
    ], SearchComponent.prototype, "container", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SearchComponent.prototype, "onSearch", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SearchComponent.prototype, "isEnabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SearchComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SearchComponent.prototype, "disableOnBlur", void 0);
    SearchComponent = __decorate([
        Component({
            selector: 'ot-search',
            template: "\n    <div #container class=\"ot-absolute-center ot-search-component\"  style=\"justify-content: flex-end;\">\n        <div class=\"ot-search-input-container\"><input #searchInput (input)=\"showOrHideClearIcon()\" (keyup.enter)=\"onEnterFn()\" [placeholder]=\"placeholder\"  type=\"text\" [@inputState]=\"searchEnabled ? 'in' : 'out'\" class=\"ot-search-input\"> </div>\n        <i class=\"ot-icon-md ot-icon-clear\" [style.visibility]=\"showClearIcon\" (click)=\"onClear()\"></i>\n        <div class=\"ot-searchBtn-container\">\n          <button *ngIf = \"!searchEnabled\"  (click)=\"onSearchFn()\"  #searchBtn class=\"ot-icon-search-btn ot-icon-md ot-icon-search\"> </button>\n        </div>\n    </div>",
            animations: [trigger('inputState', [
                    state('in', style({
                        width: '100%', padding: '0 .5em', border: '1px solid #666666'
                    })),
                    state('out', style({
                        width: '0', padding: 0, border: 0
                    })),
                    transition('in => out', [group([
                            animate('400ms ease-in-out', style({
                                width: '0px'
                            })),
                            animate('600ms ease-in-out', style({
                                padding: 0, border: 0
                            })),
                        ])]),
                    transition('out => in', [group([
                            // animate('0s ease-in-out', style({
                            //   'visibility': 'visible'
                            // })), 
                            animate('400ms ease-in-out', style({
                                width: 'calc(100% - 1px)' //Angular 4 animations can not handle % and hence converting it into px by hack
                            })),
                            animate('200ms ease-in-out', style({
                                padding: 'inherit',
                                border: 'inherit'
                            }))
                        ])])
                ])]
        })
    ], SearchComponent);
    return SearchComponent;
}());
export { SearchComponent };
var SearchModule = /** @class */ (function () {
    function SearchModule() {
    }
    SearchModule = __decorate([
        NgModule({
            exports: [SearchComponent],
            declarations: [SearchComponent],
            imports: [CommonModule]
        })
    ], SearchModule);
    return SearchModule;
}());
export { SearchModule };
//# sourceMappingURL=search.component.js.map
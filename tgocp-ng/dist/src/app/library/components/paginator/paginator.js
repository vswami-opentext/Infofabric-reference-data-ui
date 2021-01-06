var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from '../dropdown/dropdown';
import paginatorLocalelabels from './paginator_labels.json';
var Paginator = /** @class */ (function () {
    function Paginator(ref, _elRef) {
        this.ref = ref;
        this._elRef = _elRef;
        this.availableWidth = 0;
        this.onPageChange = new EventEmitter();
        this.alwaysShow = true;
        this._totalRecords = 0;
        this._first = 0;
        this._rows = 0;
        this.start = 0;
        this.end = 0;
        this.activePage = 1;
        this._locale = {
            about: "About",
            items: "Items"
        };
        this._language = "en";
    }
    Paginator.prototype.ngAfterViewInit = function () {
        if (this.paginatorConatainer && this.paginatorControl) {
            this.availableWidth = this.paginatorConatainer.nativeElement.offsetWidth - this.paginatorControl.nativeElement.offsetWidth;
            this.pageLinkSize = Math.floor(((this.availableWidth / 16) - 12) / 4);
            this.start = 1;
            this.end = Math.min(this.getPageCount(), this.start + (this.pageLinkSize - 1));
            this.updatePageLinks();
            this.ref.detectChanges();
        }
    };
    Paginator.prototype.ngDoCheck = function () {
        if (this.paginatorConatainer) {
            this.onResize(Event);
        }
    };
    Paginator.prototype.ngOnInit = function () {
    };
    Paginator.prototype.onResize = function (event) {
        if (this.paginatorConatainer && this.paginatorControl) {
            this.availableWidth = this.paginatorConatainer.nativeElement.offsetWidth - this.paginatorControl.nativeElement.offsetWidth;
            this.pageLinkSize = Math.floor(((this.availableWidth / 16) - 12) / 4);
            this.end = Math.min(this.getPageCount(), this.start + (this.pageLinkSize - 1));
            this.updatePageLinks();
        }
    };
    Object.defineProperty(Paginator.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            if (this.paginatorConatainer) {
                this.onResize(Event);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paginator.prototype, "first", {
        get: function () {
            return this._first;
        },
        set: function (val) {
            this._first = val;
            // this.updatePageLinks();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paginator.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (val) {
            this._rows = val;
            //  this.updatePageLinks();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paginator.prototype, "rowsPerPageOptions", {
        get: function () {
            return this._rowsPerPageOptions;
        },
        set: function (val) {
            this._rowsPerPageOptions = val;
            if (this._rowsPerPageOptions) {
                this.rowsPerPageItems = [];
                for (var _i = 0, _a = this._rowsPerPageOptions; _i < _a.length; _i++) {
                    var opt = _a[_i];
                    this.rowsPerPageItems.push({ label: String(opt), value: opt });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paginator.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        set: function (newLocale) {
            if (newLocale) {
                this._language = newLocale;
                this._locale = paginatorLocalelabels[newLocale] ? paginatorLocalelabels[newLocale] : this._locale;
            }
        },
        enumerable: true,
        configurable: true
    });
    Paginator.prototype.isFirstPage = function () {
        return this.start === 1;
    };
    Paginator.prototype.isLastPage = function () {
        return this.end === this.getPageCount();
    };
    Paginator.prototype.getPageCount = function () {
        return Math.ceil(this.totalRecords / this.rows) || 1;
    };
    Paginator.prototype.calculatePageLinkBoundaries = function () {
        var numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
        //calculate range, keep current in middle if necessary
        var start = Math.max(0, Math.ceil(numberOfPages - this.end)), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);
        return [start, end];
    };
    Paginator.prototype.updatePageLinks = function () {
        this.pageLinks = [];
        if (!this.start) {
            this.start = 1;
            this.end = this.start + (this.pageLinkSize - 1);
        }
        for (var i = this.start; i <= this.end; i++) {
            this.pageLinks.push(i);
        }
    };
    Paginator.prototype.changePage = function (p) {
        var pc = this.getPageCount();
        if (p >= 0 && p < pc) {
            this.first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            // this.updatePageLinks();
            this.onPageChange.emit(state);
        }
    };
    Paginator.prototype.getPage = function () {
        return Math.floor(this.first / this.rows);
    };
    Paginator.prototype.changePageToFirst = function (event) {
        //   if(!this.isFirstPage()){
        //       this.changePage(0);
        //   }
        this.start = 1;
        this.end = Math.min(this.getPageCount(), this.start + (this.pageLinkSize - 1));
        //  this.changePage(this.start - 1);
        //  event.preventDefault();
        this.updatePageLinks();
        if (event) {
            event.preventDefault();
        }
    };
    Paginator.prototype.changePageToPrev = function (event) {
        this.start = Math.max(1, this.start - this.pageLinkSize - 1);
        this.end = Math.min(this.getPageCount(), this.start + (this.pageLinkSize - 1));
        //  this.changePage(this.start - 1);
        //  event.preventDefault();
        this.updatePageLinks();
        event.preventDefault();
    };
    Paginator.prototype.changePageToNext = function (event) {
        this.start = (this.end == (this.getPageCount())) ? this.start : (this.start + this.pageLinkSize);
        this.end = Math.min(this.getPageCount(), this.start + (this.pageLinkSize - 1));
        /*  this.changePage(this.end  + 1);
         event.preventDefault(); */
        this.updatePageLinks();
        event.preventDefault();
    };
    Paginator.prototype.changePageToLast = function (event) {
        if (!this.isLastPage()) {
            this.changePage(this.getPageCount() - 1);
            this.updatePageLinks();
        }
        event.preventDefault();
    };
    Paginator.prototype.onPageLinkClick = function (event, page) {
        this.activePage = page + 1;
        this.changePage(page);
        event.preventDefault();
    };
    Paginator.prototype.onRppChange = function (event) {
        this.start = 1;
        this.end = Math.min(this.getPageCount(), this.start + (this.pageLinkSize - 1));
        this.changePage(0);
        this.activePage = 1;
        this.updatePageLinks();
    };
    __decorate([
        ViewChild('paginatorConatainer'),
        __metadata("design:type", ElementRef)
    ], Paginator.prototype, "paginatorConatainer", void 0);
    __decorate([
        ViewChild('paginatorControl'),
        __metadata("design:type", ElementRef)
    ], Paginator.prototype, "paginatorControl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Paginator.prototype, "pageLinkSize", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Paginator.prototype, "onPageChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Paginator.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Paginator.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Paginator.prototype, "alwaysShow", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], Paginator.prototype, "totalRecords", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], Paginator.prototype, "first", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], Paginator.prototype, "rows", null);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], Paginator.prototype, "rowsPerPageOptions", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], Paginator.prototype, "locale", null);
    Paginator = __decorate([
        Component({
            selector: 'ot-paginator',
            template: "<div #paginatorConatainer *ngIf=\"alwaysShow ? true : (pageLinks && pageLinks.length > 1)\"\r\n    (window:resize)=\"(pageLinks && pageLinks.length > 1)?onResize($event):''\" (change)=\"onResize($event)\"\r\n    class=\"ot-ui-paginator-body\">\r\n    <div #paginatorControl class=\"ot-ui-paginator-control  ot-ui-paginator-element ot-ui-pull-left\">\r\n\r\n        <div class=\"ot-ui-pull-left\">\r\n            {{_locale.about}} {{_totalRecords}} {{_locale.items}}\r\n        </div>\r\n        <div class=\"ot-ui-pull-right ot-ui-paginator-element ot-ui-paginator-rows\">\r\n            <ot-dropdown [fixTop]=\"true\" [options]=\"rowsPerPageItems\" [(ngModel)]=\"rows\" *ngIf=\"rowsPerPageOptions\" [locale]=\"_language\"\r\n                (onChange)=\"onRppChange($event)\" [lazy]=\"false\" [autoWidth]=\"false\"></ot-dropdown>\r\n        </div>\r\n    </div>\r\n    <div class=\"ot-ui-paginator-navigation\">\r\n\r\n        <a *ngIf=\"!isFirstPage()\" href=\"#\" class=\"ot-ui-paginator-prev ot-ui-pull-left\"\r\n            (click)=\"changePageToPrev($event)\">\r\n            <span> <i class=\"ot-ui-naviagtor-icon ot-ui-naviagtor-icon-left\"></i></span>\r\n        </a>\r\n        <a href=\"#\" *ngFor=\"let pageLink of pageLinks\" class=\"ot-ui-pull-left\"\r\n            [ngClass]=\"activePage==pageLink?'ot-ui-paginator-pageNo-active':'ot-ui-paginator-pageNo'\"\r\n            (click)=\"onPageLinkClick($event, pageLink - 1)\"><span\r\n                [ngClass]=\"activePage==pageLink?'ot-ui-page-links-active':'ot-ui-page-links'\">{{pageLink}}</span>\r\n        </a>\r\n        <a *ngIf=\"!isLastPage()\" href=\"#\" class=\"ot-ui-paginator-prev ot-ui-pull-left\"\r\n            (click)=\"changePageToNext($event)\">\r\n            <span> <i class=\"ot-ui-naviagtor-icon ot-ui-naviagtor-icon-right\"></i></span>\r\n        </a>\r\n    </div>\r\n</div>"
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef, ElementRef])
    ], Paginator);
    return Paginator;
}());
export { Paginator };
var OtPaginatorModule = /** @class */ (function () {
    function OtPaginatorModule() {
    }
    OtPaginatorModule = __decorate([
        NgModule({
            imports: [CommonModule, DropdownModule, FormsModule],
            exports: [Paginator, DropdownModule, FormsModule],
            declarations: [Paginator]
        })
    ], OtPaginatorModule);
    return OtPaginatorModule;
}());
export { OtPaginatorModule };
//# sourceMappingURL=paginator.js.map
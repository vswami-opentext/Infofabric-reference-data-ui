var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MiniDropdownModule } from '../mini-dropdown/mini-dropdown';
import { SharedModule } from '../common/shared';
var MiniPaginator = /** @class */ (function () {
    function MiniPaginator() {
        this.pageLinkSize = 5;
        this.onPageChange = new EventEmitter();
        this.alwaysShow = true;
        this._totalRecords = 0;
        this._first = 0;
        this._rows = 0;
    }
    Object.defineProperty(MiniPaginator.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            this.updatePageLinks();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MiniPaginator.prototype, "first", {
        get: function () {
            return this._first;
        },
        set: function (val) {
            this._first = val;
            this.updatePageLinks();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MiniPaginator.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (val) {
            this._rows = val;
            this.updatePageLinks();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MiniPaginator.prototype, "rowsPerPageOptions", {
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
    MiniPaginator.prototype.isFirstPage = function () {
        return this.getPage() === 0;
    };
    MiniPaginator.prototype.isLastPage = function () {
        return this.getPage() === this.getPageCount() - 1;
    };
    MiniPaginator.prototype.getPageCount = function () {
        return Math.ceil(this.totalRecords / this.rows) || 1;
    };
    MiniPaginator.prototype.calculatePageLinkBoundaries = function () {
        var numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
        //calculate range, keep current in middle if necessary
        var start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);
        return [start, end];
    };
    MiniPaginator.prototype.updatePageLinks = function () {
        this.pageLinks = [];
        var boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
        for (var i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
    };
    MiniPaginator.prototype.changePage = function (p) {
        var pc = this.getPageCount();
        if (p >= 0 && p < pc) {
            this.first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();
            this.onPageChange.emit(state);
        }
    };
    MiniPaginator.prototype.getPage = function () {
        return Math.floor(this.first / this.rows);
    };
    MiniPaginator.prototype.changePageToFirst = function (event) {
        if (!this.isFirstPage()) {
            this.changePage(0);
        }
        event.preventDefault();
    };
    MiniPaginator.prototype.changePageToPrev = function (event) {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    };
    MiniPaginator.prototype.changePageToNext = function (event) {
        this.changePage(this.getPage() + 1);
        event.preventDefault();
    };
    MiniPaginator.prototype.changePageToLast = function (event) {
        if (!this.isLastPage()) {
            this.changePage(this.getPageCount() - 1);
        }
        event.preventDefault();
    };
    MiniPaginator.prototype.onPageLinkClick = function (event, page) {
        this.changePage(page);
        event.preventDefault();
    };
    MiniPaginator.prototype.onRppChange = function (event) {
        this.changePage(this.getPage());
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MiniPaginator.prototype, "pageLinkSize", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MiniPaginator.prototype, "onPageChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MiniPaginator.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MiniPaginator.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MiniPaginator.prototype, "alwaysShow", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], MiniPaginator.prototype, "templateLeft", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], MiniPaginator.prototype, "templateRight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], MiniPaginator.prototype, "totalRecords", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], MiniPaginator.prototype, "first", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], MiniPaginator.prototype, "rows", null);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], MiniPaginator.prototype, "rowsPerPageOptions", null);
    MiniPaginator = __decorate([
        Component({
            selector: 'ot-mini-paginator',
            template: "<div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'ot-ui-mini-paginator ot-ui-widget ot-ui-widget-header ot-ui-unselectable-text ot-ui-helper-clearfix'\" *ngIf=\"alwaysShow ? true : (pageLinks && pageLinks.length > 1)\">\r\n    <div class=\"ot-ui-mini-paginator-left-content\" *ngIf=\"templateLeft\">\r\n        <ot-templateLoader [template]=\"templateLeft\"></ot-templateLoader>\r\n    </div>\r\n    <a href=\"#\" class=\"ot-ui-mini-paginator-first ot-ui-mini-paginator-element ot-ui-state-default ot-ui-corner-all\" (click)=\"changePageToFirst($event)\" [ngClass]=\"{'ot-ui-state-disabled':isFirstPage()}\" [tabindex]=\"isFirstPage() ? -1 : null\">\r\n        <span class=\"ot-fa ot-fa-step-backward\"></span>\r\n    </a>\r\n    <a href=\"#\" class=\"ot-ui-mini-paginator-prev ot-ui-mini-paginator-element ot-ui-state-default ot-ui-corner-all\" (click)=\"changePageToPrev($event)\" [ngClass]=\"{'ot-ui-state-disabled':isFirstPage()}\" [tabindex]=\"isFirstPage() ? -1 : null\">\r\n        <span class=\"ot-fa ot-fa-backward\"></span>\r\n    </a>\r\n    <span class=\"ot-ui-mini-paginator-pages\">\r\n    <a href=\"#\" *ngFor=\"let pageLink of pageLinks\" class=\"ot-ui-mini-paginator-page ot-ui-mini-paginator-element ot-ui-state-default ot-ui-corner-all\"\r\n        (click)=\"onPageLinkClick($event, pageLink - 1)\" [ngClass]=\"{'ot-ui-state-active': (pageLink-1 == getPage())}\">{{pageLink}}</a>\r\n</span>\r\n    <a href=\"#\" class=\"ot-ui-mini-paginator-next ot-ui-mini-paginator-element ot-ui-state-default ot-ui-corner-all\" (click)=\"changePageToNext($event)\" [ngClass]=\"{'ot-ui-state-disabled':isLastPage()}\" [tabindex]=\"isLastPage() ? -1 : null\">\r\n        <span class=\"ot-fa ot-fa-forward\"></span>\r\n    </a>\r\n    <a href=\"#\" class=\"ot-ui-mini-paginator-last ot-ui-mini-paginator-element ot-ui-state-default ot-ui-corner-all\" (click)=\"changePageToLast($event)\" [ngClass]=\"{'ot-ui-state-disabled':isLastPage()}\" [tabindex]=\"isLastPage() ? -1 : null\">\r\n        <span class=\"ot-fa ot-fa-step-forward\"></span>\r\n    </a>\r\n    <ot-mini-dropdown [options]=\"rowsPerPageItems\" [(ngModel)]=\"rows\" *ngIf=\"rowsPerPageOptions\" (onChange)=\"onRppChange($event)\" [lazy]=\"false\" [autoWidth]=\"false\"></ot-mini-dropdown>\r\n    <div class=\"ot-ui-mini-paginator-right-content\" *ngIf=\"templateRight\">\r\n        <ot-templateLoader [template]=\"templateRight\"></ot-templateLoader>\r\n    </div>\r\n</div>"
        })
    ], MiniPaginator);
    return MiniPaginator;
}());
export { MiniPaginator };
var MiniPaginatorModule = /** @class */ (function () {
    function MiniPaginatorModule() {
    }
    MiniPaginatorModule = __decorate([
        NgModule({
            imports: [CommonModule, MiniDropdownModule, FormsModule, SharedModule],
            exports: [MiniPaginator, MiniDropdownModule, FormsModule, SharedModule],
            declarations: [MiniPaginator]
        })
    ], MiniPaginatorModule);
    return MiniPaginatorModule;
}());
export { MiniPaginatorModule };
//# sourceMappingURL=paginator.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, ContentChild, ContentChildren, QueryList, IterableDiffers } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Header, Footer, PrimeTemplate } from '../common/shared';
import { OtPaginatorModule } from '../paginator/paginator';
var OtDataList = /** @class */ (function () {
    function OtDataList(el, differs) {
        this.el = el;
        this.differs = differs;
        this.pageLinks = 5;
        this.onLazyLoad = new EventEmitter();
        this.paginatorPosition = 'bottom';
        this.emptyMessage = 'No records';
        this.alwaysShowPaginator = true;
        this.trackBy = function (index, item) { return item; };
        this.immutable = true;
        this.onPage = new EventEmitter();
        this.first = 0;
        this.page = 0;
        this.differ = differs.find([]).create(null);
    }
    OtDataList.prototype.ngAfterContentInit = function () {
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
    OtDataList.prototype.ngAfterViewInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
        }
    };
    Object.defineProperty(OtDataList.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            if (this.immutable) {
                this.handleDataChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    OtDataList.prototype.handleDataChange = function () {
        if (this.paginator) {
            this.updatePaginator();
        }
        this.updateDataToRender(this.value);
    };
    OtDataList.prototype.ngDoCheck = function () {
        if (!this.immutable) {
            var changes = this.differ.diff(this.value);
            if (changes) {
                this.handleDataChange();
            }
        }
    };
    OtDataList.prototype.updatePaginator = function () {
        //total records
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
        //first
        if (this.totalRecords && this.first >= this.totalRecords) {
            var numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this.first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    };
    OtDataList.prototype.paginate = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.updateDataToRender(this.value);
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    };
    OtDataList.prototype.updateDataToRender = function (datasource) {
        if (this.paginator && datasource) {
            this.dataToRender = [];
            var startIndex = this.lazy ? 0 : this.first;
            for (var i = startIndex; i < (startIndex + this.rows); i++) {
                if (i >= datasource.length) {
                    break;
                }
                this.dataToRender.push(datasource[i]);
            }
        }
        else {
            this.dataToRender = datasource;
        }
    };
    OtDataList.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    OtDataList.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    OtDataList.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], OtDataList.prototype, "paginator", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], OtDataList.prototype, "rows", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], OtDataList.prototype, "totalRecords", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], OtDataList.prototype, "pageLinks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], OtDataList.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], OtDataList.prototype, "lazy", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], OtDataList.prototype, "onLazyLoad", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], OtDataList.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], OtDataList.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], OtDataList.prototype, "paginatorPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], OtDataList.prototype, "emptyMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], OtDataList.prototype, "alwaysShowPaginator", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], OtDataList.prototype, "trackBy", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], OtDataList.prototype, "immutable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], OtDataList.prototype, "scrollable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], OtDataList.prototype, "scrollHeight", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], OtDataList.prototype, "onPage", void 0);
    __decorate([
        ContentChild(Header),
        __metadata("design:type", Object)
    ], OtDataList.prototype, "header", void 0);
    __decorate([
        ContentChild(Footer),
        __metadata("design:type", Object)
    ], OtDataList.prototype, "footer", void 0);
    __decorate([
        ContentChildren(PrimeTemplate),
        __metadata("design:type", QueryList)
    ], OtDataList.prototype, "templates", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], OtDataList.prototype, "value", null);
    OtDataList = __decorate([
        Component({
            selector: 'ot-dataList',
            template: "<div [ngClass]=\"{'ot-ui-datalist ot-ui-widget': true, 'ot-ui-datalist-scrollable': scrollable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\r\n    <div class=\"ot-ui-datalist-header ot-ui-widget-header ot-ui-corner-top\" *ngIf=\"header\">\r\n        <ng-content select=\"p-header\"></ng-content>\r\n    </div>\r\n    <ot-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\" (onPageChange)=\"paginate($event)\" styleClass=\"ot-ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator  && paginatorPosition!='bottom' || paginatorPosition =='both'\"></ot-paginator>\r\n    <div class=\"ot-ui-datalist-content ot-ui-widget-content\" [ngStyle]=\"{'max-height': scrollHeight}\">\r\n        <div *ngIf=\"isEmpty()\" class=\"ot-ui-datalist-emptymessage\">{{emptyMessage}}</div>\r\n        <ul class=\"ot-ui-datalist-data\">\r\n            <li *ngFor=\"let item of dataToRender;let i = index;trackBy: trackBy\">\r\n                <ng-template [pTemplateWrapper]=\"itemTemplate\" [item]=\"item\" [index]=\"i + first\"></ng-template>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <ot-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\" (onPageChange)=\"paginate($event)\" styleClass=\"ot-ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator  && paginatorPosition!='top' || paginatorPosition =='both'\"></ot-paginator>\r\n    <div class=\"ot-ui-datalist-footer ot-ui-widget-header ot-ui-corner-bottom\" *ngIf=\"footer\">\r\n        <ng-content select=\"p-footer\"></ng-content>\r\n    </div>\r\n</div>"
        }),
        __metadata("design:paramtypes", [ElementRef, IterableDiffers])
    ], OtDataList);
    return OtDataList;
}());
export { OtDataList };
var OtDataListModule = /** @class */ (function () {
    function OtDataListModule() {
    }
    OtDataListModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule, OtPaginatorModule],
            exports: [OtDataList, SharedModule],
            declarations: [OtDataList]
        })
    ], OtDataListModule);
    return OtDataListModule;
}());
export { OtDataListModule };
//# sourceMappingURL=datalist.js.map
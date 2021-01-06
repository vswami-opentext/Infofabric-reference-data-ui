var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Component, ElementRef, Input, ViewContainerRef, ViewChild, IterableDiffers, Output, EventEmitter, ContentChild, ContentChildren, Renderer2, QueryList, TemplateRef, ChangeDetectorRef, Inject, forwardRef, NgZone, HostListener, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../common/shared';
import { OtPaginatorModule, Paginator } from '../paginator/paginator';
import { Column, Header, Footer, HeaderColumnGroup, FooterColumnGroup, PrimeTemplate } from '../common/shared';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
import { PerfectScrollbarModule, PerfectScrollbarDirective, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import datableLocalelabels from './datatable_labels.json';
var DTRadioButton = /** @class */ (function () {
    function DTRadioButton() {
        this.onClick = new EventEmitter();
    }
    DTRadioButton.prototype.handleClick = function (event) {
        this.onClick.emit(event);
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DTRadioButton.prototype, "checked", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DTRadioButton.prototype, "onClick", void 0);
    DTRadioButton = __decorate([
        Component({
            selector: 'ot-dtRadioButton',
            template: "<div class=\"ot-radio-button-wrapper\">\r\n    <div  [ngClass]=\"'ot-radiobutton ot-widget'\">\r\n        <div class=\"ot-helper-hidden-accessible\">\r\n            <input type=\"radio\" [checked]=\"checked\">\r\n        </div>\r\n        <div (click)=\"handleClick($event)\" (mouseenter)=\"hover=true\" (mouseleave)=\"hover=false\"\r\n            [ngClass]=\"{'ot-radiobutton-box ot-widget ot-state-default':true,'ot-ui-state-hover':hover,\r\n            'ot-state-active':checked}\">\r\n            <span class=\"ot-radiobutton-icon ot-clickable\"></span>\r\n        </div>\r\n    </div>\r\n   \r\n</div>"
        })
    ], DTRadioButton);
    return DTRadioButton;
}());
export { DTRadioButton };
var DTCheckbox = /** @class */ (function () {
    function DTCheckbox() {
        this.onChange = new EventEmitter();
    }
    DTCheckbox.prototype.handleClick = function (event) {
        if (!this.disabled) {
            this.onChange.emit({ originalEvent: event, checked: !this.checked });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DTCheckbox.prototype, "checked", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DTCheckbox.prototype, "disabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DTCheckbox.prototype, "onChange", void 0);
    DTCheckbox = __decorate([
        Component({
            selector: 'ot-dtCheckbox',
            template: "\r\n        <div class=\"ot-ui-chkbox ot-ui-widget\">\r\n            <div class=\"ot-ui-helper-hidden-accessible\">\r\n                <input type=\"checkbox\" [checked]=\"checked\">\r\n            </div>\r\n            <div class=\"ot-ui-chkbox-box ot-ui-widget ot-ui-corner-all ot-ui-state-default\" (click)=\"handleClick($event)\"\r\n                        (mouseover)=\"hover=true\" (mouseout)=\"hover=false\"\r\n                        [ngClass]=\"{'ot-ui-state-hover':hover&&!disabled,'ot-ui-state-active':checked&&!disabled,'ot-ui-state-disabled':disabled}\">\r\n                <span class=\"ot-ui-chkbox-icon ot-ui-clickable ot-ui-column-title\" ></span>\r\n            </div>\r\n        </div>"
        })
    ], DTCheckbox);
    return DTCheckbox;
}());
export { DTCheckbox };
var RowExpansionLoader = /** @class */ (function () {
    function RowExpansionLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    RowExpansionLoader.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.rowData,
            'rowIndex': this.rowIndex
        });
    };
    RowExpansionLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], RowExpansionLoader.prototype, "template", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RowExpansionLoader.prototype, "rowData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RowExpansionLoader.prototype, "rowIndex", void 0);
    RowExpansionLoader = __decorate([
        Component({
            selector: 'ot-rowExpansionLoader',
            template: ""
        }),
        __metadata("design:paramtypes", [ViewContainerRef])
    ], RowExpansionLoader);
    return RowExpansionLoader;
}());
export { RowExpansionLoader };
var ColumnHeaders = /** @class */ (function () {
    function ColumnHeaders(dt) {
        this.dt = dt;
    }
    __decorate([
        Input("pColumnHeaders"),
        __metadata("design:type", Array)
    ], ColumnHeaders.prototype, "columns", void 0);
    ColumnHeaders = __decorate([
        Component({
            selector: '[pColumnHeaders]',
            template: "\n        <ng-template ngFor let-col [ngForOf]=\"columns\" let-lastCol=\"last\">\n            <th #headerCell [attr.id]=\"col.colId\" [ngStyle]=\"col.headerStyle||col.style\" [class]=\"col.headerStyleClass||col.styleClass\" (click)=\"dt.sort($event,col)\" [attr.colspan]=\"col.colspan\" [attr.rowspan]=\"col.rowspan\"\n                [ngClass]=\"{'ot-ui-state-default ot-ui-unselectable-text':true, 'ot-ui-sortable-column': col.sortable, 'ot-ui-state-active': dt.isSorted(col), 'ot-ui-resizable-column': dt.resizableColumns, 'ot-ui-selection-column':col.selectionMode,\n                            'ot-ui-helper-hidden': col.hidden}\"\n                (dragstart)=\"dt.onColumnDragStart($event)\" (dragleave)=\"dt.onColumnDragleave($event)\" (drop)=\"dt.onColumnDrop($event)\" (mousedown)=\"dt.onHeaderMousedown($event,headerCell)\"\n                [attr.tabindex]=\"col.sortable ? tabindex : null\" (keydown)=\"dt.onHeaderKeydown($event,col)\"\n                [attr.scope]=\"col.scope||(col.colspan ? 'colgroup' : 'col')\">\n                <span class=\"ot-ui-column-resizer ot-ui-clickable\" *ngIf=\"dt.resizableColumns && ((dt.columnResizeMode == 'fit' && !lastCol) || dt.columnResizeMode == 'expand')\" (mousedown)=\"dt.initColumnResize($event)\"></span>\n                <span class=\"ot-ui-column-title\" *ngIf=\"!col.selectionMode&&!col.headerTemplate\">{{col.header}}</span>\n                <span class=\"ot-ui-column-title\" *ngIf=\"col.headerTemplate\">\n                    <ot-columnHeaderTemplateLoader [column]=\"col\"></ot-columnHeaderTemplateLoader>\n                </span>\n                <span class=\"ot-ui-sortable-column-icon ot-fa ot-fa-fw\" *ngIf=\"col.sortable\" \n                     [ngClass]=\"{'ot-fa-sort-desc': (dt.getSortOrder(col) == -1),'ot-fa-sort-asc': (dt.getSortOrder(col) == 1) , 'ot-fa-sort-default-up' : col.sortByDefault && col.order === 'asc', 'ot-fa-sort-default-down' : col.sortByDefault && col.order === 'desc'}\"></span>\n                <input [attr.type]=\"col.filterType\" class=\"ot-ui-column-filter ot-ui-inputtext ot-ui-widget ot-ui-state-default ot-ui-corner-all\" [attr.maxlength]=\"col.filterMaxlength\" [attr.placeholder]=\"col.filterPlaceholder\" *ngIf=\"col.filter&&!col.filterTemplate\" [value]=\"dt.filters[col.filterField||col.field] ? dt.filters[col.filterField||col.field].value : ''\"\n                    (click)=\"dt.onFilterInputClick($event, col)\" (input)=\"dt.onFilterKeyup($event.target.value, col.filterField||col.field, col.filterMatchMode)\"/>\n                <ot-columnFilterTemplateLoader [column]=\"col\" *ngIf=\"col.filter&&col.filterTemplate\"></ot-columnFilterTemplateLoader>\n                <ot-dtCheckbox *ngIf=\"col.selectionMode=='multiple' && dt.showHeaderCheckbox === true\" (onChange)=\"dt.toggleRowsWithCheckbox($event)\" [checked]=\"dt.allSelected\" [disabled]=\"dt.isEmpty()\"></ot-dtCheckbox>\n            </th>\n        </ng-template>\n    "
        }),
        __param(0, Inject(forwardRef(function () { return DataTable; }))),
        __metadata("design:paramtypes", [DataTable])
    ], ColumnHeaders);
    return ColumnHeaders;
}());
export { ColumnHeaders };
var ColumnFooters = /** @class */ (function () {
    function ColumnFooters(dt) {
        this.dt = dt;
    }
    __decorate([
        Input("pColumnFooters"),
        __metadata("design:type", Array)
    ], ColumnFooters.prototype, "columns", void 0);
    ColumnFooters = __decorate([
        Component({
            selector: '[pColumnFooters]',
            template: "\n        <td *ngFor=\"let col of columns\" [ngStyle]=\"col.footerStyle||col.style\" [class]=\"col.footerStyleClass||col.styleClass\"\n            [attr.colspan]=\"col.colspan\" [attr.rowspan]=\"col.rowspan\"\n            [ngClass]=\"{'ot-ui-state-default':true, 'ot-ui-helper-hidden': col.hidden}\">\n            <span class=\"ot-ui-column-footer\" *ngIf=\"!col.footerTemplate\">{{col.footer}}</span>\n            <span class=\"ot-ui-column-footer\" *ngIf=\"col.footerTemplate\">\n                <ot-columnFooterTemplateLoader [column]=\"col\"></ot-columnFooterTemplateLoader>\n            </span>\n        </td>\n    "
        }),
        __param(0, Inject(forwardRef(function () { return DataTable; }))),
        __metadata("design:paramtypes", [DataTable])
    ], ColumnFooters);
    return ColumnFooters;
}());
export { ColumnFooters };
var TableBody = /** @class */ (function () {
    function TableBody(dt) {
        this.dt = dt;
    }
    TableBody.prototype.visibleColumns = function () {
        return this.columns ? this.columns.filter(function (c) { return !c.hidden; }) : [];
    };
    __decorate([
        Input("pTableBody"),
        __metadata("design:type", Array)
    ], TableBody.prototype, "columns", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TableBody.prototype, "data", void 0);
    TableBody = __decorate([
        Component({
            selector: '[pTableBody]',
            template: "\n        <ng-template ngFor let-rowData [ngForOf]=\"data\" let-even=\"even\" let-odd=\"odd\" let-rowIndex=\"index\" [ngForTrackBy]=\"dt.rowTrackBy\">\n            <tr #rowGroupElement class=\"ot-ui-widget-header ot-ui-rowgroup-header\"\n                *ngIf=\"dt.rowGroupMode=='subheader' && (rowIndex === 0||(dt.resolveFieldData(rowData,dt.groupField) !== dt.resolveFieldData(dt.dataToRender[rowIndex - 1], dt.groupField)))\"\n                (click)=\"dt.onRowGroupClick($event)\" [ngStyle]=\"{'cursor': dt.sortableRowGroup ? 'pointer' : 'auto'}\">\n                <td [attr.colspan]=\"dt.visibleColumns().length\">\n                    <a href=\"#\" *ngIf=\"dt.expandableRowGroups\" (click)=\"dt.toggleRowGroup($event,rowData)\">\n                        <span class=\"ot-fa ot-fa-fw\" [ngClass]=\"dt.isRowGroupExpanded(rowData) ? dt.expandedIcon : dt.collapsedIcon\"></span>\n                    </a>\n                    <span class=\"ot-ui-rowgroup-header-name\">\n                        <ot-templateLoader [template]=\"dt.rowGroupHeaderTemplate\" [data]=\"rowData\"></ot-templateLoader>\n                    </span>\n                </td>\n            </tr>\n            <tr #rowElement [pReorderableRow]=rowIndex *ngIf=\"!dt.expandableRowGroups||dt.isRowGroupExpanded(rowData)\"\n                    (click)=\"dt.handleRowClick($event, rowData, rowIndex)\" (dblclick)=\"dt.rowDblclick($event,rowData)\" (contextmenu)=\"dt.onRowRightClick($event,rowData)\" (touchend)=\"dt.handleRowTouchEnd($event)\"\n                    [ngClass]=\"[even&&dt.rowGroupMode!='rowspan'? 'ot-ui-datatable-even':'',\n                                odd&&dt.rowGroupMode!='rowspan'?'ot-ui-datatable-odd':'',\n                                dt.isSelected(rowData)? 'ot-ui-state-highlight': '',\n                                dt.isRowExpanded(rowData) ? 'ot-ui-expanded-row': '',\n                                dt.getRowStyleClass(rowData,rowIndex)]\">\n                <ng-template ngFor let-col [ngForOf]=\"columns\" let-colIndex=\"index\">\n                    <td #cell *ngIf=\"!dt.rowGroupMode || (dt.rowGroupMode == 'subheader') ||\n                        (dt.rowGroupMode=='rowspan' && ((dt.sortField==col.field && dt.rowGroupMetadata[dt.resolveFieldData(rowData,dt.sortField)].index == rowIndex) || (dt.sortField!=col.field)))\"\n                        [ngStyle]=\"col.bodyStyle||col.style\" [class]=\"col.bodyStyleClass||col.styleClass\" (click)=\"dt.switchCellToEditMode(cell,col,rowData)\"\n                        [ngClass]=\"{'ot-ui-editable-column':col.editable,'ot-ui-selection-column':col.selectionMode, 'ot-ui-helper-hidden': col.hidden}\"\n                        [attr.rowspan]=\"(dt.rowGroupMode=='rowspan' && dt.sortField == col.field && dt.rowGroupMetadata[dt.resolveFieldData(rowData,dt.sortField)].index == rowIndex) ? dt.rowGroupMetadata[dt.resolveFieldData(rowData,dt.sortField)].size : null\">\n                        <span class=\"ot-ui-column-title\" *ngIf=\"dt.responsive\">{{col.header}}</span>\n                        <span class=\"ot-ui-cell-data\" *ngIf=\"!col.bodyTemplate && !col.expander && !col.selectionMode\">{{dt.resolveFieldData(rowData,col.field)}}</span>\n                        <span class=\"ot-ui-cell-data\" *ngIf=\"col.bodyTemplate\">\n                            <ot-columnBodyTemplateLoader [column]=\"col\" [rowData]=\"rowData\" [rowIndex]=\"rowIndex + dt.first\"></ot-columnBodyTemplateLoader>\n                        </span>\n                        <div class=\"ot-ui-cell-editor\" *ngIf=\"col.editable\">\n                            <input *ngIf=\"!col.editorTemplate\" type=\"text\" [(ngModel)]=\"rowData[col.field]\"\n                                (keydown)=\"dt.onCellEditorKeydown($event, col, rowData, rowIndex)\" (blur)=\"dt.onCellEditorBlur($event, col, rowData, rowIndex)\"\n                                (input)=\"dt.onCellEditorInput($event, col, rowData, rowIndex)\" (change)=\"dt.onCellEditorChange($event, col, rowData, rowIndex)\"\n                                class=\"ot-ui-inputtext ot-ui-widget ot-ui-state-default ot-ui-corner-all\"/>\n                            <a *ngIf=\"col.editorTemplate\" class=\"ot-ui-cell-editor-proxy-focus\" href=\"#\" (focus)=\"dt.onCustomEditorFocusPrev($event, colIndex)\"></a>\n                            <ot-columnEditorTemplateLoader *ngIf=\"col.editorTemplate\" [column]=\"col\" [rowData]=\"rowData\" [rowIndex]=\"rowIndex\"></ot-columnEditorTemplateLoader>\n                            <a *ngIf=\"col.editorTemplate\" class=\"ot-ui-cell-editor-proxy-focus\" href=\"#\" (focus)=\"dt.onCustomEditorFocusNext($event, colIndex)\"></a>\n                        </div>\n                        <a href=\"#\" *ngIf=\"col.expander\" (click)=\"dt.toggleRow(rowData,$event)\">\n                            <span class=\"ot-ui-row-toggler ot-fa ot-fa-fw ot-ui-clickable\" [ngClass]=\"dt.isRowExpanded(rowData) ? dt.expandedIcon : dt.collapsedIcon\"></span>\n                        </a>\n                      \n                  \n                        <i *ngIf=\"col.draggable\" class=\"ot-icon-draggable\" pReorderableRowHandle></i>\n                        <ot-dtRadioButton *ngIf=\"col.selectionMode=='single'\" (onClick)=\"dt.selectRowWithRadio($event, rowData)\" [checked]=\"dt.isSelected(rowData)\"></ot-dtRadioButton>\n                        <ot-dtCheckbox *ngIf=\"col.selectionMode=='multiple'\" (onChange)=\"dt.toggleRowWithCheckbox($event,rowData)\" [checked]=\"dt.isSelected(rowData)\"></ot-dtCheckbox>\n                    </td>\n                </ng-template>\n            </tr>\n            <tr *ngIf=\"dt.expandableRows && dt.isRowExpanded(rowData)\" class=\"ot-ui-expanded-row-content\">\n                <td [attr.colspan]=\"dt.visibleColumns().length\">\n                    <ot-rowExpansionLoader [rowData]=\"rowData\" [rowIndex]=\"rowIndex\" [template]=\"dt.rowExpansionTemplate\"></ot-rowExpansionLoader>\n                </td>\n            </tr>\n            <tr class=\"ot-ui-widget-header ot-ui-rowgroup-footer\" *ngIf=\"dt.rowGroupFooterTemplate && dt.rowGroupMode=='subheader' && ((rowIndex === dt.dataToRender.length - 1)||(dt.resolveFieldData(rowData,dt.groupField) !== dt.resolveFieldData(dt.dataToRender[rowIndex + 1],dt.groupField))) && (!dt.expandableRowGroups || dt.isRowGroupExpanded(rowData))\">\n                <ot-templateLoader class=\"ot-ui-helper-hidden\" [data]=\"rowData\" [template]=\"dt.rowGroupFooterTemplate\"></ot-templateLoader>\n            </tr>\n        </ng-template>\n\n        <tr *ngIf=\"dt.isEmpty()\" class=\"ot-ui-widget-content ot-ui-datatable-emptymessage-row\" [style.visibility]=\"dt.loading ? 'hidden' : 'visible'\">\n            <td [attr.colspan]=\"dt.visibleColumns().length\" class=\"ot-ui-datatable-emptymessage\">\n                <span *ngIf=\"!dt.emptyMessageTemplate\">{{dt.emptyMessage?dt.emptyMessage:dt._locale.emptyMessage}}</span>\n                <ot-templateLoader [template]=\"dt.emptyMessageTemplate\"></ot-templateLoader>\n            </td>\n        </tr>\n    "
        }),
        __param(0, Inject(forwardRef(function () { return DataTable; }))),
        __metadata("design:paramtypes", [DataTable])
    ], TableBody);
    return TableBody;
}());
export { TableBody };
var ScrollableView = /** @class */ (function () {
    function ScrollableView(dt, domHandler, el, renderer, zone) {
        var _this = this;
        this.dt = dt;
        this.domHandler = domHandler;
        this.el = el;
        this.renderer = renderer;
        this.zone = zone;
        this.onVirtualScroll = new EventEmitter();
        this.scrollToTopSubscriptionRef = this.dt.firstChange.subscribe(function (value) {
            _this.scrollToTop();
            //                  console.log('Subscription called');
        });
    }
    ScrollableView.prototype.ngAfterViewInit = function () {
        this.initScrolling();
        this.dtScrollHeight = this.dt.scrollHeight;
    };
    ScrollableView.prototype.resizeEvent = function () {
        this.setScrollHeight();
    };
    ScrollableView.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.dt.paginatorElement && this.dt.paginatorElement['paginatorConatainer'] && !this.paginatorHeight) {
            this.paginatorHeight = this.dt.paginatorElement['paginatorConatainer'].nativeElement.parentElement.offsetHeight;
            this.setScrollHeight();
        }
        if (this.dtScrollHeight != this.dt.scrollHeight) {
            this.setScrollHeight();
            this.dtScrollHeight = this.dt.scrollHeight;
        }
        if (this.virtualScroll && !this.rowHeight) {
            var row = this.domHandler.findSingle(this.scrollTable, 'tr.ot-ui-widget-content:not(.ot-ui-datatable-emptymessage-row)');
            if (row) {
                this.rowHeight = this.domHandler.getOuterHeight(row);
            }
        }
        if (!this.frozen) {
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.alignScrollBar();
                }, 1);
            });
        }
    };
    ScrollableView.prototype.initScrolling = function () {
        var _this = this;
        this.scrollHeader = this.scrollHeaderViewChild.nativeElement;
        this.scrollHeaderBox = this.scrollHeaderBoxViewChild.nativeElement;
        this.scrollBody = this.scrollBodyViewChild.nativeElement;
        this.scrollTable = this.scrollTableViewChild.nativeElement;
        this.scrollTableWrapper = this.scrollTableWrapperViewChild.nativeElement;
        this.scrollFooter = this.scrollFooterViewChild ? this.scrollFooterViewChild.nativeElement : null;
        this.scrollFooterBox = this.scrollFooterBoxViewChild ? this.scrollFooterBoxViewChild.nativeElement : null;
        this.setScrollHeight();
        if (!this.frozen) {
            this.zone.runOutsideAngular(function () {
                _this.scrollHeader.addEventListener('scroll', _this.onHeaderScroll.bind(_this));
                _this.scrollBody.addEventListener('scroll', _this.onBodyScroll.bind(_this));
            });
        }
        if (!this.frozen) {
            this.alignScrollBar();
        }
        else {
            this.scrollBody.style.paddingBottom = this.domHandler.calculateScrollbarWidth() + 'px';
        }
    };
    ScrollableView.prototype.onBodyScroll = function (event) {
        var _this = this;
        var frozenView = this.el.nativeElement.previousElementSibling;
        if (frozenView) {
            var frozenScrollBody = this.domHandler.findSingle(frozenView, '.ot-ui-datatable-scrollable-body');
        }
        this.scrollHeaderBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';
        if (this.scrollFooterBox) {
            this.scrollFooterBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';
        }
        if (frozenScrollBody) {
            frozenScrollBody.scrollTop = this.scrollBody.scrollTop;
        }
        if (this.virtualScroll) {
            var viewport = this.domHandler.getOuterHeight(this.scrollBody);
            var tableHeight = this.domHandler.getOuterHeight(this.scrollTable);
            var pageHeight_1 = this.rowHeight * this.dt.rows;
            var virtualTableHeight = this.domHandler.getOuterHeight(this.scrollTableWrapper);
            var pageCount = (virtualTableHeight / pageHeight_1) || 1;
            if (this.scrollBody.scrollTop + viewport > parseFloat(this.scrollTable.style.top) + tableHeight || this.scrollBody.scrollTop < parseFloat(this.scrollTable.style.top)) {
                var page_1 = Math.floor((this.scrollBody.scrollTop * pageCount) / (this.scrollBody.scrollHeight)) + 1;
                this.onVirtualScroll.emit({
                    page: page_1,
                    callback: function () {
                        _this.scrollTable.style.top = ((page_1 - 1) * pageHeight_1) + 'px';
                    }
                });
            }
        }
    };
    ScrollableView.prototype.setScrollHeight = function () {
        {
            this.scrollBody.style.visibility = 'hidden';
            this.scrollBody.style.height = '100px'; //temporary height to calculate static height
            var containerHeight = this.domHandler.getOuterHeight(this.dt.el.nativeElement.children[0]);
            var relativeHeight = this.dt.el.nativeElement.parentElement.offsetHeight;
            var staticHeight = containerHeight - 100; //total height of headers, footers, paginators
            var scrollBodyHeight = (relativeHeight - staticHeight);
            var headerHeight = this.scrollHeader.offsetHeight;
            this.scrollBody.style.height = scrollBodyHeight + 'px'; //relativeHeight - (headerHeight + this.paginatorHeight) + "px";
            this.scrollBody.style.maxHeight = scrollBodyHeight + 'px';
            this.scrollBody.style.visibility = 'visible';
        }
    };
    ScrollableView.prototype.scrollToTop = function () {
        // console.log('scroll to top called');    
        this.directiveScroll.scrollToTop();
    };
    ScrollableView.prototype.onHeaderScroll = function (event) {
        this.scrollHeader.scrollLeft = 0;
    };
    ScrollableView.prototype.hasVerticalOverflow = function () {
        return this.domHandler.getOuterHeight(this.scrollTable) > this.domHandler.getOuterHeight(this.scrollBody);
    };
    ScrollableView.prototype.alignScrollBar = function () {
        var scrollBarWidth = this.hasVerticalOverflow() ? this.domHandler.calculateScrollbarWidth() : 0;
        this.scrollHeaderBox.style.marginRight = scrollBarWidth + 'px';
        if (this.scrollFooterBox) {
            this.scrollFooterBox.style.marginRight = scrollBarWidth + 'px';
        }
    };
    ScrollableView.prototype.ngOnDestroy = function () {
        this.scrollHeader.removeEventListener('scroll', this.onHeaderScroll);
        this.scrollBody.removeEventListener('scroll', this.onBodyScroll);
        this.scrollToTopSubscriptionRef.unsubscribe();
    };
    __decorate([
        ViewChild(PerfectScrollbarDirective),
        __metadata("design:type", PerfectScrollbarDirective)
    ], ScrollableView.prototype, "directiveScroll", void 0);
    __decorate([
        Input("pScrollableView"),
        __metadata("design:type", Array)
    ], ScrollableView.prototype, "columns", void 0);
    __decorate([
        Input(),
        __metadata("design:type", HeaderColumnGroup)
    ], ScrollableView.prototype, "headerColumnGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", HeaderColumnGroup)
    ], ScrollableView.prototype, "footerColumnGroup", void 0);
    __decorate([
        ViewChild('scrollHeader'),
        __metadata("design:type", ElementRef)
    ], ScrollableView.prototype, "scrollHeaderViewChild", void 0);
    __decorate([
        ViewChild('scrollHeaderBox'),
        __metadata("design:type", ElementRef)
    ], ScrollableView.prototype, "scrollHeaderBoxViewChild", void 0);
    __decorate([
        ViewChild('scrollBody'),
        __metadata("design:type", ElementRef)
    ], ScrollableView.prototype, "scrollBodyViewChild", void 0);
    __decorate([
        ViewChild('scrollTable'),
        __metadata("design:type", ElementRef)
    ], ScrollableView.prototype, "scrollTableViewChild", void 0);
    __decorate([
        ViewChild('scrollTableWrapper'),
        __metadata("design:type", ElementRef)
    ], ScrollableView.prototype, "scrollTableWrapperViewChild", void 0);
    __decorate([
        ViewChild('scrollFooter'),
        __metadata("design:type", ElementRef)
    ], ScrollableView.prototype, "scrollFooterViewChild", void 0);
    __decorate([
        ViewChild('scrollFooterBox'),
        __metadata("design:type", ElementRef)
    ], ScrollableView.prototype, "scrollFooterBoxViewChild", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ScrollableView.prototype, "frozen", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ScrollableView.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ScrollableView.prototype, "virtualScroll", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ScrollableView.prototype, "onVirtualScroll", void 0);
    ScrollableView = __decorate([
        Component({
            selector: '[pScrollableView]',
            template: "\n        <div #scrollHeader  class=\"ot-ui-widget-header ot-ui-datatable-scrollable-header\" [ngStyle]=\"{'width': width}\" (window:resize)=\"resizeEvent()\">\n            <div #scrollHeaderBox  class=\"ot-ui-datatable-scrollable-header-box\">\n                <table [ngClass]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                    <thead class=\"ot-ui-datatable-thead\">\n                        <tr *ngIf=\"!headerColumnGroup\" class=\"ot-ui-state-default\" [pColumnHeaders]=\"columns\"></tr>\n                        <ng-template [ngIf]=\"headerColumnGroup\">\n                            <tr *ngFor=\"let headerRow of headerColumnGroup.rows\" class=\"ot-ui-state-default\" [pColumnHeaders]=\"headerRow.columns\"></tr>\n                        </ng-template>\n                    </thead>\n                    <tbody *ngIf=\"dt.frozenValue\" [ngClass]=\"{'ot-ui-datatable-data ot-ui-widget-content': true, 'ot-ui-datatable-hoverable-rows': (dt.rowHover||dt.selectionMode)}\" [pTableBody]=\"columns\" [data]=\"dt.frozenValue\"></tbody>\n                </table>\n            </div>\n        </div>\n        <div #scrollBody class=\"ot-ui-datatable-scrollable-body\" [perfectScrollbar]=\"{}\" [ngStyle]=\"{'width': width}\">\n            <div #scrollTableWrapper class=\"ot-ui-datatable-scrollable-table-wrapper\" style=\"position:relative\">\n                <table #scrollTable [class]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\" [ngClass]=\"{'ot-ui-datatable-virtual-table':virtualScroll}\" style=\"top:0px\">\n                    <colgroup class=\"ot-ui-datatable-scrollable-colgroup\">\n                        <col *ngFor=\"let col of columns\" [ngStyle]=\"col.headerStyle||col.style\" [ngClass]=\"{'ot-ui-helper-hidden': col.hidden}\"/>\n                    </colgroup>\n                    <tbody [ngClass]=\"{'ot-ui-datatable-data ot-ui-widget-content': true, 'ot-ui-datatable-hoverable-rows': (dt.rowHover||dt.selectionMode)}\" [pTableBody]=\"columns\" [data]=\"dt.dataToRender\"></tbody>\n                </table>\n            </div>\n        </div>\n        <div #scrollFooter class=\"ot-ui-widget-header ot-ui-datatable-scrollable-footer\" [ngStyle]=\"{'width': width}\" *ngIf=\"dt.hasFooter()\">\n            <div #scrollFooterBox  class=\"ot-ui-datatable-scrollable-footer-box\">\n                <table [ngClass]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                    <tfoot class=\"ot-ui-datatable-tfoot\">\n                        <tr *ngIf=\"!footerColumnGroup\" [pColumnFooters]=\"columns\" class=\"ot-ui-state-default\"></tr>\n                        <ng-template [ngIf]=\"footerColumnGroup\">\n                            <tr *ngFor=\"let footerRow of footerColumnGroup.rows\" class=\"ot-ui-state-default\" [pColumnFooters]=\"footerRow.columns\"></tr>\n                        </ng-template>\n                    </tfoot>\n                </table>\n            </div>\n        </div>\n    "
        }),
        __param(0, Inject(forwardRef(function () { return DataTable; }))),
        __metadata("design:paramtypes", [DataTable, DomHandler, ElementRef, Renderer2, NgZone])
    ], ScrollableView);
    return ScrollableView;
}());
export { ScrollableView };
var DataTable = /** @class */ (function () {
    function DataTable(el, domHandler, differs, renderer, changeDetector, objectUtils, zone) {
        this.el = el;
        this.domHandler = domHandler;
        this.differs = differs;
        this.renderer = renderer;
        this.changeDetector = changeDetector;
        this.objectUtils = objectUtils;
        this.zone = zone;
        this.onRowReorder = new EventEmitter();
        this.pageLinks = 5;
        this.selectionChange = new EventEmitter();
        this.showHeaderCheckbox = true;
        this.onRowClick = new EventEmitter();
        this.onRowSelect = new EventEmitter();
        this.onRowUnselect = new EventEmitter();
        this.onRowDblclick = new EventEmitter();
        this.onHeaderCheckboxToggle = new EventEmitter();
        this.onContextMenuSelect = new EventEmitter();
        this.filterDelay = 300;
        this.onLazyLoad = new EventEmitter();
        this.columnResizeMode = 'fit';
        this.onColResize = new EventEmitter();
        this.onColReorder = new EventEmitter();
        this.sortMode = 'single';
        this.defaultSortOrder = 1;
        this.csvSeparator = ',';
        this.exportFilename = 'download';
        this.paginatorPosition = 'bottom';
        this.alwaysShowPaginator = true;
        this.metaKeySelection = true;
        this.rowTrackBy = function (index, item) { return item; };
        this.immutable = true;
        this.compareSelectionBy = 'deepEquals';
        this.onEditInit = new EventEmitter();
        this.onEditComplete = new EventEmitter();
        this.onEdit = new EventEmitter();
        this.onEditCancel = new EventEmitter();
        this.onPage = new EventEmitter();
        this.onSort = new EventEmitter();
        this.onFilter = new EventEmitter();
        this.rowExpandMode = 'multiple';
        this.expandedIcon = 'ot-fa-chevron-circle-down';
        this.collapsedIcon = 'ot-fa-chevron-circle-right';
        this.tabindex = 1;
        this.sortableRowGroup = true;
        this.filters = {};
        this.loadingIcon = 'ot-fa-circle-o-notch';
        this.virtualScrollDelay = 500;
        this.rowGroupExpandMode = 'multiple';
        this.valueChange = new EventEmitter();
        this.firstChange = new EventEmitter();
        this.onRowExpand = new EventEmitter();
        this.onRowCollapse = new EventEmitter();
        this.onRowGroupExpand = new EventEmitter();
        this.onRowGroupCollapse = new EventEmitter();
        this.page = 0;
        this.columnsChanged = false;
        this._first = 0;
        this._sortOrder = 1;
        this.i = 0;
        this._locale = {
            emptyMessage: "No Records"
        };
        this._language = "en";
        this.filterConstraints = {
            startsWith: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                var filterValue = filter.toLowerCase();
                return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
            },
            contains: function (value, filter) {
                if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            },
            endsWith: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                var filterValue = filter.toString().toLowerCase();
                return value.toString().toLowerCase().indexOf(filterValue, value.toString().length - filterValue.length) !== -1;
            },
            equals: function (value, filter) {
                if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                return value.toString().toLowerCase() == filter.toString().toLowerCase();
            },
            notEquals: function (value, filter) {
                if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                    return false;
                }
                if (value === undefined || value === null) {
                    return true;
                }
                return value.toString().toLowerCase() != filter.toString().toLowerCase();
            },
            in: function (value, filter) {
                if (filter === undefined || filter === null || filter.length === 0) {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                for (var i = 0; i < filter.length; i++) {
                    if (filter[i] === value)
                        return true;
                }
                return false;
            }
        };
        this.differ = differs.find([]).create(null);
    }
    DataTable.prototype.ngOnInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
    };
    DataTable.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.initColumns();
        this.initColumnGroups();
        this.columnsSubscription = this.cols.changes.subscribe(function (_) {
            _this.initColumns();
            _this.changeDetector.markForCheck();
        });
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'rowexpansion':
                    _this.rowExpansionTemplate = item.template;
                    break;
                case 'rowgroupheader':
                    _this.rowGroupHeaderTemplate = item.template;
                    break;
                case 'rowgroupfooter':
                    _this.rowGroupFooterTemplate = item.template;
                    break;
                case 'emptymessage':
                    _this.emptyMessageTemplate = item.template;
                    break;
            }
        });
    };
    DataTable.prototype.ngAfterViewChecked = function () {
        if (this.columnsChanged && this.el.nativeElement.offsetParent) {
            if (this.resizableColumns) {
                this.initResizableColumns();
            }
            if (this.reorderableColumns) {
                this.initColumnReordering();
            }
            this.columnsChanged = false;
        }
        if (this.totalRecordsChanged && this.virtualScroll && this.virtualScrollableTableWrapper && this.virtualScrollableTableWrapper.offsetParent) {
            var row = this.domHandler.findSingle(this.virtualScrollableTableWrapper, 'tr.ot-ui-widget-content');
            var rowHeight = this.domHandler.getOuterHeight(row);
            this.virtualTableHeight = this._totalRecords * rowHeight;
            this.virtualScrollableTableWrapper.style.height = this.virtualTableHeight + 'px';
            this.totalRecordsChanged = false;
        }
    };
    DataTable.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.globalFilter) {
            this.globalFilterFunction = this.renderer.listen(this.globalFilter, 'keyup', function () {
                if (_this.filterTimeout) {
                    clearTimeout(_this.filterTimeout);
                }
                _this.filterTimeout = setTimeout(function () {
                    _this._filter();
                    _this.filterTimeout = null;
                }, _this.filterDelay);
            });
        }
        this.virtualScrollableTableWrapper = this.domHandler.findSingle(this.el.nativeElement, 'div.ot-ui-datatable-scrollable-table-wrapper');
        this.initialized = true;
    };
    Object.defineProperty(DataTable.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        set: function (newLocale) {
            if (newLocale) {
                this._language = newLocale;
                this._locale = datableLocalelabels[newLocale] ? datableLocalelabels[newLocale] : this._locale;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "multiSortMeta", {
        get: function () {
            return this._multiSortMeta;
        },
        set: function (val) {
            this._multiSortMeta = val;
            if (this.sortMode === 'multiple') {
                this.sortMultiple();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "sortField", {
        get: function () {
            return this._sortField;
        },
        set: function (val) {
            this._sortField = val;
            if (this.sortMode === 'single') {
                this.sortSingle();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "sortOrder", {
        get: function () {
            return this._sortOrder;
        },
        set: function (val) {
            this._sortOrder = val;
            if (this.sortMode === 'single') {
                this.sortSingle();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            if (this.immutable) {
                this._value = val ? val.slice() : null;
                this.handleDataChange();
            }
            else {
                this._value = val;
            }
            this.valueChange.emit(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "first", {
        get: function () {
            return this._first;
        },
        set: function (val) {
            var shouldPaginate = this.initialized && this._first !== val;
            this._first = val;
            if (shouldPaginate) {
                this.paginate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            this.totalRecordsChanged = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "selection", {
        get: function () {
            return this._selection;
        },
        set: function (val) {
            this._selection = val;
            if (this.dataKey && !this.preventSelectionKeysPropagation) {
                this.selectionKeys = {};
                if (this._selection) {
                    if (Array.isArray(this._selection)) {
                        for (var _i = 0, _a = this._selection; _i < _a.length; _i++) {
                            var data = _a[_i];
                            this.selectionKeys[String(this.objectUtils.resolveFieldData(data, this.dataKey))] = 1;
                        }
                    }
                    else {
                        this.selectionKeys[String(this.objectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
                    }
                }
            }
            this.preventSelectionKeysPropagation = false;
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype.ngDoCheck = function () {
        if (!this.immutable) {
            var changes = this.differ.diff(this.value);
            if (changes) {
                this.handleDataChange();
            }
        }
    };
    DataTable.prototype.handleDataChange = function () {
        var _this = this;
        if (this.paginator) {
            this.updatePaginator();
        }
        if (this.virtualScroll && this.virtualScrollCallback) {
            this.virtualScrollCallback();
        }
        if (!this.lazy) {
            if (this.hasFilter()) {
                this._filter();
            }
            if (this.preventSortPropagation) {
                this.preventSortPropagation = false;
            }
            else if (this.sortField || this.multiSortMeta) {
                if (!this.sortColumn && this.columns) {
                    this.sortColumn = this.columns.find(function (col) { return col.field === _this.sortField && col.sortable === 'custom'; });
                }
                if (this.sortMode == 'single')
                    this.sortSingle();
                else if (this.sortMode == 'multiple')
                    this.sortMultiple();
            }
        }
        this.updateDataToRender(this.filteredValue || this.value);
    };
    DataTable.prototype.initColumns = function () {
        this.columns = this.cols.toArray();
        this.initScrollableColumns();
        this.columnsChanged = true;
    };
    DataTable.prototype.initScrollableColumns = function () {
        this.scrollableColumns = [];
        this.frozenColumns = [];
        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
            var col = _a[_i];
            if (col.frozen)
                this.frozenColumns.push(col);
            else
                this.scrollableColumns.push(col);
        }
    };
    DataTable.prototype.initColumnGroups = function () {
        var headerColumnsGroups = this.headerColumnGroups.toArray();
        var footerColumnsGroups = this.footerColumnGroups.toArray();
        for (var _i = 0, headerColumnsGroups_1 = headerColumnsGroups; _i < headerColumnsGroups_1.length; _i++) {
            var columnGroup = headerColumnsGroups_1[_i];
            if (columnGroup.frozen)
                this.frozenHeaderColumnGroup = columnGroup;
            else
                this.scrollableHeaderColumnGroup = columnGroup;
        }
        for (var _a = 0, footerColumnsGroups_1 = footerColumnsGroups; _a < footerColumnsGroups_1.length; _a++) {
            var columnGroup = footerColumnsGroups_1[_a];
            if (columnGroup.frozen)
                this.frozenFooterColumnGroup = columnGroup;
            else
                this.scrollableFooterColumnGroup = columnGroup;
        }
    };
    DataTable.prototype.resolveFieldData = function (data, field) {
        return this.objectUtils.resolveFieldData(data, field);
    };
    DataTable.prototype.updateRowGroupMetadata = function () {
        this.rowGroupMetadata = {};
        if (this.dataToRender) {
            for (var i = 0; i < this.dataToRender.length; i++) {
                var rowData = this.dataToRender[i];
                var group = this.resolveFieldData(rowData, this.sortField);
                if (i == 0) {
                    this.rowGroupMetadata[group] = { index: 0, size: 1 };
                }
                else {
                    var previousRowData = this.dataToRender[i - 1];
                    var previousRowGroup = this.resolveFieldData(previousRowData, this.sortField);
                    if (group === previousRowGroup) {
                        this.rowGroupMetadata[group].size++;
                    }
                    else {
                        this.rowGroupMetadata[group] = { index: i, size: 1 };
                    }
                }
            }
        }
    };
    DataTable.prototype.updatePaginator = function () {
        //total records
        this.updateTotalRecords();
        //first
        if (this.totalRecords && this.first >= this.totalRecords) {
            var numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this._first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    };
    DataTable.prototype.updateTotalRecords = function () {
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
    };
    DataTable.prototype.onPageChange = function (event) {
        this._first = event.first;
        this.firstChange.emit(this.first);
        this.rows = event.rows;
        this.paginate();
    };
    DataTable.prototype.paginate = function () {
        if (this.lazy)
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        else
            this.updateDataToRender(this.filteredValue || this.value);
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    };
    DataTable.prototype.updateDataToRender = function (datasource) {
        if ((this.paginator || this.virtualScroll) && datasource) {
            this.dataToRender = [];
            var startIndex = this.lazy ? 0 : this.first;
            var endIndex = this.virtualScroll ? this.first + this.rows * 2 : startIndex + this.rows;
            for (var i = startIndex; i < endIndex; i++) {
                if (i >= datasource.length) {
                    break;
                }
                this.dataToRender.push(datasource[i]);
            }
        }
        else {
            this.dataToRender = datasource;
        }
        if (this.rowGroupMode) {
            this.updateRowGroupMetadata();
        }
    };
    DataTable.prototype.onVirtualScroll = function (event) {
        var _this = this;
        this._first = (event.page - 1) * this.rows;
        this.virtualScrollCallback = event.callback;
        this.zone.run(function () {
            if (_this.virtualScrollTimer) {
                clearTimeout(_this.virtualScrollTimer);
            }
            _this.virtualScrollTimer = setTimeout(function () {
                if (_this.lazy)
                    _this.onLazyLoad.emit(_this.createLazyLoadMetadata());
                else
                    _this.updateDataToRender(_this.filteredValue || _this.value);
            }, _this.virtualScrollDelay);
        });
    };
    DataTable.prototype.onHeaderKeydown = function (event, column) {
        if (event.keyCode == 13) {
            this.sort(event, column);
            event.preventDefault();
        }
    };
    DataTable.prototype.onHeaderMousedown = function (event, header) {
        if (this.reorderableColumns) {
            if (event.target.nodeName !== 'INPUT') {
                header.draggable = true;
            }
            else if (event.target.nodeName === 'INPUT') {
                header.draggable = false;
            }
        }
    };
    DataTable.prototype.sort = function (event, column) {
        if (!column.sortable) {
            return;
        }
        // to remove by default sort icon
        this.columns.forEach(function (element) {
            if (!!element.sortByDefault) {
                element.sortByDefault = false;
            }
        });
        var targetNode = event.target.nodeName;
        if ((targetNode == 'TH' && this.domHandler.hasClass(event.target, 'ot-ui-sortable-column')) || ((targetNode == 'SPAN' || targetNode == 'DIV') && !this.domHandler.hasClass(event.target, 'ot-ui-clickable'))) {
            if (!this.immutable) {
                this.preventSortPropagation = true;
            }
            var columnSortField = column.sortField || column.field;
            this._sortOrder = (this.sortField === columnSortField) ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = columnSortField;
            this.sortColumn = column;
            var metaKey = event.metaKey || event.ctrlKey;
            if (this.sortMode == 'multiple') {
                if (!this.multiSortMeta || !metaKey) {
                    this._multiSortMeta = [];
                }
                this.addSortMeta({ field: this.sortField, order: this.sortOrder });
            }
            if (this.lazy) {
                this._first = 0;
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else {
                if (this.sortMode == 'multiple')
                    this.sortMultiple();
                else
                    this.sortSingle();
            }
            this.onSort.emit({
                field: this.sortField,
                order: this.sortOrder,
                multisortmeta: this.multiSortMeta
            });
        }
        this.updateDataToRender(this.filteredValue || this.value);
    };
    DataTable.prototype.sortSingle = function () {
        var _this = this;
        if (this.value) {
            if (this.sortColumn && this.sortColumn.sortable === 'custom') {
                this.preventSortPropagation = true;
                this.sortColumn.sortFunction.emit({
                    field: this.sortField,
                    order: this.sortOrder
                });
            }
            else {
                this.value.sort(function (data1, data2) {
                    var value1 = _this.resolveFieldData(data1, _this.sortField);
                    var value2 = _this.resolveFieldData(data2, _this.sortField);
                    var result = null;
                    if (value1 == null && value2 != null)
                        result = -1;
                    else if (value1 != null && value2 == null)
                        result = 1;
                    else if (value1 == null && value2 == null)
                        result = 0;
                    else if (typeof value1 === 'string' && typeof value2 === 'string')
                        result = value1.localeCompare(value2);
                    else
                        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                    return (_this.sortOrder * result);
                });
            }
            this._first = 0;
            if (this.hasFilter()) {
                this._filter();
            }
        }
    };
    DataTable.prototype.sortMultiple = function () {
        var _this = this;
        if (this.value) {
            this.value.sort(function (data1, data2) {
                return _this.multisortField(data1, data2, _this.multiSortMeta, 0);
            });
            if (this.hasFilter()) {
                this._filter();
            }
        }
    };
    DataTable.prototype.multisortField = function (data1, data2, multiSortMeta, index) {
        var value1 = this.resolveFieldData(data1, multiSortMeta[index].field);
        var value2 = this.resolveFieldData(data2, multiSortMeta[index].field);
        var result = null;
        if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 != value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2));
            }
        }
        else {
            result = (value1 < value2) ? -1 : 1;
        }
        if (value1 == value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
        }
        return (multiSortMeta[index].order * result);
    };
    DataTable.prototype.addSortMeta = function (meta) {
        var index = -1;
        for (var i = 0; i < this.multiSortMeta.length; i++) {
            if (this.multiSortMeta[i].field === meta.field) {
                index = i;
                break;
            }
        }
        if (index >= 0)
            this.multiSortMeta[index] = meta;
        else
            this.multiSortMeta.push(meta);
    };
    DataTable.prototype.isSorted = function (column) {
        if (!column.sortable) {
            return false;
        }
        var columnSortField = column.sortField || column.field;
        if (this.sortMode === 'single') {
            return (this.sortField && columnSortField === this.sortField);
        }
        else if (this.sortMode === 'multiple') {
            var sorted = false;
            if (this.multiSortMeta) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == columnSortField) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    };
    DataTable.prototype.getSortOrder = function (column) {
        var order = 0;
        var columnSortField = column.sortField || column.field;
        if (this.sortMode === 'single') {
            if (this.sortField && columnSortField === this.sortField) {
                order = this.sortOrder;
            }
        }
        else if (this.sortMode === 'multiple') {
            if (this.multiSortMeta) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == columnSortField) {
                        order = this.multiSortMeta[i].order;
                        break;
                    }
                }
            }
        }
        return order;
    };
    DataTable.prototype.checkFirstSortableColumn = function () {
        this.i++;
        if (this.i == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    DataTable.prototype.onRowGroupClick = function (event) {
        if (this.rowGroupToggleClick) {
            this.rowGroupToggleClick = false;
            return;
        }
        if (this.sortableRowGroup) {
            var targetNode = event.target.nodeName;
            if ((targetNode == 'TD' || (targetNode == 'SPAN' && !this.domHandler.hasClass(event.target, 'ot-ui-clickable')))) {
                if (this.sortField != this.groupField) {
                    this._sortField = this.groupField;
                    this.sortSingle();
                }
                else {
                    this._sortOrder = -1 * this.sortOrder;
                    this.sortSingle();
                }
            }
        }
    };
    DataTable.prototype.clearSelectionRange = function () {
        var rangeStart, rangeEnd;
        if (this.rangeRowIndex > this.anchorRowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        else if (this.rangeRowIndex < this.anchorRowIndex) {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        var _loop_1 = function (i) {
            var rangeRowData = this_1.dataToRender[i];
            var selectionIndex = this_1.findIndexInSelection(rangeRowData);
            this_1._selection = this_1.selection.filter(function (val, i) { return i != selectionIndex; });
            var dataKeyValue = this_1.dataKey ? String(this_1.resolveFieldData(rangeRowData, this_1.dataKey)) : null;
            if (dataKeyValue) {
                delete this_1.selectionKeys[dataKeyValue];
            }
            this_1.onRowUnselect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
        };
        var this_1 = this;
        for (var i = rangeStart; i <= rangeEnd; i++) {
            _loop_1(i);
        }
    };
    DataTable.prototype.selectRange = function (rowIndex) {
        var rangeStart, rangeEnd;
        if (this.anchorRowIndex > rowIndex) {
            rangeStart = rowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else if (this.anchorRowIndex < rowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = rowIndex;
        }
        else {
            rangeStart = rowIndex;
            rangeEnd = rowIndex;
        }
        for (var i = rangeStart; i <= rangeEnd; i++) {
            var rangeRowData = this.dataToRender[i];
            this._selection = this.selection.concat([rangeRowData]);
            this.selectionChange.emit(this.selection);
            var dataKeyValue = this.dataKey ? String(this.resolveFieldData(rangeRowData, this.dataKey)) : null;
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
            this.onRowSelect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
        }
    };
    DataTable.prototype.handleRowClick = function (event, rowData, index) {
        if (this.preventRowClickPropagation) {
            this.preventRowClickPropagation = false;
            return;
        }
        var targetNode = event.target.nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || (this.domHandler.hasClass(event.target, 'ot-ui-clickable'))) {
            return;
        }
        this.onRowClick.next({ originalEvent: event, data: rowData });
        if (this.selectionMode) {
            if (this.isMultipleSelectionMode() && event.shiftKey && this.anchorRowIndex != null) {
                this.domHandler.clearSelection();
                if (this.rangeRowIndex != null) {
                    this.clearSelectionRange();
                }
                this.rangeRowIndex = index;
                this.selectRange(index);
            }
            else {
                var selected = this.isSelected(rowData);
                var metaSelection = this.rowTouched ? false : this.metaKeySelection;
                var dataKeyValue = this.dataKey ? String(this.resolveFieldData(rowData, this.dataKey)) : null;
                this.anchorRowIndex = index;
                this.rangeRowIndex = index;
                if (metaSelection) {
                    var metaKey = event.metaKey || event.ctrlKey;
                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(null);
                        }
                        else {
                            var selectionIndex_1 = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_1; });
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        this.onRowUnselect.emit({ originalEvent: event, data: rowData, type: 'row' });
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            this._selection = rowData;
                            this.selectionChange.emit(rowData);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        else if (this.isMultipleSelectionMode()) {
                            if (metaKey) {
                                this._selection = this.selection || [];
                            }
                            else {
                                this._selection = [];
                                this.selectionKeys = {};
                            }
                            this._selection = this.selection.concat([rowData]);
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        this.onRowSelect.emit({ originalEvent: event, data: rowData, type: 'row' });
                    }
                }
                else {
                    if (this.isSingleSelectionMode()) {
                        if (selected) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.onRowUnselect.emit({ originalEvent: event, data: rowData, type: 'row' });
                        }
                        else {
                            this._selection = rowData;
                            this.onRowSelect.emit({ originalEvent: event, data: rowData, type: 'row' });
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                    else {
                        if (selected) {
                            var selectionIndex_2 = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_2; });
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event, data: rowData, type: 'row' });
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        else {
                            this._selection = (this.selection || []).concat([rowData]);
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event, data: rowData, type: 'row' });
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                }
            }
            this.preventSelectionKeysPropagation = true;
        }
        this.rowTouched = false;
    };
    DataTable.prototype.handleRowTouchEnd = function (event) {
        this.rowTouched = true;
    };
    DataTable.prototype.selectRowWithRadio = function (event, rowData) {
        if (this.selection != rowData) {
            this._selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event, data: rowData, type: 'radiobutton' });
            if (this.dataKey) {
                this.selectionKeys = {};
                this.selectionKeys[String(this.resolveFieldData(rowData, this.dataKey))] = 1;
            }
        }
        else {
            this._selection = null;
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event, data: rowData, type: 'radiobutton' });
        }
        this.preventSelectionKeysPropagation = true;
        this.preventRowClickPropagation = true;
    };
    DataTable.prototype.toggleRowWithCheckbox = function (event, rowData) {
        var selectionIndex = this.findIndexInSelection(rowData);
        this.selection = this.selection || [];
        var dataKeyValue = this.dataKey ? String(this.resolveFieldData(rowData, this.dataKey)) : null;
        if (selectionIndex != -1) {
            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex; });
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        }
        else {
            this._selection = this.selection.concat([rowData]);
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }
        this.preventSelectionKeysPropagation = true;
        this.preventRowClickPropagation = true;
    };
    DataTable.prototype.toggleRowsWithCheckbox = function (event) {
        if (event.checked)
            this.selection = this.headerCheckboxToggleAllPages ? this.value.slice() : this.dataToRender.slice();
        else
            this.selection = [];
        this.selectionChange.emit(this.selection);
        this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: event.checked });
    };
    DataTable.prototype.onRowRightClick = function (event, rowData) {
        if (this.contextMenu) {
            var selectionIndex = this.findIndexInSelection(rowData);
            var selected = selectionIndex != -1;
            var dataKeyValue = this.dataKey ? String(this.resolveFieldData(rowData, this.dataKey)) : null;
            if (!selected) {
                if (this.isSingleSelectionMode()) {
                    this.selection = rowData;
                    this.selectionChange.emit(rowData);
                }
                else if (this.isMultipleSelectionMode()) {
                    this.selection = [rowData];
                    this.selectionChange.emit(this.selection);
                }
                if (this.dataKey) {
                    this.selectionKeys[String(this.resolveFieldData(rowData, this.dataKey))] = 1;
                    this.preventSelectionKeysPropagation = true;
                }
            }
            this.contextMenu.show(event);
            this.onContextMenuSelect.emit({ originalEvent: event, data: rowData });
        }
    };
    DataTable.prototype.rowDblclick = function (event, rowData) {
        this.onRowDblclick.emit({ originalEvent: event, data: rowData });
    };
    DataTable.prototype.isSingleSelectionMode = function () {
        return this.selectionMode === 'single';
    };
    DataTable.prototype.isMultipleSelectionMode = function () {
        return this.selectionMode === 'multiple';
    };
    DataTable.prototype.findIndexInSelection = function (rowData) {
        var index = -1;
        if (this.selection) {
            for (var i = 0; i < this.selection.length; i++) {
                if (this.equals(rowData, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    DataTable.prototype.isSelected = function (rowData) {
        if (rowData && this.selection) {
            if (this.dataKey) {
                return this.selectionKeys[this.objectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
            }
            else {
                if (this.selection instanceof Array)
                    return this.findIndexInSelection(rowData) > -1;
                else
                    return this.equals(rowData, this.selection);
            }
        }
        return false;
    };
    DataTable.prototype.equals = function (data1, data2) {
        return this.compareSelectionBy === 'equals' ? (data1 === data2) : this.objectUtils.equals(data1, data2, this.dataKey);
    };
    Object.defineProperty(DataTable.prototype, "allSelected", {
        get: function () {
            if (this.headerCheckboxToggleAllPages) {
                return this.selection && this.value && this.selection.length === this.value.length;
            }
            else {
                var val = true;
                if (this.dataToRender && this.selection && (this.dataToRender.length <= this.selection.length)) {
                    for (var _i = 0, _a = this.dataToRender; _i < _a.length; _i++) {
                        var data = _a[_i];
                        if (!this.isSelected(data)) {
                            val = false;
                            break;
                        }
                    }
                }
                else {
                    val = false;
                }
                return val;
            }
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype.onFilterKeyup = function (value, field, matchMode) {
        var _this = this;
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        this.filterTimeout = setTimeout(function () {
            _this.filter(value, field, matchMode);
            _this.filterTimeout = null;
        }, this.filterDelay);
    };
    DataTable.prototype.filter = function (value, field, matchMode) {
        if (!this.isFilterBlank(value))
            this.filters[field] = { value: value, matchMode: matchMode };
        else if (this.filters[field])
            delete this.filters[field];
        this._filter();
    };
    DataTable.prototype.isFilterBlank = function (filter) {
        if (filter !== null && filter !== undefined) {
            if ((typeof filter === 'string' && filter.trim().length == 0) || (filter instanceof Array && filter.length == 0))
                return true;
            else
                return false;
        }
        return true;
    };
    DataTable.prototype._filter = function () {
        this._first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if (!this.value || !this.columns) {
                return;
            }
            this.filteredValue = [];
            for (var i = 0; i < this.value.length; i++) {
                var localMatch = true;
                var globalMatch = false;
                for (var j = 0; j < this.columns.length; j++) {
                    var col = this.columns[j], filterMeta = this.filters[col.filterField || col.field];
                    //local
                    if (filterMeta) {
                        var filterValue = filterMeta.value, filterField = col.filterField || col.field, filterMatchMode = filterMeta.matchMode || 'startsWith', dataFieldValue = this.resolveFieldData(this.value[i], filterField);
                        var filterConstraint = this.filterConstraints[filterMatchMode];
                        if (!filterConstraint(dataFieldValue, filterValue)) {
                            localMatch = false;
                        }
                        if (!localMatch) {
                            break;
                        }
                    }
                    //global
                    if (!col.excludeGlobalFilter && this.globalFilter && !globalMatch) {
                        globalMatch = this.filterConstraints['contains'](this.resolveFieldData(this.value[i], col.filterField || col.field), this.globalFilter.value);
                    }
                }
                var matches = localMatch;
                if (this.globalFilter) {
                    matches = localMatch && globalMatch;
                }
                if (matches) {
                    this.filteredValue.push(this.value[i]);
                }
            }
            if (this.filteredValue.length === this.value.length) {
                this.filteredValue = null;
            }
            if (this.paginator) {
                this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
            }
            this.updateDataToRender(this.filteredValue || this.value);
        }
        this.onFilter.emit({
            filters: this.filters,
            filteredValue: this.filteredValue || this.value
        });
    };
    DataTable.prototype.hasFilter = function () {
        var empty = true;
        for (var prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }
        return !empty || (this.globalFilter && this.globalFilter.value && this.globalFilter.value.trim().length);
    };
    DataTable.prototype.onFilterInputClick = function (event, column) {
        event.stopPropagation();
    };
    DataTable.prototype.switchCellToEditMode = function (cell, column, rowData) {
        var _this = this;
        if (!this.selectionMode && this.editable && column.editable) {
            this.editorClick = true;
            this.bindDocumentEditListener();
            if (cell != this.editingCell) {
                if (this.editingCell && this.domHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length == 0) {
                    this.domHandler.removeClass(this.editingCell, 'ot-ui-cell-editing');
                }
                this.editingCell = cell;
                this.onEditInit.emit({ column: column, data: rowData });
                this.domHandler.addClass(cell, 'ot-ui-cell-editing');
                var focusable_1 = this.domHandler.findSingle(cell, '.ot-ui-cell-editor input');
                if (focusable_1) {
                    setTimeout(function () { return _this.domHandler.invokeElementMethod(focusable_1, 'focus'); }, 50);
                }
            }
        }
    };
    DataTable.prototype.switchCellToViewMode = function (element) {
        this.editingCell = null;
        var cell = this.findCell(element);
        this.domHandler.removeClass(cell, 'ot-ui-cell-editing');
        this.unbindDocumentEditListener();
    };
    DataTable.prototype.closeCell = function () {
        if (this.editingCell) {
            this.domHandler.removeClass(this.editingCell, 'ot-ui-cell-editing');
            this.editingCell = null;
            this.unbindDocumentEditListener();
        }
    };
    DataTable.prototype.bindDocumentEditListener = function () {
        var _this = this;
        if (!this.documentEditListener) {
            this.documentEditListener = this.renderer.listen('document', 'click', function (event) {
                if (!_this.editorClick) {
                    _this.closeCell();
                }
                _this.editorClick = false;
            });
        }
    };
    DataTable.prototype.unbindDocumentEditListener = function () {
        if (this.documentEditListener) {
            this.documentEditListener();
            this.documentEditListener = null;
        }
    };
    DataTable.prototype.onCellEditorKeydown = function (event, column, rowData, rowIndex) {
        if (this.editable) {
            //enter
            if (event.keyCode == 13) {
                if (this.domHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length == 0) {
                    this.switchCellToViewMode(event.target);
                    event.preventDefault();
                }
            }
            //escape
            else if (event.keyCode == 27) {
                this.switchCellToViewMode(event.target);
                event.preventDefault();
            }
            //tab
            else if (event.keyCode == 9) {
                if (event.shiftKey)
                    this.moveToPreviousCell(event);
                else
                    this.moveToNextCell(event);
            }
        }
    };
    DataTable.prototype.onCellEditorInput = function (event, column, rowData, rowIndex) {
        if (this.editable) {
            this.onEdit.emit({ originalEvent: event, column: column, data: rowData, index: rowIndex });
        }
    };
    DataTable.prototype.onCellEditorChange = function (event, column, rowData, rowIndex) {
        if (this.editable) {
            this.editChanged = true;
            this.onEditComplete.emit({ column: column, data: rowData, index: rowIndex });
        }
    };
    DataTable.prototype.onCellEditorBlur = function (event, column, rowData, rowIndex) {
        if (this.editable) {
            if (this.editChanged)
                this.editChanged = false;
            else
                this.onEditCancel.emit({ column: column, data: rowData, index: rowIndex });
        }
    };
    DataTable.prototype.moveToPreviousCell = function (event) {
        var currentCell = this.findCell(event.target);
        var row = currentCell.parentElement;
        var targetCell = this.findPreviousEditableColumn(currentCell);
        if (targetCell) {
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    };
    DataTable.prototype.moveToNextCell = function (event) {
        var currentCell = this.findCell(event.target);
        var row = currentCell.parentElement;
        var targetCell = this.findNextEditableColumn(currentCell);
        if (targetCell) {
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    };
    DataTable.prototype.findPreviousEditableColumn = function (cell) {
        var prevCell = cell.previousElementSibling;
        if (!prevCell) {
            var previousRow = cell.parentElement.previousElementSibling;
            if (previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }
        if (prevCell) {
            if (this.domHandler.hasClass(prevCell, 'ot-ui-editable-column'))
                return prevCell;
            else
                return this.findPreviousEditableColumn(prevCell);
        }
        else {
            return null;
        }
    };
    DataTable.prototype.findNextEditableColumn = function (cell) {
        var nextCell = cell.nextElementSibling;
        if (!nextCell) {
            var nextRow = cell.parentElement.nextElementSibling;
            if (nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }
        if (nextCell) {
            if (this.domHandler.hasClass(nextCell, 'ot-ui-editable-column'))
                return nextCell;
            else
                return this.findNextEditableColumn(nextCell);
        }
        else {
            return null;
        }
    };
    DataTable.prototype.onCustomEditorFocusPrev = function (event) {
        this.moveToPreviousCell(event);
    };
    DataTable.prototype.onCustomEditorFocusNext = function (event) {
        this.moveToNextCell(event);
    };
    DataTable.prototype.findCell = function (element) {
        if (element) {
            var cell = element;
            while (cell && cell.tagName != 'TD') {
                cell = cell.parentElement;
            }
            return cell;
        }
        else {
            return null;
        }
    };
    DataTable.prototype.initResizableColumns = function () {
        this.tbody = this.domHandler.findSingle(this.el.nativeElement, 'tbody.ot-ui-datatable-data');
        this.resizerHelper = this.domHandler.findSingle(this.el.nativeElement, 'div.ot-ui-column-resizer-helper');
        this.fixColumnWidths();
    };
    DataTable.prototype.onDocumentMouseMove = function (event) {
        if (this.columnResizing) {
            this.onColumnResize(event);
        }
    };
    DataTable.prototype.onDocumentMouseUp = function (event) {
        if (this.columnResizing) {
            this.columnResizing = false;
            this.onColumnResizeEnd(event);
        }
    };
    DataTable.prototype.bindColumnResizeEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            window.document.addEventListener('mousemove', _this.onDocumentMouseMove.bind(_this));
        });
        this.documentColumnResizeEndListener = this.renderer.listen('document', 'mouseup', function (event) {
            if (_this.columnResizing) {
                _this.columnResizing = false;
                _this.onColumnResizeEnd(event);
            }
        });
    };
    DataTable.prototype.unbindColumnResizeEvents = function () {
        window.document.removeEventListener('mousemove', this.onDocumentMouseMove);
        if (this.documentColumnResizeEndListener) {
            this.documentColumnResizeEndListener();
            this.documentColumnResizeEndListener = null;
        }
    };
    DataTable.prototype.initColumnResize = function (event) {
        this.bindColumnResizeEvents();
        var container = this.el.nativeElement.children[0];
        var containerLeft = this.domHandler.getOffset(container).left;
        this.resizeColumn = event.target.parentElement;
        this.columnResizing = true;
        this.lastResizerHelperX = (event.pageX - containerLeft + container.scrollLeft);
    };
    DataTable.prototype.onColumnResize = function (event) {
        var container = this.el.nativeElement.children[0];
        var containerLeft = this.domHandler.getOffset(container).left;
        this.domHandler.addClass(container, 'ot-ui-unselectable-text');
        this.resizerHelper.style.height = container.offsetHeight + 'px';
        this.resizerHelper.style.top = 0 + 'px';
        this.resizerHelper.style.left = (event.pageX - containerLeft + container.scrollLeft) + 'px';
        this.resizerHelper.style.display = 'block';
    };
    DataTable.prototype.onColumnResizeEnd = function (event) {
        var delta = this.resizerHelper.offsetLeft - this.lastResizerHelperX;
        var columnWidth = this.resizeColumn.offsetWidth;
        var newColumnWidth = columnWidth + delta;
        var minWidth = this.resizeColumn.style.minWidth || 15;
        if (columnWidth + delta > parseInt(minWidth)) {
            if (this.columnResizeMode === 'fit') {
                var nextColumn = this.resizeColumn.nextElementSibling;
                var nextColumnWidth = nextColumn.offsetWidth - delta;
                if (newColumnWidth > 15 && nextColumnWidth > 15) {
                    this.resizeColumn.style.width = newColumnWidth + 'px';
                    if (nextColumn) {
                        nextColumn.style.width = nextColumnWidth + 'px';
                    }
                    if (this.scrollable) {
                        var colGroup = this.domHandler.findSingle(this.el.nativeElement, 'colgroup.ot-ui-datatable-scrollable-colgroup');
                        var resizeColumnIndex = this.domHandler.index(this.resizeColumn);
                        colGroup.children[resizeColumnIndex].style.width = newColumnWidth + 'px';
                        if (nextColumn) {
                            colGroup.children[resizeColumnIndex + 1].style.width = nextColumnWidth + 'px';
                        }
                    }
                }
            }
            else if (this.columnResizeMode === 'expand') {
                this.tbody.parentElement.style.width = this.tbody.parentElement.offsetWidth + delta + 'px';
                this.resizeColumn.style.width = newColumnWidth + 'px';
                var containerWidth = this.tbody.parentElement.style.width;
                if (this.scrollable) {
                    this.domHandler.findSingle(this.el.nativeElement, '.ot-ui-datatable-scrollable-header-box').children[0].style.width = containerWidth;
                    var colGroup = this.domHandler.findSingle(this.el.nativeElement, 'colgroup.ot-ui-datatable-scrollable-colgroup');
                    var resizeColumnIndex = this.domHandler.index(this.resizeColumn);
                    colGroup.children[resizeColumnIndex].style.width = newColumnWidth + 'px';
                }
                else {
                    this.el.nativeElement.children[0].style.width = containerWidth;
                }
            }
            this.onColResize.emit({
                element: this.resizeColumn,
                delta: delta
            });
        }
        this.resizerHelper.style.display = 'none';
        this.resizeColumn = null;
        this.domHandler.removeClass(this.el.nativeElement.children[0], 'ot-ui-unselectable-text');
        this.unbindColumnResizeEvents();
    };
    DataTable.prototype.fixColumnWidths = function () {
        var columns = this.domHandler.find(this.el.nativeElement, 'th.ot-ui-resizable-column');
        var bodyCols;
        for (var i = 0; i < columns.length; i++) {
            columns[i].style.width = columns[i].offsetWidth + 'px';
        }
        if (this.scrollable) {
            var colGroup = this.domHandler.findSingle(this.el.nativeElement, 'colgroup.ot-ui-datatable-scrollable-colgroup');
            bodyCols = colGroup.children;
            if (bodyCols) {
                for (var i = 0; i < columns.length; i++) {
                    bodyCols[i].style.width = columns[i].offsetWidth + 'px';
                }
            }
        }
    };
    DataTable.prototype.onColumnDragStart = function (event) {
        var _this = this;
        if (this.columnResizing) {
            event.preventDefault();
            return;
        }
        this.draggedColumn = this.findParentHeader(event.target);
        event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
        this.zone.runOutsideAngular(function () {
            window.document.addEventListener('dragover', _this.onColumnDragover.bind(_this));
        });
    };
    DataTable.prototype.onColumnDragover = function (event) {
        var dropHeader = this.findParentHeader(event.target);
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            var container = this.el.nativeElement.children[0];
            var containerOffset = this.domHandler.getOffset(container);
            var dropHeaderOffset = this.domHandler.getOffset(dropHeader);
            if (this.draggedColumn != dropHeader) {
                var targetLeft = dropHeaderOffset.left - containerOffset.left;
                var targetTop = containerOffset.top - dropHeaderOffset.top;
                var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
                this.reorderIndicatorUp.style.top = dropHeaderOffset.top - containerOffset.top - (this.iconHeight - 1) + 'px';
                this.reorderIndicatorDown.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
                if (event.pageX > columnCenter) {
                    this.reorderIndicatorUp.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2)) + 'px';
                    this.reorderIndicatorDown.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2)) + 'px';
                    this.dropPosition = 1;
                }
                else {
                    this.reorderIndicatorUp.style.left = (targetLeft - Math.ceil(this.iconWidth / 2)) + 'px';
                    this.reorderIndicatorDown.style.left = (targetLeft - Math.ceil(this.iconWidth / 2)) + 'px';
                    this.dropPosition = -1;
                }
                this.reorderIndicatorUp.style.display = 'block';
                this.reorderIndicatorDown.style.display = 'block';
            }
            else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    };
    DataTable.prototype.onColumnDragleave = function (event) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            this.reorderIndicatorUp.style.display = 'none';
            this.reorderIndicatorDown.style.display = 'none';
            window.document.removeEventListener('dragover', this.onColumnDragover);
        }
    };
    DataTable.prototype.onColumnDrop = function (event) {
        event.preventDefault();
        if (this.draggedColumn) {
            var dragIndex = this.domHandler.index(this.draggedColumn);
            var dropIndex = this.domHandler.index(this.findParentHeader(event.target));
            var allowDrop = (dragIndex != dropIndex);
            if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }
            if (allowDrop) {
                this.objectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                if (this.scrollable) {
                    this.initScrollableColumns();
                }
                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
            }
            this.reorderIndicatorUp.style.display = 'none';
            this.reorderIndicatorDown.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    };
    DataTable.prototype.initColumnReordering = function () {
        this.reorderIndicatorUp = this.domHandler.findSingle(this.el.nativeElement.children[0], 'span.ot-ui-datatable-reorder-indicator-up');
        this.reorderIndicatorDown = this.domHandler.findSingle(this.el.nativeElement.children[0], 'span.ot-ui-datatable-reorder-indicator-down');
        this.iconWidth = this.domHandler.getHiddenElementOuterWidth(this.reorderIndicatorUp);
        this.iconHeight = this.domHandler.getHiddenElementOuterHeight(this.reorderIndicatorUp);
    };
    DataTable.prototype.findParentHeader = function (element) {
        if (element.nodeName == 'TH') {
            return element;
        }
        else {
            var parent_1 = element.parentElement;
            while (parent_1.nodeName != 'TH') {
                parent_1 = parent_1.parentElement;
                if (!parent_1)
                    break;
            }
            return parent_1;
        }
    };
    DataTable.prototype.hasFooter = function () {
        if (this.footerColumnGroups.first) {
            return true;
        }
        else {
            if (this.columns) {
                for (var i = 0; i < this.columns.length; i++) {
                    if (this.columns[i].footer || this.columns[i].footerTemplate) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    DataTable.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataTable.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.virtualScroll ? this.rows * 2 : this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.globalFilter ? this.globalFilter.value : null,
            multiSortMeta: this.multiSortMeta
        };
    };
    DataTable.prototype.toggleRow = function (row, event) {
        if (!this.expandedRows) {
            this.expandedRows = [];
        }
        var expandedRowIndex = this.findExpandedRowIndex(row);
        if (expandedRowIndex != -1) {
            this.expandedRows.splice(expandedRowIndex, 1);
            this.onRowCollapse.emit({
                originalEvent: event,
                data: row
            });
        }
        else {
            if (this.rowExpandMode === 'single') {
                this.expandedRows = [];
            }
            this.expandedRows.push(row);
            this.onRowExpand.emit({
                originalEvent: event,
                data: row
            });
        }
        if (event) {
            event.preventDefault();
        }
    };
    DataTable.prototype.findExpandedRowIndex = function (row) {
        var index = -1;
        if (this.expandedRows) {
            for (var i = 0; i < this.expandedRows.length; i++) {
                if (this.expandedRows[i] == row) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    DataTable.prototype.isRowExpanded = function (row) {
        return this.findExpandedRowIndex(row) != -1;
    };
    DataTable.prototype.findExpandedRowGroupIndex = function (row) {
        var index = -1;
        if (this.expandedRowsGroups && this.expandedRowsGroups.length) {
            for (var i = 0; i < this.expandedRowsGroups.length; i++) {
                var group = this.expandedRowsGroups[i];
                var rowGroupField = this.resolveFieldData(row, this.groupField);
                if (rowGroupField === group) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    DataTable.prototype.isRowGroupExpanded = function (row) {
        return this.findExpandedRowGroupIndex(row) != -1;
    };
    DataTable.prototype.toggleRowGroup = function (event, row) {
        if (!this.expandedRowsGroups) {
            this.expandedRowsGroups = [];
        }
        this.rowGroupToggleClick = true;
        var index = this.findExpandedRowGroupIndex(row);
        var rowGroupField = this.resolveFieldData(row, this.groupField);
        if (index >= 0) {
            this.expandedRowsGroups.splice(index, 1);
            this.onRowGroupCollapse.emit({
                originalEvent: event,
                group: rowGroupField
            });
        }
        else {
            if (this.rowGroupExpandMode === 'single') {
                this.expandedRowsGroups = [];
            }
            this.expandedRowsGroups.push(rowGroupField);
            this.onRowGroupExpand.emit({
                originalEvent: event,
                group: rowGroupField
            });
        }
        event.preventDefault();
    };
    DataTable.prototype.reset = function () {
        this._sortField = null;
        this._sortOrder = 1;
        this.filteredValue = null;
        this.filters = {};
        this._first = 0;
        this.firstChange.emit(this._first);
        this.updateTotalRecords();
        /** Below two lines added as fix for resetting custom paginator */
        this.paginatorComponent.changePageToFirst();
        this.paginatorElement['activePage'] = 1;
        if (this.lazy)
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        else
            this.updateDataToRender(this.value);
    };
    DataTable.prototype.exportCSV = function (options) {
        var _this = this;
        var data = this.filteredValue || this.value;
        var csv = '\ufeff';
        if (options && options.selectionOnly) {
            data = this.selection || [];
        }
        //headers
        for (var i = 0; i < this.columns.length; i++) {
            var column = this.columns[i];
            if (column.exportable && column.field) {
                csv += '"' + (column.header || column.field) + '"';
                if (i < (this.columns.length - 1)) {
                    csv += this.csvSeparator;
                }
            }
        }
        //body
        data.forEach(function (record, i) {
            csv += '\n';
            for (var i_1 = 0; i_1 < _this.columns.length; i_1++) {
                var column = _this.columns[i_1];
                if (column.exportable && column.field) {
                    var fieldValue = _this.resolveFieldData(record, column.field) ? _this.resolveFieldData(record, column.field) : "";
                    fieldValue = fieldValue.toString().replace(/"/g, '""');
                    csv += '"' + fieldValue + '"';
                    if (i_1 < (_this.columns.length - 1)) {
                        csv += _this.csvSeparator;
                    }
                }
            }
        });
        var blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
        });
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, this.exportFilename + '.csv');
        }
        else {
            var link = document.createElement("a");
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', this.exportFilename + '.csv');
                link.click();
            }
            else {
                csv = 'data:text/csv;charset=utf-8,' + csv;
                window.open(encodeURI(csv));
            }
            document.body.removeChild(link);
        }
    };
    DataTable.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    DataTable.prototype.getRowStyleClass = function (rowData, rowIndex) {
        var styleClass = 'ot-ui-widget-content';
        if (this.rowStyleClass) {
            var rowClass = this.rowStyleClass.call(this, rowData, rowIndex);
            if (rowClass) {
                styleClass += ' ' + rowClass;
            }
        }
        else if (this.rowStyleMap && this.dataKey) {
            var rowClass = this.rowStyleMap[rowData[this.dataKey]];
            if (rowClass) {
                styleClass += ' ' + rowClass;
            }
        }
        return styleClass;
    };
    DataTable.prototype.visibleColumns = function () {
        return this.columns ? this.columns.filter(function (c) { return !c.hidden; }) : [];
    };
    Object.defineProperty(DataTable.prototype, "containerWidth", {
        get: function () {
            if (this.scrollable) {
                if (this.scrollWidth) {
                    return this.scrollWidth;
                }
                else if (this.frozenWidth && this.unfrozenWidth) {
                    return parseFloat(this.frozenWidth) + parseFloat(this.unfrozenWidth) + 'px';
                }
            }
            else {
                return this.style ? this.style.width : null;
            }
        },
        enumerable: true,
        configurable: true
    });
    DataTable.prototype.hasFrozenColumns = function () {
        return this.frozenColumns && this.frozenColumns.length > 0;
    };
    DataTable.prototype.ngOnDestroy = function () {
        //remove event listener
        if (this.globalFilterFunction) {
            this.globalFilterFunction();
        }
        if (this.resizableColumns) {
            this.unbindColumnResizeEvents();
        }
        this.unbindDocumentEditListener();
        if (this.columnsSubscription) {
            this.columnsSubscription.unsubscribe();
        }
        if (this.virtualScrollCallback) {
            this.virtualScrollCallback = null;
        }
    };
    DataTable.prototype.onRowDragStart = function (event, index) {
        this.rowDragging = true;
        this.draggedRowIndex = index;
        event.dataTransfer.setData('text', 'b'); // For firefox
    };
    DataTable.prototype.onRowDragEnd = function (event) {
        this.rowDragging = false;
        this.draggedRowIndex = null;
        this.droppedRowIndex = null;
    };
    DataTable.prototype.onRowDragOver = function (event, index, rowElement) {
        if (this.rowDragging && this.draggedRowIndex !== index) {
            var rowY = DomHandler.getOffset(rowElement).top + DomHandler.getWindowScrollTop();
            var pageY = event.pageY;
            var rowMidY = rowY + DomHandler.getOuterHeight(rowElement) / 2;
            var prevRowElement = rowElement.previousElementSibling;
            if (pageY < rowMidY) {
                DomHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');
                this.droppedRowIndex = index;
                if (prevRowElement)
                    DomHandler.addClass(prevRowElement, 'ui-table-dragpoint-bottom');
                else
                    DomHandler.addClass(rowElement, 'ui-table-dragpoint-top');
            }
            else {
                if (prevRowElement)
                    DomHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
                else
                    DomHandler.addClass(rowElement, 'ui-table-dragpoint-top');
                this.droppedRowIndex = index + 1;
                DomHandler.addClass(rowElement, 'ui-table-dragpoint-bottom');
            }
        }
    };
    DataTable.prototype.onRowDragLeave = function (event, rowElement) {
        var prevRowElement = rowElement.previousElementSibling;
        if (prevRowElement) {
            DomHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
        }
        DomHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');
        DomHandler.removeClass(rowElement, 'ui-table-dragpoint-top');
    };
    DataTable.prototype.onRowDrop = function (event, rowElement) {
        if (this.droppedRowIndex != null) {
            var dropIndex = (this.draggedRowIndex > this.droppedRowIndex) ? this.droppedRowIndex : (this.droppedRowIndex === 0) ? 0 : this.droppedRowIndex - 1;
            //  console.log("value"+this.value);
            ObjectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);
            this.onRowReorder.emit({
                dragIndex: this.draggedRowIndex,
                dropIndex: dropIndex
            });
        }
        //cleanup
        this.onRowDragLeave(event, rowElement);
        this.onRowDragEnd(event);
    };
    __decorate([
        ViewChild("paginatorElement"),
        __metadata("design:type", ElementRef)
    ], DataTable.prototype, "paginatorElement", void 0);
    __decorate([
        ViewChild(Paginator),
        __metadata("design:type", Paginator)
    ], DataTable.prototype, "paginatorComponent", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onRowReorder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "paginator", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], DataTable.prototype, "rows", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], DataTable.prototype, "pageLinks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DataTable.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "responsive", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "stacked", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "selectionMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "sortByDefault", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "order", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "selectionChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "editable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "showHeaderCheckbox", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onRowClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onRowSelect", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onRowUnselect", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onRowDblclick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onHeaderCheckboxToggle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "headerCheckboxToggleAllPages", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onContextMenuSelect", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], DataTable.prototype, "filterDelay", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "lazy", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onLazyLoad", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "resizableColumns", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "columnResizeMode", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onColResize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "reorderableColumns", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onColReorder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "scrollable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "virtualScroll", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DataTable.prototype, "scrollHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DataTable.prototype, "scrollWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DataTable.prototype, "frozenWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DataTable.prototype, "unfrozenWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DataTable.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DataTable.prototype, "tableStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "tableStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DataTable.prototype, "globalFilter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "sortMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], DataTable.prototype, "defaultSortOrder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "groupField", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DataTable.prototype, "contextMenu", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "csvSeparator", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "exportFilename", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "emptyMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "paginatorPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "alwaysShowPaginator", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "metaKeySelection", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], DataTable.prototype, "rowTrackBy", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "immutable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DataTable.prototype, "frozenValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "compareSelectionBy", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onEditInit", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onEditComplete", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onEdit", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onEditCancel", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onPage", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onSort", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onFilter", void 0);
    __decorate([
        ContentChild(Header),
        __metadata("design:type", Object)
    ], DataTable.prototype, "header", void 0);
    __decorate([
        ContentChild(Footer),
        __metadata("design:type", Object)
    ], DataTable.prototype, "footer", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "expandableRows", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DataTable.prototype, "expandedRows", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "expandableRowGroups", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "rowExpandMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DataTable.prototype, "expandedRowsGroups", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "expandedIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "collapsedIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], DataTable.prototype, "tabindex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], DataTable.prototype, "rowStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DataTable.prototype, "rowStyleMap", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "rowGroupMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "sortableRowGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "sortFile", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "rowHover", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DataTable.prototype, "filters", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "dataKey", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataTable.prototype, "loading", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "loadingIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], DataTable.prototype, "virtualScrollDelay", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataTable.prototype, "rowGroupExpandMode", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "valueChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "firstChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onRowExpand", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onRowCollapse", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onRowGroupExpand", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataTable.prototype, "onRowGroupCollapse", void 0);
    __decorate([
        ContentChildren(PrimeTemplate),
        __metadata("design:type", QueryList)
    ], DataTable.prototype, "templates", void 0);
    __decorate([
        ContentChildren(Column),
        __metadata("design:type", QueryList)
    ], DataTable.prototype, "cols", void 0);
    __decorate([
        ContentChildren(HeaderColumnGroup),
        __metadata("design:type", QueryList)
    ], DataTable.prototype, "headerColumnGroups", void 0);
    __decorate([
        ContentChildren(FooterColumnGroup),
        __metadata("design:type", QueryList)
    ], DataTable.prototype, "footerColumnGroups", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DataTable.prototype, "locale", null);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DataTable.prototype, "multiSortMeta", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], DataTable.prototype, "sortField", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTable.prototype, "sortOrder", null);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DataTable.prototype, "value", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTable.prototype, "first", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTable.prototype, "totalRecords", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DataTable.prototype, "selection", null);
    DataTable = __decorate([
        Component({
            selector: 'ot-dataTable',
            template: "\r\n        <div [ngStyle]=\"style\" [class]=\"styleClass\" [style.width]=\"containerWidth\"\r\n        [ngClass]=\"{'ot-ui-datatable ot-ui-widget':true,'ot-ui-datatable-reflow':responsive,'ot-ui-datatable-stacked':stacked,'ot-ui-datatable-resizable':resizableColumns,'ot-ui-datatable-scrollable':scrollable}\">\r\n        <div class=\"ot-ui-datatable-loading ot-ui-widget-overlay\" *ngIf=\"loading\"></div>\r\n        <div class=\"ot-ui-datatable-loading-content\" *ngIf=\"loading\">\r\n            <i [class]=\"'ot-fa ot-fa-spin ot-fa-2x ' + loadingIcon\"></i>\r\n        </div>\r\n        <div class=\"ot-ui-datatable-header ot-ui-widget-header\" *ngIf=\"header\">\r\n            <ng-content select=\"ot-header\"></ng-content>\r\n        </div>\r\n        <ot-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ot-ui-paginator-top\" [alwaysShow]=\"alwaysShowPaginator\"\r\n            (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"></ot-paginator>\r\n        <div class=\"ot-ui-datatable-tablewrapper\" *ngIf=\"!scrollable\">\r\n            <table [ngClass]=\"tableStyleClass\" [ngStyle]=\"tableStyle\">\r\n                <thead class=\"ot-ui-datatable-thead\">\r\n                    <tr *ngIf=\"!headerColumnGroups.first\" class=\"ot-ui-state-default\" [pColumnHeaders]=\"columns\"></tr>\r\n                    <ng-template [ngIf]=\"headerColumnGroups.first\">\r\n                        <tr *ngFor=\"let headerRow of headerColumnGroups.first.rows\" class=\"ot-ui-state-default\" [pColumnHeaders]=\"headerRow.columns\"></tr>\r\n                    </ng-template>\r\n                </thead>\r\n                <tfoot *ngIf=\"hasFooter()\" class=\"ot-ui-datatable-tfoot\">\r\n                    <tr *ngIf=\"!footerColumnGroups.first\" class=\"ot-ui-state-default\" [pColumnFooters]=\"columns\"></tr>\r\n                    <ng-template [ngIf]=\"footerColumnGroups.first\">\r\n                        <tr *ngFor=\"let footerRow of footerColumnGroups.first.rows\" class=\"ot-ui-state-default\" [pColumnFooters]=\"footerRow.columns\"></tr>\r\n                    </ng-template>\r\n                </tfoot>\r\n                <tbody [ngClass]=\"{'ot-ui-datatable-data ot-ui-widget-content': true, 'ot-ui-datatable-hoverable-rows': (rowHover||selectionMode)}\" [pTableBody]=\"columns\" [data]=\"dataToRender\"></tbody>\r\n            </table>\r\n        </div>\r\n        \r\n        <ng-template [ngIf]=\"scrollable\">\r\n            <div class=\"ot-ui-datatable-scrollable-wrapper ot-ui-helper-clearfix\">\r\n                <div *ngIf=\"hasFrozenColumns()\" [pScrollableView]=\"frozenColumns\" frozen=\"true\"\r\n                    [headerColumnGroup]=\"frozenHeaderColumnGroup\" [footerColumnGroup]=\"frozenFooterColumnGroup\"\r\n                    [ngStyle]=\"{'width':this.frozenWidth}\" class=\"ot-ui-datatable-scrollable-view ot-ui-datatable-frozen-view\"></div>\r\n                <div [pScrollableView]=\"scrollableColumns\" [ngStyle]=\"{'width':this.unfrozenWidth, 'left': this.frozenWidth}\"\r\n                    [headerColumnGroup]=\"scrollableHeaderColumnGroup\" [footerColumnGroup]=\"scrollableFooterColumnGroup\"\r\n                    class=\"ot-ui-datatable-scrollable-view\" [virtualScroll]=\"virtualScroll\" (onVirtualScroll)=\"onVirtualScroll($event)\"\r\n                    [ngClass]=\"{'ot-ui-datatable-unfrozen-view': hasFrozenColumns()}\"></div>\r\n            </div>\r\n        </ng-template>\r\n        \r\n        <ot-paginator #paginatorElement [rows]=\"rows\" [first]=\"first\" [locale]=\"_language\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ot-ui-paginator-bottom\" [alwaysShow]=\"alwaysShowPaginator\"\r\n            (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"></ot-paginator>\r\n        <div class=\"ot-ui-datatable-footer ot-ui-widget-header\" *ngIf=\"footer\">\r\n            <ng-content select=\"ot-footer\"></ng-content>\r\n        </div>\r\n        \r\n        <div class=\"ot-ui-column-resizer-helper ot-ui-state-highlight\" style=\"display:none\"></div>\r\n        <span class=\"ot-fa ot-fa-arrow-down ot-ui-datatable-reorder-indicator-up\" style=\"position: absolute; display: none;\"></span>\r\n        <span class=\"ot-fa ot-fa-arrow-up ot-ui-datatable-reorder-indicator-down\" style=\"position: absolute; display: none;\"></span>\r\n    </div>",
            providers: [DomHandler, ObjectUtils]
        }),
        __metadata("design:paramtypes", [ElementRef, DomHandler, IterableDiffers,
            Renderer2, ChangeDetectorRef, ObjectUtils,
            NgZone])
    ], DataTable);
    return DataTable;
}());
export { DataTable };
var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
var ReorderableRowHandle = /** @class */ (function () {
    function ReorderableRowHandle(el) {
        this.el = el;
    }
    ReorderableRowHandle.prototype.ngAfterViewInit = function () {
        DomHandler.addClass(this.el.nativeElement, 'ui-table-reorderablerow-handle');
    };
    __decorate([
        Input("pReorderableRowHandle"),
        __metadata("design:type", Number)
    ], ReorderableRowHandle.prototype, "index", void 0);
    ReorderableRowHandle = __decorate([
        Directive({
            selector: '[pReorderableRowHandle]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], ReorderableRowHandle);
    return ReorderableRowHandle;
}());
export { ReorderableRowHandle };
var ReorderableRow = /** @class */ (function () {
    function ReorderableRow(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ReorderableRow.prototype.ngAfterViewInit = function () {
        if (this.isEnabled()) {
            this.el.nativeElement.droppable = true;
            this.bindEvents();
        }
    };
    ReorderableRow.prototype.bindEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.mouseDownListener = _this.onMouseDown.bind(_this);
            _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
            _this.dragStartListener = _this.onDragStart.bind(_this);
            _this.el.nativeElement.addEventListener('dragstart', _this.dragStartListener);
            _this.dragEndListener = _this.onDragEnd.bind(_this);
            _this.el.nativeElement.addEventListener('dragend', _this.dragEndListener);
            _this.dragOverListener = _this.onDragOver.bind(_this);
            _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
            _this.dragLeaveListener = _this.onDragLeave.bind(_this);
            _this.el.nativeElement.addEventListener('dragleave', _this.dragLeaveListener);
        });
    };
    ReorderableRow.prototype.unbindEvents = function () {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }
        if (this.dragStartListener) {
            document.removeEventListener('dragstart', this.dragStartListener);
            this.dragStartListener = null;
        }
        if (this.dragEndListener) {
            document.removeEventListener('dragend', this.dragEndListener);
            this.dragEndListener = null;
        }
        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }
        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    };
    ReorderableRow.prototype.onMouseDown = function (event) {
        if (DomHandler.hasClass(event.target, 'ui-table-reorderablerow-handle'))
            this.el.nativeElement.draggable = true;
        else
            this.el.nativeElement.draggable = false;
    };
    ReorderableRow.prototype.onDragStart = function (event) {
        this.dt.onRowDragStart(event, this.index);
    };
    ReorderableRow.prototype.onDragEnd = function (event) {
        this.dt.onRowDragEnd(event);
        this.el.nativeElement.draggable = false;
    };
    ReorderableRow.prototype.onDragOver = function (event) {
        this.dt.onRowDragOver(event, this.index, this.el.nativeElement);
        event.preventDefault();
    };
    ReorderableRow.prototype.onDragLeave = function (event) {
        this.dt.onRowDragLeave(event, this.el.nativeElement);
    };
    ReorderableRow.prototype.isEnabled = function () {
        return this.pReorderableRowDisabled !== true;
    };
    ReorderableRow.prototype.onDrop = function (event) {
        if (this.isEnabled() && this.dt.rowDragging) {
            this.dt.onRowDrop(event, this.el.nativeElement);
        }
        event.preventDefault();
    };
    __decorate([
        Input("pReorderableRow"),
        __metadata("design:type", Number)
    ], ReorderableRow.prototype, "index", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ReorderableRow.prototype, "pReorderableRowDisabled", void 0);
    __decorate([
        HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ReorderableRow.prototype, "onDrop", null);
    ReorderableRow = __decorate([
        Directive({
            selector: '[pReorderableRow]'
        }),
        __metadata("design:paramtypes", [DataTable, ElementRef, NgZone])
    ], ReorderableRow);
    return ReorderableRow;
}());
export { ReorderableRow };
var ɵ0 = DEFAULT_PERFECT_SCROLLBAR_CONFIG;
var DataTableModule = /** @class */ (function () {
    function DataTableModule() {
    }
    DataTableModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule, OtPaginatorModule, FormsModule, PerfectScrollbarModule],
            exports: [DataTable, SharedModule, ReorderableRowHandle, ReorderableRow],
            declarations: [DataTable, DTRadioButton, DTCheckbox, ColumnHeaders, ColumnFooters, TableBody, ScrollableView, RowExpansionLoader, ReorderableRowHandle, ReorderableRow],
            providers: [
                {
                    provide: PERFECT_SCROLLBAR_CONFIG,
                    useValue: ɵ0
                }
            ]
        })
    ], DataTableModule);
    return DataTableModule;
}());
export { DataTableModule };
export { ɵ0 };
//# sourceMappingURL=datatable.js.map
import { ElementRef, EventEmitter, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { SelectItem } from '../common/selectitem';
export interface PaginatorLocaleSettings {
    about?: string;
    items?: string;
}
export declare class Paginator implements AfterViewInit, OnInit {
    private ref;
    private _elRef;
    constructor(ref: ChangeDetectorRef, _elRef: ElementRef);
    paginatorConatainer: ElementRef;
    paginatorControl: ElementRef;
    availableWidth: number;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    ngOnInit(): void;
    onResize(event: any): void;
    pageLinkSize: number;
    onPageChange: EventEmitter<any>;
    style: any;
    styleClass: string;
    alwaysShow: boolean;
    pageLinks: number[];
    _totalRecords: number;
    _first: number;
    _rows: number;
    _rowsPerPageOptions: number[];
    rowsPerPageItems: SelectItem[];
    start: number;
    end: number;
    activePage: number;
    _locale: PaginatorLocaleSettings;
    _language: string;
    totalRecords: number;
    first: number;
    rows: number;
    rowsPerPageOptions: number[];
    locale: any;
    isFirstPage(): boolean;
    isLastPage(): boolean;
    getPageCount(): number;
    calculatePageLinkBoundaries(): number[];
    updatePageLinks(): void;
    changePage(p: number): void;
    getPage(): number;
    changePageToFirst(event?: any): void;
    changePageToPrev(event: any): void;
    changePageToNext(event: any): void;
    changePageToLast(event: any): void;
    onPageLinkClick(event: any, page: any): void;
    onRppChange(event: any): void;
}
export declare class OtPaginatorModule {
}

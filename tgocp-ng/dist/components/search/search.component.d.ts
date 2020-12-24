import { EventEmitter, ElementRef } from '@angular/core';
export declare class SearchComponent {
    searchInput: ElementRef;
    container: ElementRef;
    onSearch: EventEmitter<any>;
    isEnabled: EventEmitter<any>;
    placeholder: string;
    disableOnBlur: boolean;
    docClickHandlerRef: any;
    data: string;
    showClearIcon: string;
    searchEnabled: boolean;
    divClickHandler(event: any): void;
    documentClickHandler(event: any): void;
    showOrHideClearIcon(): void;
    searchEnabledAnimation(): any;
    onClear(): void;
    enableSearch(): void;
    disableSearch(): void;
    onEnterFn(): void;
    onSearchFn(): void;
}
export declare class SearchModule {
}

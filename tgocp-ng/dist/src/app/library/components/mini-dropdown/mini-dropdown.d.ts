import { ElementRef, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy, Renderer2, EventEmitter, QueryList, TemplateRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { SelectItem } from '../common/selectitem';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
import { ControlValueAccessor } from '@angular/forms';
export declare const DROPDOWN_VALUE_ACCESSOR: any;
export declare class MiniDropdown implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy, ControlValueAccessor {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    private cd;
    objectUtils: ObjectUtils;
    zone: NgZone;
    scrollHeight: string;
    filter: boolean;
    name: string;
    style: any;
    panelStyle: any;
    styleClass: string;
    panelStyleClass: string;
    disabled: boolean;
    readonly: boolean;
    autoWidth: boolean;
    required: boolean;
    editable: boolean;
    appendTo: any;
    tabindex: number;
    placeholder: string;
    filterPlaceholder: string;
    inputId: string;
    dataKey: string;
    filterBy: string;
    lazy: boolean;
    autofocus: boolean;
    resetFilterOnHide: boolean;
    dropdownIcon: string;
    optionLabel: string;
    onChange: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    containerViewChild: ElementRef;
    panelViewChild: ElementRef;
    itemsWrapperViewChild: ElementRef;
    filterViewChild: ElementRef;
    focusViewChild: ElementRef;
    editableInputViewChild: ElementRef;
    templates: QueryList<any>;
    itemTemplate: TemplateRef<any>;
    selectedOption: any;
    _options: any[];
    value: any;
    onModelChange: Function;
    onModelTouched: Function;
    optionsToDisplay: any[];
    hover: boolean;
    focus: boolean;
    panelVisible: boolean;
    shown: boolean;
    documentClickListener: any;
    optionsChanged: boolean;
    panel: HTMLDivElement;
    container: HTMLDivElement;
    itemsWrapper: HTMLDivElement;
    initialized: boolean;
    selfClick: boolean;
    itemClick: boolean;
    hoveredItem: any;
    selectedOptionUpdated: boolean;
    filterValue: string;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2, cd: ChangeDetectorRef, objectUtils: ObjectUtils, zone: NgZone);
    ngAfterContentInit(): void;
    ngOnInit(): void;
    options: any[];
    ngAfterViewInit(): void;
    readonly label: string;
    updateEditableLabel(): void;
    onItemClick(event: any, option: any): void;
    selectItem(event: any, option: any): void;
    ngAfterViewChecked(): void;
    writeValue(value: any): void;
    resetFilter(): void;
    updateSelectedOption(val: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    updateDimensions(): void;
    onMouseclick(event: any): void;
    onEditableInputClick(event: any): void;
    onEditableInputFocus(event: any): void;
    onEditableInputChange(event: any): void;
    onShow(): void;
    show(): void;
    hide(): void;
    alignPanel(): void;
    onInputFocus(event: any): void;
    onInputBlur(event: any): void;
    onKeydown(event: any): void;
    findOptionIndex(val: any, opts: SelectItem[]): number;
    findOption(val: any, opts: SelectItem[]): SelectItem;
    onFilter(event: any): void;
    activateFilter(): void;
    applyFocus(): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    ngOnDestroy(): void;
}
export declare class MiniDropdownModule {
}

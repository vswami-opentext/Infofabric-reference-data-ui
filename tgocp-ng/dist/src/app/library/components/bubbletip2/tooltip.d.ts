import { ElementRef, OnDestroy, Renderer2, TemplateRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class Bubbletip2 implements OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    tooltipTemplate: TemplateRef<any>;
    tooltipPosition: string;
    tooltipEvent: string;
    appendTo: any;
    positionStyle: string;
    tooltipStyleClass: string;
    tooltipZIndex: string;
    disabled: boolean;
    escape: boolean;
    showDelay: number;
    hideDelay: number;
    container: any;
    styleClass: string;
    tooltipText: any;
    showTimeout: any;
    hideTimeout: any;
    documentResizeListener: Function;
    active: boolean;
    _text: string;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2);
    onMouseEnter(): void;
    onMouseLeave(): void;
    onFocus(): void;
    onBlur(): void;
    activate(): void;
    deactivate(): void;
    text: string;
    create(): void;
    show(): void;
    hide(): void;
    updateText(): void;
    align(): void;
    getHostOffset(): {
        left: any;
        top: any;
    };
    alignRight(): void;
    alignLeft(): void;
    alignTop(): void;
    alignBottom(): void;
    preAlign(): void;
    isOutOfBounds(): boolean;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    destroy(): void;
    ngOnDestroy(): void;
}
export declare class Bubbletip2Module {
}

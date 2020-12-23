import { ElementRef, EventEmitter } from '@angular/core';
export declare class ClickOutsideDirective {
    private elementRef;
    constructor(elementRef: ElementRef);
    otClickOutside: EventEmitter<MouseEvent>;
    onClick(event: MouseEvent, targetElement: HTMLElement): void;
}

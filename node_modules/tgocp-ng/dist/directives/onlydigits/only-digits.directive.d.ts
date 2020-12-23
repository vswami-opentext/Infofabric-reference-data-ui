import { ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
export declare class OnlyDigitsDirective {
    private el;
    private renderer;
    private control;
    constructor(el: ElementRef, renderer: Renderer2, control: NgControl);
    /**old Code start---- */
    /**old Code end---- */
    onInputChange(event: any): void;
}

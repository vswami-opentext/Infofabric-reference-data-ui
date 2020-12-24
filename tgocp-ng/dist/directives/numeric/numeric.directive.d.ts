import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
export declare class NumericDirective implements OnInit {
    private el;
    private renderer;
    private control;
    allowDecimals: boolean;
    allowSign: boolean;
    decimalSeparator: string;
    previousValue: string;
    integerUnsigned: string;
    integerSigned: string;
    decimalUnsigned: string;
    decimalSigned: string;
    private regex;
    constructor(el: ElementRef, renderer: Renderer2, control: NgControl);
    ngOnInit(): void;
    onInputChange(event: KeyboardEvent): void;
    /**
     * Event handler for host's blur event
     * */
    onBlur(): void;
    checkPaste(e: Event): void;
    validateValue(value: string): void;
}
export declare class NumericModule {
}

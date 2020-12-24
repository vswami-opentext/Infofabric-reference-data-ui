import { ElementRef, Renderer2 } from "@angular/core";
export declare class RestrictSpecialCharDirective {
    private el;
    private renderer;
    constructor(el: ElementRef, renderer: Renderer2);
    patternType: string;
    address_line: RegExp;
    postal_code: string;
    state: string;
    name: string;
    fax: string;
    extension: string;
    telephone: string;
    email: RegExp;
    website: string;
    company_number: string;
    number_format: string;
    attention: string;
    onBlur(event: any): void;
    onInput(event: KeyboardEvent): void;
    onPaste(event: any): void;
    testPattern(input: any): boolean;
}
export declare class RestrictSpecialCharModule {
}

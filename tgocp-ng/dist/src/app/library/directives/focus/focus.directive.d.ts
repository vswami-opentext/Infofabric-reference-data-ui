import { ElementRef, OnInit } from '@angular/core';
export declare class FocusDirective implements OnInit {
    private hostElement;
    constructor(hostElement: ElementRef);
    isFocused: boolean;
    ngOnInit(): void;
}
export declare class FocusModule {
}

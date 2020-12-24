import { ElementRef } from "@angular/core";
import { DomHandler } from "../dom/domhandler";
export declare class BubbleTip {
    private el;
    private domHandler;
    private bubbletip;
    position: string;
    linkStyle: string;
    visible: boolean;
    constructor(el: ElementRef, domHandler: DomHandler);
    private highlight;
    divClicked(): void;
    handleClick(event: Event): void;
    ngAfterContentInit(): void;
}
export declare class BubbleTipModule {
}

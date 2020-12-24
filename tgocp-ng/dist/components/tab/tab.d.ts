import { ElementRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class Tab {
    domHandler: DomHandler;
    parentContainer: ElementRef;
    tabNavContainer: ElementRef;
    tabNavItemsContainer: ElementRef;
    activeIndicator: ElementRef;
    activeInicatorHelper: ElementRef;
    theme: string;
    border: boolean;
    align: string;
    private last_known_scroll_position;
    private ticking;
    private SETTINGS;
    constructor(domHandler: DomHandler);
    ngAfterViewInit(): void;
    selectActiveElement(): any;
    moveIndicator(item: any): void;
    activeElementHandler(event: any): void;
    leftNavBtnClick(): void;
    rightNavBtnClick(): void;
    contentTransitionFn(): void;
    checkOverflow(): void;
    scrollEventListener(): void;
    determineOverflow(container: any, content: any): "none" | "left" | "right" | "both";
}
export declare class TabModule {
}

import { OnInit, EventEmitter, ElementRef } from '@angular/core';
export declare class HomepageHeaderComponent implements OnInit {
    el: ElementRef;
    constructor(el: ElementRef);
    myProfileActive: boolean;
    profileImageSrc: any;
    clickOn: EventEmitter<string>;
    ngOnInit(): void;
    myProfileClick(): void;
    clicked(button: string): void;
    handleClick(event: Event): void;
}
export declare class HomePageHeaderModule {
}

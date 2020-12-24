import { ElementRef, TemplateRef, EventEmitter, OnChanges } from '@angular/core';
import { HamburgerMenuType } from './hamburger.menu.entity';
import { TGOCPNGService } from '../modal/modal';
import { DialogService } from '../dynamic-dialog/dialogservice';
export declare class HamburgerComponent implements OnChanges {
    el: ElementRef;
    private uiModal;
    psConfig: any;
    constructor(el: ElementRef, uiModal: TGOCPNGService);
    header: string;
    headerClass: string;
    menuStyle: any;
    iconClass: string;
    hamburgerMenuTemplate: TemplateRef<any>;
    menuData: HamburgerMenuType[];
    clickOperation: EventEmitter<any>;
    id: any;
    status: boolean;
    enableContent: boolean;
    showContent: boolean;
    menubarHeight: number;
    menubarStartPostion: number;
    showFeedback: boolean;
    subject: string;
    comments: any;
    feedbackData: any;
    handleClick(event: Event): void;
    activeState(id: any): void;
    ngOnChanges(): void;
    clicked(event: any): void;
    onClickedOutside($event: any): void;
    hideModal(): void;
    feedback(event: any): void;
}
export declare class MenuTree {
    private uiModal;
    dialogueService: DialogService;
    constructor(uiModal: TGOCPNGService, dialogueService: DialogService);
    node: any;
    urlClicked: EventEmitter<any>;
    expandChildren: EventEmitter<any>;
    showFeedback: EventEmitter<any>;
    isChildVisible: boolean;
    openUrl(item: any): void;
    showChildren(event: any): void;
    showModal(): void;
}
export declare class HamburgerModule {
}

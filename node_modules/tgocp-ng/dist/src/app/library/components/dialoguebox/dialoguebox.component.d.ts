import { OnInit, AfterViewInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { DialogueboxService } from './dialoguebox.service';
export declare class DialogueboxComponent implements OnInit, AfterViewInit, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    private dialogueboxService;
    private subscription;
    constructor(el: ElementRef, domHandler: DomHandler, dialogueboxService: DialogueboxService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    name: string;
    header: string;
    style: any;
    contentClass: string;
    overlayClass: string;
    private _visible;
    showFooter: boolean;
    acceptButton: string;
    rejectButton: string;
    messages: Array<string>;
    confirmationEvent: EventEmitter<any>;
    rejectionEvent: EventEmitter<any>;
    iconClass: string;
    visible: boolean;
    hide(): void;
    confirm(): void;
    reject(): void;
}
export declare class DialogueboxModule {
}

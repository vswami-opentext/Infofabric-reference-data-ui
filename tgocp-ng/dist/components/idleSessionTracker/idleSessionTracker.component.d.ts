import { PipeTransform, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { Idle } from '@ng-idle/core';
import { DialogueboxService } from '../dialoguebox/dialoguebox.service';
export declare class MinuteSecondsPipe implements PipeTransform {
    transform(value: number): string;
}
export declare class IdleSessionTrackerComponent implements OnInit {
    private element;
    private dialogueboxService;
    private minutePipe;
    private idle;
    idleState: any;
    timedOut: boolean;
    lastPing?: Date;
    header: string;
    isVisible: boolean;
    showFooter: boolean;
    keepAliveFn: EventEmitter<any>;
    isChild: boolean;
    idleTime: any;
    warningTime: any;
    logoutMethod: EventEmitter<any>;
    constructor(element: ElementRef, dialogueboxService: DialogueboxService, minutePipe: MinuteSecondsPipe, idle: Idle);
    ngOnInit(): void;
    signout(type: any): void;
    callKeepAlive(): void;
    showDialogBox(): void;
}
export declare class IdleSessionTrackerModule {
}

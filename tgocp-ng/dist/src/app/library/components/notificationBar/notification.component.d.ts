import { OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NotificationService } from './notification.service';
import { NotificationProperties } from './notification.properties';
export interface NotificationLocaleSettings {
    moredetails?: string;
    fewerdetails?: string;
    title?: string;
}
export declare class NotificationComponent implements OnInit {
    private notificationService;
    private cdr;
    private showDetails;
    private subscription;
    properties: NotificationProperties;
    h1: ElementRef;
    _locale: NotificationLocaleSettings;
    _language: string;
    constructor(notificationService: NotificationService, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    applyContentWidth(): string;
    ngOnDestroy(): void;
    locale: any;
    changeIcon(): String;
    toggleContentIcon(): "ot-caret-down" | "ot-caret-up";
}

import { OnInit } from "@angular/core";
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
export declare class AppSwitcherComponent implements OnInit {
    ngOnInit(): void;
    directiveScroll: PerfectScrollbarDirective;
    appLauncherList: any[];
    flag: boolean;
    showContent: boolean;
    constructor();
    openAppPanel(): void;
    handleOnClick(value: string): void;
    onAfterHideFun(): void;
}
export declare class AppSwitcherModule {
}

import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
export declare class WorkspaceService {
    workSpaceTabSubject: Subject<any>;
    _clickTab(tabName: any): void;
}
export declare class WorkspaceComponent implements OnInit {
    private wService;
    appName: string;
    tabNameList: any[];
    constructor(wService: WorkspaceService);
    ngOnInit(): void;
    tabClick(tabName: any): void;
}
export declare class WorkspaceModule {
}

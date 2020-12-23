import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DomHandler } from '../dom/domhandler';
export declare class TGOCPNGService {
    showModalSubject: Subject<any>;
    showModal(): void;
    hideModal(): void;
}
export declare class Modal implements OnDestroy {
    domHandler: DomHandler;
    private uiHandlerService;
    containerViewChild: any;
    overlay: any;
    size: string;
    visible: boolean;
    showModal(): void;
    hideModal(): void;
    constructor(domHandler: DomHandler, uiHandlerService: TGOCPNGService);
    center(): void;
    ngOnDestroy(): void;
}
export declare class ModalModule {
}

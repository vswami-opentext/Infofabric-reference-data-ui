import { Observable } from 'rxjs';
export declare class BreadCrumbsService {
    items: {
        'label': any;
        'url': any;
    }[];
    private breadCrumbsSubject;
    breadCrumbsState: Observable<{}[]>;
    constructor();
    addBreadCrumbItem(data: any, hasAppHome?: any): void;
}

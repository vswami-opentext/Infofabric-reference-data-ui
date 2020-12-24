import { Observable } from 'rxjs';
export declare class DialogueboxService {
    private confirmationSource;
    confirmationSource$: Observable<any>;
    confirm(data: any): this;
}

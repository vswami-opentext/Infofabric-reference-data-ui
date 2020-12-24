import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
export declare class HamburgerService {
    private http;
    constructor(http: Http);
    ref: Subject<any>;
    sendFeedback(feedbackData: any): import("rxjs/internal/Observable").Observable<Response>;
}

import { Observable } from 'rxjs';
import { Response } from '@angular/http';
export declare class HttpErrorCodes {
    constructor();
    static handleError(error: Response | any): Observable<never>;
}

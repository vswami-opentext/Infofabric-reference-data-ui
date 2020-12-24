import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
export declare class HttpClientInterceptorService implements HttpInterceptor {
    private _pendingRequests;
    private _pendingRequestsStatus;
    readonly pendingRequestsStatus: Observable<boolean>;
    readonly pendingRequests: number;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
export declare function HttpInterceptorServiceFactory(): HttpClientInterceptorService;
export declare let HttpInterceptorServiceFactoryProvider: {
    provide: typeof HttpClientInterceptorService;
    useFactory: typeof HttpInterceptorServiceFactory;
};

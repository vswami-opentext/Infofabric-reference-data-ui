import { OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClientInterceptorService } from '../services/httpInteceptor.service';
export declare class ProgressIconComponent implements OnInit {
    private httpService;
    private ref;
    show: boolean;
    private subscription;
    constructor(httpService: HttpClientInterceptorService, ref: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}

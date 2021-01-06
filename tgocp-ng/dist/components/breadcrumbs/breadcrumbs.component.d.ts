import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadCrumbsService } from './breadcrumbs.service';
import { TranslateService } from '@ngx-translate/core';
export declare class BreadCrumbsComponent implements OnInit {
    private breadCrumbsService;
    private route;
    private translate;
    homePageUrl: string;
    homePage: {};
    items: {}[];
    appHomeLabel: string;
    appHomeRoute: string;
    private subscription;
    count: number;
    constructor(router: Router, breadCrumbsService: BreadCrumbsService, route: ActivatedRoute, translate: TranslateService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    initVariables(): void;
}

import { OnInit } from '@angular/core';
import { OverlayPanel } from '../overlaypanel/overlaypanel';
import { Subject } from 'rxjs';
export declare class TileService {
    toolTipSUB: Subject<any>;
    showTooltip(eventData: any): void;
}
export declare class TilesContainerComponent implements OnInit {
    constructor();
    tilesCount: number;
    scrollConfig: {};
    ngOnInit(): void;
    getTileHeight(): "40%" | "50%";
}
export declare class TilesCarouselComponent implements OnInit {
    constructor();
    ngOnInit(): void;
}
export declare class TileComponent implements OnInit {
    constructor();
    ngOnInit(): void;
}
export declare class TileHeaderComponent implements OnInit {
    constructor();
    ngOnInit(): void;
}
export declare class TileContentComponent implements OnInit {
    private tileService;
    eventData: any;
    constructor(tileService: TileService);
    scrollConfig: {};
    ngOnInit(): void;
    showTooltip(event: any, overlaypanel: OverlayPanel): void;
}
export declare class TileFooterComponent implements OnInit {
    constructor();
    ngOnInit(): void;
}
export declare class TileModule {
}

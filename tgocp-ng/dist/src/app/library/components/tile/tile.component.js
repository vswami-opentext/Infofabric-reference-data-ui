var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgModule, Injectable } from '@angular/core';
import { SearchModule } from "../search/search.component";
import { PSscrollUtils } from "../../shared/perfect-scrollbar-config";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { OverlayPanelModule } from '../overlaypanel/overlaypanel';
import { Subject } from 'rxjs';
var TileService = /** @class */ (function () {
    function TileService() {
        this.toolTipSUB = new Subject();
    }
    TileService.prototype.showTooltip = function (eventData) {
        this.toolTipSUB.next(eventData);
    };
    TileService = __decorate([
        Injectable()
    ], TileService);
    return TileService;
}());
export { TileService };
var TilesContainerComponent = /** @class */ (function () {
    function TilesContainerComponent() {
        this.tilesCount = 10;
        this.scrollConfig = PSscrollUtils.scrollBoth();
    }
    TilesContainerComponent.prototype.ngOnInit = function () {
    };
    TilesContainerComponent.prototype.getTileHeight = function () {
        if (this.tilesCount <= 6) {
            return '50%';
        }
        else {
            return '40%';
        }
    };
    TilesContainerComponent = __decorate([
        Component({
            selector: 'ot-tile-container',
            template: "<div class=\"ot-tile-perspective\">\n  <div class=\"ot-container-fluid\">\n    <div class=\"ot-row \">\n      <div class=\"ot-col-xs-12 ot-col-sm-6 \n       ot-col-md-4 ot-col-lg-3 ot-col-xl-4 \" name=\"tiles-drg\">\n        <ot-tile></ot-tile>\n      </div>\n\n    </div>\n  </div>\n</div>"
        }),
        __metadata("design:paramtypes", [])
    ], TilesContainerComponent);
    return TilesContainerComponent;
}());
export { TilesContainerComponent };
var TilesCarouselComponent = /** @class */ (function () {
    function TilesCarouselComponent() {
    }
    TilesCarouselComponent.prototype.ngOnInit = function () {
    };
    TilesCarouselComponent = __decorate([
        Component({
            selector: 'ot-tile-carousel',
            template: "<div class=\"ot-crousel_Wrapper\">\n  <div id=\"ot-myCarousel\" data-ride=\"carousel\">\n      <!-- Wrapper for slides -->\n      <div class=\"ot-carousel-inner\">\n          <div id=\"carousel-banner\" class=\"active\">\n              <div id=\"hero-lhs-container\">\n                  <div>\n                      <h1 class=\"ot-hero-welcome\">Greetings here </h1>\n                      <p class=\"ot-hero-date\">date here</p>\n                  </div>\n              </div>\n              <div>\n                  <div class=\"ot-tile-footer\"></div>\n              </div>\n          </div>\n      </div>\n  </div>\n</div>"
        }),
        __metadata("design:paramtypes", [])
    ], TilesCarouselComponent);
    return TilesCarouselComponent;
}());
export { TilesCarouselComponent };
var TileComponent = /** @class */ (function () {
    function TileComponent() {
    }
    TileComponent.prototype.ngOnInit = function () {
    };
    TileComponent = __decorate([
        Component({
            selector: 'ot-tile',
            template: "<div class=\"ot-tile-wrapper\">\n  <ot-tile-header></ot-tile-header>\n  <ot-tile-content></ot-tile-content>\n</div>\n"
        }),
        __metadata("design:paramtypes", [])
    ], TileComponent);
    return TileComponent;
}());
export { TileComponent };
var TileHeaderComponent = /** @class */ (function () {
    function TileHeaderComponent() {
    }
    TileHeaderComponent.prototype.ngOnInit = function () {
    };
    TileHeaderComponent = __decorate([
        Component({
            selector: 'ot-tile-header',
            template: "<div class=\"ot-tile-header\">    \n  <div class=\"ot-tile-header-icon\">\n      <!--<span class=\"icon title-icon title-assignments\" [style.background-image]=\"'url(https://image.flaticon.com/icons/png/512/706/706035.png)'\"></span>-->\n  </div> \n  <div class=\"ot-tile-title\">\n      <div style=\"overflow:hidden\"><span class=\"ot-title-text\">Trading Partners</span></div>\n      <ot-search></ot-search>\n  </div>    \n</div>"
        }),
        __metadata("design:paramtypes", [])
    ], TileHeaderComponent);
    return TileHeaderComponent;
}());
export { TileHeaderComponent };
var TileContentComponent = /** @class */ (function () {
    function TileContentComponent(tileService) {
        this.tileService = tileService;
        this.scrollConfig = PSscrollUtils.scrollBoth();
    }
    TileContentComponent.prototype.ngOnInit = function () {
    };
    TileContentComponent.prototype.showTooltip = function (event, overlaypanel) {
        // overlaypanel.toggle(event);
        this.eventData = {};
        this.eventData.event = event;
        this.eventData.panel = overlaypanel;
        this.tileService.showTooltip(this.eventData);
    };
    TileContentComponent = __decorate([
        Component({
            selector: 'ot-tile-content',
            template: "<div class=\"ot-tile-content ot-background-white\" [perfectScrollbar]=\"scrollConfig\">\n  <div class=\"ot-tile-content-item\">\n      <div class=\"ot-tile-content-label\">\n          <span>Test Data With </span>\n\n      </div>\n   </div>\n   <div class=\"ot-tile-content-item\">\n      <div class=\"ot-tile-content-label\">\n          <span>Test Data With </span>\n      </div>\n   </div>\n</div>"
        }),
        __metadata("design:paramtypes", [TileService])
    ], TileContentComponent);
    return TileContentComponent;
}());
export { TileContentComponent };
var TileFooterComponent = /** @class */ (function () {
    function TileFooterComponent() {
    }
    TileFooterComponent.prototype.ngOnInit = function () {
    };
    TileFooterComponent = __decorate([
        Component({
            selector: 'ot-tile-footer',
            template: "<div>NEEDS to create</div>"
        }),
        __metadata("design:paramtypes", [])
    ], TileFooterComponent);
    return TileFooterComponent;
}());
export { TileFooterComponent };
var TileModule = /** @class */ (function () {
    function TileModule() {
    }
    TileModule = __decorate([
        NgModule({
            exports: [TilesContainerComponent, TileComponent, TileHeaderComponent,
                TileContentComponent, TileFooterComponent, TilesCarouselComponent
            ],
            declarations: [TilesContainerComponent, TileComponent, TileHeaderComponent, TileContentComponent, TileFooterComponent, TilesCarouselComponent],
            imports: [SearchModule, PerfectScrollbarModule, OverlayPanelModule],
            providers: [TileService]
        })
    ], TileModule);
    return TileModule;
}());
export { TileModule };
//# sourceMappingURL=tile.component.js.map
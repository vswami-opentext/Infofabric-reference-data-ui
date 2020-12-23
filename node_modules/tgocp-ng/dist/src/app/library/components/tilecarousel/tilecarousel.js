var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, EventEmitter, Input, Output, ContentChildren, QueryList, Renderer2, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { SharedModule, PrimeTemplate } from '../common/shared';
import { CommonModule } from '@angular/common';
var TileCarousel = /** @class */ (function () {
    function TileCarousel(el, domHandler, renderer, cd) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.cd = cd;
        this.numVisible = 3;
        this.firstVisible = 0;
        this.circular = false;
        this.breakpoint = 560;
        this.responsive = true;
        this.autoplayInterval = 0;
        this.effectDuration = '1s';
        this.easing = 'ease-out';
        this.pageLinks = 3;
        this.onPage = new EventEmitter();
        this.left = 0;
    }
    TileCarousel.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    Object.defineProperty(TileCarousel.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            this.handleDataChange();
        },
        enumerable: true,
        configurable: true
    });
    TileCarousel.prototype.handleDataChange = function () {
        if (this.value && this.value.length) {
            if (this.value.length && this.firstVisible >= this.value.length) {
                this.setPage(this.totalPages - 1);
            }
        }
        else {
            this.setPage(0);
        }
        this.valuesChanged = true;
    };
    TileCarousel.prototype.ngAfterViewChecked = function () {
        if (this.valuesChanged && this.containerViewChild.nativeElement.offsetParent) {
            this.render();
            this.valuesChanged = false;
        }
    };
    TileCarousel.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.responsive) {
            this.documentResponsiveListener = this.renderer.listen('window', 'resize', function (event) {
                _this.updateState();
            });
        }
    };
    TileCarousel.prototype.updateLinks = function () {
        this.anchorPageLinks = [];
        for (var i = 0; i < this.totalPages; i++) {
            this.anchorPageLinks.push(i);
        }
    };
    TileCarousel.prototype.updateDropdown = function () {
        this.selectDropdownOptions = [];
        for (var i = 0; i < this.totalPages; i++) {
            this.selectDropdownOptions.push(i);
        }
    };
    TileCarousel.prototype.updateMobileDropdown = function () {
        this.mobileDropdownOptions = [];
        if (this.value && this.value.length) {
            for (var i = 0; i < this.value.length; i++) {
                this.mobileDropdownOptions.push(i);
            }
        }
    };
    TileCarousel.prototype.render = function () {
        if (this.autoplayInterval) {
            this.stopAutoplay();
        }
        this.items = this.domHandler.find(this.itemsViewChild.nativeElement, 'li');
        this.calculateColumns();
        this.calculateItemWidths();
        if (!this.responsive) {
            this.containerViewChild.nativeElement.style.width = (this.domHandler.width(this.containerViewChild.nativeElement)) + 'px';
        }
        if (this.autoplayInterval) {
            this.circular = true;
            this.startAutoplay();
        }
        this.updateMobileDropdown();
        this.updateLinks();
        this.updateDropdown();
        this.cd.detectChanges();
    };
    TileCarousel.prototype.calculateItemWidths = function () {
        var firstItem = (this.items && this.items.length) ? this.items[0] : null;
        if (firstItem) {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].style.width = ((this.domHandler.innerWidth(this.viewportViewChild.nativeElement) - (this.domHandler.getHorizontalMargin(firstItem) * this.columns)) / this.columns) + 'px';
            }
        }
    };
    TileCarousel.prototype.calculateColumns = function () {
        if (window.innerWidth <= this.breakpoint) {
            this.shrinked = true;
            this.columns = 1;
        }
        else {
            this.shrinked = false;
            this.columns = this.numVisible;
        }
        this.page = Math.floor(this.firstVisible / this.columns);
    };
    TileCarousel.prototype.onNextNav = function () {
        var lastPage = (this.page === (this.totalPages - 1));
        if (!lastPage)
            this.setPage(this.page + 1);
        else if (this.circular)
            this.setPage(0);
    };
    TileCarousel.prototype.onPrevNav = function () {
        if (this.page !== 0)
            this.setPage(this.page - 1);
        else if (this.circular)
            this.setPage(this.totalPages - 1);
    };
    TileCarousel.prototype.setPageWithLink = function (event, p) {
        this.setPage(p);
        event.preventDefault();
    };
    TileCarousel.prototype.setPage = function (p, enforce) {
        if (p !== this.page || enforce) {
            this.page = p;
            this.left = (-1 * (this.domHandler.innerWidth(this.viewportViewChild.nativeElement) * this.page));
            this.firstVisible = this.page * this.columns;
            this.onPage.emit({
                page: this.page
            });
        }
    };
    TileCarousel.prototype.onDropdownChange = function (val) {
        this.setPage(parseInt(val));
    };
    Object.defineProperty(TileCarousel.prototype, "displayPageLinks", {
        get: function () {
            return (this.totalPages <= this.pageLinks && !this.shrinked);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileCarousel.prototype, "displayPageDropdown", {
        get: function () {
            return (this.totalPages > this.pageLinks && !this.shrinked);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileCarousel.prototype, "totalPages", {
        get: function () {
            return (this.value && this.value.length) ? Math.ceil(this.value.length / this.columns) : 0;
        },
        enumerable: true,
        configurable: true
    });
    TileCarousel.prototype.routerDisplay = function () {
        var win = window;
        if (win.innerWidth <= this.breakpoint)
            return true;
        else
            return false;
    };
    TileCarousel.prototype.updateState = function () {
        var win = window;
        if (win.innerWidth <= this.breakpoint) {
            this.shrinked = true;
            this.columns = 1;
        }
        else if (this.shrinked) {
            this.shrinked = false;
            this.columns = this.numVisible;
            this.updateLinks();
            this.updateDropdown();
        }
        this.calculateItemWidths();
        this.setPage(Math.floor(this.firstVisible / this.columns), true);
    };
    TileCarousel.prototype.startAutoplay = function () {
        var _this = this;
        this.interval = setInterval(function () {
            if (_this.page === (_this.totalPages - 1))
                _this.setPage(0);
            else
                _this.setPage(_this.page + 1);
        }, this.autoplayInterval);
    };
    TileCarousel.prototype.stopAutoplay = function () {
        clearInterval(this.interval);
    };
    TileCarousel.prototype.ngOnDestroy = function () {
        if (this.documentResponsiveListener) {
            this.documentResponsiveListener();
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TileCarousel.prototype, "numVisible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TileCarousel.prototype, "firstVisible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TileCarousel.prototype, "headerText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TileCarousel.prototype, "circular", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TileCarousel.prototype, "breakpoint", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TileCarousel.prototype, "responsive", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TileCarousel.prototype, "autoplayInterval", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TileCarousel.prototype, "effectDuration", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TileCarousel.prototype, "easing", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TileCarousel.prototype, "pageLinks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TileCarousel.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TileCarousel.prototype, "styleClass", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TileCarousel.prototype, "onPage", void 0);
    __decorate([
        ContentChildren(PrimeTemplate),
        __metadata("design:type", QueryList)
    ], TileCarousel.prototype, "templates", void 0);
    __decorate([
        ViewChild('container'),
        __metadata("design:type", ElementRef)
    ], TileCarousel.prototype, "containerViewChild", void 0);
    __decorate([
        ViewChild('viewport'),
        __metadata("design:type", ElementRef)
    ], TileCarousel.prototype, "viewportViewChild", void 0);
    __decorate([
        ViewChild('items'),
        __metadata("design:type", ElementRef)
    ], TileCarousel.prototype, "itemsViewChild", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], TileCarousel.prototype, "value", null);
    TileCarousel = __decorate([
        Component({
            selector: 'ot-carousel',
            template: "<div #container [ngClass]=\"{'ot-ui-carousel ot-ui-widget ot-ui-widget-content ot-ui-corner-all':true}\" [ngStyle]=\"style\" [class]=\"styleClass\">\r\n    <div class=\"ot-ui-carousel-header ot-ui-widget-header ot-ui-corner-all\">\r\n        <span class=\"ot-ui-carousel-header-title\">{{headerText}}</span>\r\n        <span class=\"ot-ui-carousel-button ot-ui-carousel-next-button fa fa-arrow-circle-right\" (click)=\"onNextNav()\" [ngClass]=\"{'ot-ui-state-disabled':(page === (totalPages-1)) && !circular}\" *ngIf=\"value&&value.length\"></span>\r\n        <span class=\"ot-ui-carousel-button ot-ui-carousel-prev-button fa fa-arrow-circle-left\" (click)=\"onPrevNav()\" [ngClass]=\"{'ot-ui-state-disabled':(page === 0 && !circular)}\" *ngIf=\"value&&value.length\"></span>\r\n        <div *ngIf=\"displayPageLinks\" class=\"ot-ui-carousel-page-links\">\r\n            <a href=\"#\" (click)=\"setPageWithLink($event,i)\" class=\"ot-ui-carousel-page-link fa fa-circle-o\" *ngFor=\"let links of anchorPageLinks;let i=index\" [ngClass]=\"{'fa-dot-circle-o':page===i}\"></a>\r\n        </div>\r\n        <select *ngIf=\"displayPageDropdown\" class=\"ot-ui-carousel-dropdown ot-ui-widget ot-ui-state-default ot-ui-corner-left\" [value]=\"page\" (change)=\"onDropdownChange($event.target.value)\">\r\n            <option *ngFor=\"let option of selectDropdownOptions\" [value]=\"option\" [selected]=\"value == option\">{{option+1}}</option>\r\n        </select>\r\n        <select *ngIf=\"responsive&&value&&value.length\" class=\"ot-ui-carousel-mobiledropdown ot-ui-widget ot-ui-state-default ot-ui-corner-left\" [value]=\"page\" (change)=\"onDropdownChange($event.target.value)\" [style.display]=\"shrinked ? 'block' : 'none'\">\r\n            <option *ngFor=\"let option of mobileDropdownOptions\" [value]=\"option\" [selected]=\"value == option\">{{option+1}}</option>\r\n        </select>\r\n    </div>\r\n    <div #viewport class=\"ot-ui-carousel-viewport\">\r\n        <ul #items class=\"ot-ui-carousel-items\" [style.left.px]=\"left\" [style.transitionProperty]=\"'left'\" [style.transitionDuration]=\"effectDuration\" [style.transitionTimingFunction]=\"easing\">\r\n            <li *ngFor=\"let item of value\" class=\"ot-ui-carousel-item ot-ui-widget-content ot-ui-corner-all\">\r\n                <ng-template [pTemplateWrapper]=\"itemTemplate\" [item]=\"item\"></ng-template>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>",
            providers: [DomHandler]
        }),
        __metadata("design:paramtypes", [ElementRef, DomHandler, Renderer2, ChangeDetectorRef])
    ], TileCarousel);
    return TileCarousel;
}());
export { TileCarousel };
var CarouselModule = /** @class */ (function () {
    function CarouselModule() {
    }
    CarouselModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule],
            exports: [TileCarousel, SharedModule],
            declarations: [TileCarousel]
        })
    ], CarouselModule);
    return CarouselModule;
}());
export { CarouselModule };
//# sourceMappingURL=tilecarousel.js.map
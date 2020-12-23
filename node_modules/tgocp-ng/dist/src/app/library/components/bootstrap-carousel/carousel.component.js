// The MIT License (MIT)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// Copyright (c) 2015-2018 Angular ng-bootstrap team
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, EventEmitter, Inject, Input, NgZone, Output, PLATFORM_ID, QueryList, TemplateRef, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OTCarouselConfig } from './carousel-config';
import { Subject, timer, BehaviorSubject, combineLatest, NEVER } from 'rxjs';
import { startWith, map, switchMap, takeUntil, distinctUntilChanged } from 'rxjs/operators';
var nextId = 0;
/**
 * A directive that wraps the individual carousel slide.
 */
var NgbSlide = /** @class */ (function () {
    function NgbSlide(tplRef) {
        this.tplRef = tplRef;
        /**
         * Slide id that must be unique for the entire document.
         *
         * If not provided, will be generated in the `ngb-slide-xx` format.
         */
        this.id = "ngb-slide-" + nextId++;
    }
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgbSlide.prototype, "id", void 0);
    NgbSlide = __decorate([
        Directive({ selector: 'ng-template[ngbSlide]' }),
        __metadata("design:paramtypes", [TemplateRef])
    ], NgbSlide);
    return NgbSlide;
}());
export { NgbSlide };
/**
 * Carousel is a component to easily create and control slideshows.
 *
 * Allows to set intervals, change the way user interacts with the slides and provides a programmatic API.
 */
var OtCarousel = /** @class */ (function () {
    function OtCarousel(config, _platformId, _ngZone, _cd) {
        this._platformId = _platformId;
        this._ngZone = _ngZone;
        this._cd = _cd;
        this.NgbSlideEventSource = NgbSlideEventSource;
        this._destroy$ = new Subject();
        this._interval$ = new BehaviorSubject(0);
        this._mouseHover$ = new BehaviorSubject(false);
        this._pauseOnHover$ = new BehaviorSubject(false);
        this._pause$ = new BehaviorSubject(false);
        this._wrap$ = new BehaviorSubject(false);
        /**
         * An event emitted right after the slide transition is completed.
         *
         * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
         */
        this.slide = new EventEmitter();
        this.interval = config.interval;
        this.wrap = config.wrap;
        this.keyboard = config.keyboard;
        this.pauseOnHover = config.pauseOnHover;
        this.showNavigationArrows = config.showNavigationArrows;
        this.showNavigationIndicators = config.showNavigationIndicators;
    }
    Object.defineProperty(OtCarousel.prototype, "interval", {
        get: function () { return this._interval$.value; },
        /**
         * Time in milliseconds before the next slide is shown.
         */
        set: function (value) {
            this._interval$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OtCarousel.prototype, "wrap", {
        get: function () { return this._wrap$.value; },
        /**
         * If `true`, will 'wrap' the carousel by switching from the last slide back to the first.
         */
        set: function (value) {
            this._wrap$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OtCarousel.prototype, "pauseOnHover", {
        get: function () { return this._pauseOnHover$.value; },
        /**
         * If `true`, will pause slide switching when mouse cursor hovers the slide.
         *
         * @since 2.2.0
         */
        set: function (value) {
            this._pauseOnHover$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    OtCarousel.prototype.mouseEnter = function () {
        this._mouseHover$.next(true);
    };
    OtCarousel.prototype.mouseLeave = function () {
        this._mouseHover$.next(false);
    };
    OtCarousel.prototype.ngAfterContentInit = function () {
        var _this = this;
        // setInterval() doesn't play well with SSR and protractor,
        // so we should run it in the browser and outside Angular
        if (isPlatformBrowser(this._platformId)) {
            this._ngZone.runOutsideAngular(function () {
                var hasNextSlide$ = combineLatest(_this.slide.pipe(map(function (slideEvent) { return slideEvent.current; }), startWith(_this.activeId)), _this._wrap$, _this.slides.changes.pipe(startWith(null)))
                    .pipe(map(function (_a) {
                    var currentSlideId = _a[0], wrap = _a[1];
                    var slideArr = _this.slides.toArray();
                    var currentSlideIdx = _this._getSlideIdxById(currentSlideId);
                    return wrap ? slideArr.length > 1 : currentSlideIdx < slideArr.length - 1;
                }), distinctUntilChanged());
                combineLatest(_this._pause$, _this._pauseOnHover$, _this._mouseHover$, _this._interval$, hasNextSlide$)
                    .pipe(map(function (_a) {
                    var pause = _a[0], pauseOnHover = _a[1], mouseHover = _a[2], interval = _a[3], hasNextSlide = _a[4];
                    return ((pause || (pauseOnHover && mouseHover) || !hasNextSlide) ? 0 : interval);
                }), distinctUntilChanged(), switchMap(function (interval) { return interval > 0 ? timer(interval, interval) : NEVER; }), takeUntil(_this._destroy$))
                    .subscribe(function () { return _this._ngZone.run(function () { return _this.next(NgbSlideEventSource.TIMER); }); });
            });
        }
        this.slides.changes.pipe(takeUntil(this._destroy$)).subscribe(function () { return _this._cd.markForCheck(); });
    };
    OtCarousel.prototype.ngAfterContentChecked = function () {
        var activeSlide = this._getSlideById(this.activeId);
        this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : null);
    };
    OtCarousel.prototype.ngOnDestroy = function () { this._destroy$.next(); };
    /**
     * Navigates to a slide with the specified identifier.
     */
    OtCarousel.prototype.select = function (slideId, source) {
        this._cycleToSelected(slideId, this._getSlideEventDirection(this.activeId, slideId), source);
    };
    /**
     * Navigates to the previous slide.
     */
    OtCarousel.prototype.prev = function (source) {
        this._cycleToSelected(this._getPrevSlide(this.activeId), NgbSlideEventDirection.RIGHT, source);
    };
    /**
     * Navigates to the next slide.
     */
    OtCarousel.prototype.next = function (source) {
        this._cycleToSelected(this._getNextSlide(this.activeId), NgbSlideEventDirection.LEFT, source);
    };
    /**
     * Pauses cycling through the slides.
     */
    OtCarousel.prototype.pause = function () { this._pause$.next(true); };
    /**
     * Restarts cycling through the slides from left to right.
     */
    OtCarousel.prototype.cycle = function () { this._pause$.next(false); };
    OtCarousel.prototype._cycleToSelected = function (slideIdx, direction, source) {
        var selectedSlide = this._getSlideById(slideIdx);
        if (selectedSlide && selectedSlide.id !== this.activeId) {
            this.slide.emit({ prev: this.activeId, current: selectedSlide.id, direction: direction, paused: this._pause$.value, source: source });
            this.activeId = selectedSlide.id;
        }
        // we get here after the interval fires or any external API call like next(), prev() or select()
        this._cd.markForCheck();
    };
    OtCarousel.prototype._getSlideEventDirection = function (currentActiveSlideId, nextActiveSlideId) {
        var currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
        var nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);
        return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.RIGHT : NgbSlideEventDirection.LEFT;
    };
    OtCarousel.prototype._getSlideById = function (slideId) { return this.slides.find(function (slide) { return slide.id === slideId; }); };
    OtCarousel.prototype._getSlideIdxById = function (slideId) {
        return this.slides.toArray().indexOf(this._getSlideById(slideId));
    };
    OtCarousel.prototype._getNextSlide = function (currentSlideId) {
        var slideArr = this.slides.toArray();
        var currentSlideIdx = this._getSlideIdxById(currentSlideId);
        var isLastSlide = currentSlideIdx === slideArr.length - 1;
        return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
            slideArr[currentSlideIdx + 1].id;
    };
    OtCarousel.prototype._getPrevSlide = function (currentSlideId) {
        var slideArr = this.slides.toArray();
        var currentSlideIdx = this._getSlideIdxById(currentSlideId);
        var isFirstSlide = currentSlideIdx === 0;
        return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
            slideArr[currentSlideIdx - 1].id;
    };
    __decorate([
        ContentChildren(NgbSlide),
        __metadata("design:type", QueryList)
    ], OtCarousel.prototype, "slides", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], OtCarousel.prototype, "activeId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], OtCarousel.prototype, "interval", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], OtCarousel.prototype, "wrap", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], OtCarousel.prototype, "keyboard", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], OtCarousel.prototype, "pauseOnHover", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], OtCarousel.prototype, "showNavigationArrows", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], OtCarousel.prototype, "showNavigationIndicators", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], OtCarousel.prototype, "slide", void 0);
    __decorate([
        HostListener('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], OtCarousel.prototype, "mouseEnter", null);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], OtCarousel.prototype, "mouseLeave", null);
    OtCarousel = __decorate([
        Component({
            selector: 'ot-carousel',
            exportAs: 'otCarousel',
            changeDetection: ChangeDetectionStrategy.OnPush,
            host: {
                'class': 'ot-carousel slide',
                '[style.display]': '"block"',
                'tabIndex': '0',
                '(keydown.arrowLeft)': 'keyboard && prev(NgbSlideEventSource.ARROW_LEFT)',
                '(keydown.arrowRight)': 'keyboard && next(NgbSlideEventSource.ARROW_RIGHT)'
            },
            template: "\n      <ol class=\"ot-carousel-indicators\" *ngIf=\"showNavigationIndicators\">\n        <li *ngFor=\"let slide of slides\" [id]=\"slide.id\" [class.ot-active]=\"slide.id === activeId\"\n            (click)=\"select(slide.id, NgbSlideEventSource.INDICATOR)\"></li>\n      </ol>\n      <div class=\"ot-carousel-inner\">\n        <div *ngFor=\"let slide of slides\" class=\"ot-carousel-item\" [class.ot-active]=\"slide.id === activeId\">\n          <ng-template [ngTemplateOutlet]=\"slide.tplRef\"></ng-template>\n        </div>\n      </div>\n      <a class=\"ot-carousel-control-prev\" role=\"button\" (click)=\"prev(NgbSlideEventSource.ARROW_LEFT)\" *ngIf=\"showNavigationArrows\">\n        <span class=\"ot-carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n        <span class=\"sr-only\" i18n=\"@@ngb.carousel.previous\">Previous</span>\n      </a>\n      <a class=\"ot-carousel-control-next\" role=\"button\" (click)=\"next(NgbSlideEventSource.ARROW_RIGHT)\" *ngIf=\"showNavigationArrows\">\n        <span class=\"ot-carousel-control-next-icon\" aria-hidden=\"true\"></span>\n        <span class=\"sr-only\" i18n=\"@@ngb.carousel.next\">Next</span>\n      </a>\n    "
        }),
        __param(1, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [OTCarouselConfig, Object, NgZone,
            ChangeDetectorRef])
    ], OtCarousel);
    return OtCarousel;
}());
export { OtCarousel };
/**
 * Defines the carousel slide transition direction.
 */
export var NgbSlideEventDirection;
(function (NgbSlideEventDirection) {
    NgbSlideEventDirection[NgbSlideEventDirection["LEFT"] = 'left'] = "LEFT";
    NgbSlideEventDirection[NgbSlideEventDirection["RIGHT"] = 'right'] = "RIGHT";
})(NgbSlideEventDirection || (NgbSlideEventDirection = {}));
export var NgbSlideEventSource;
(function (NgbSlideEventSource) {
    NgbSlideEventSource["TIMER"] = "timer";
    NgbSlideEventSource["ARROW_LEFT"] = "arrowLeft";
    NgbSlideEventSource["ARROW_RIGHT"] = "arrowRight";
    NgbSlideEventSource["INDICATOR"] = "indicator";
})(NgbSlideEventSource || (NgbSlideEventSource = {}));
export var OT_CAROUSEL_DIRECTIVES = [OtCarousel, NgbSlide];
//# sourceMappingURL=carousel.component.js.map
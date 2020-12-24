var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
var Tab = /** @class */ (function () {
    function Tab(domHandler) {
        this.domHandler = domHandler;
        this.theme = "grey";
        this.border = true;
        this.align = "left";
        this.last_known_scroll_position = 0;
        this.ticking = false;
        this.SETTINGS = {
            navBarTravelling: false,
            navBarTravelDirection: "",
            navBarTravelDistance: 150
        };
    }
    Tab.prototype.ngAfterViewInit = function () {
        var _this = this;
        var containter = this.tabNavContainer.nativeElement;
        var content = this.tabNavItemsContainer.nativeElement;
        containter.addEventListener('scroll', this.scrollEventListener.bind(this));
        content.addEventListener('transitionend', this.contentTransitionFn.bind(this));
        window.addEventListener('resize', this.checkOverflow.bind(this));
        //Give some delay to let the page render before we calculate the positions on rendered page
        setTimeout(function () {
            _this.checkOverflow();
            _this.moveIndicator(_this.selectActiveElement());
        }, 200);
    };
    Tab.prototype.selectActiveElement = function () {
        var links = [].slice.call(document.querySelectorAll(".ot-ux-tab-nav-link"));
        return links.find(function (item) {
            return item.getAttribute("aria-selected") === ("true");
        });
    };
    Tab.prototype.moveIndicator = function (item) {
        this.domHandler.removeClass(item, 'ot-active');
        var activeIndc = this.activeIndicator.nativeElement;
        var textPosition = item.getBoundingClientRect();
        var container = this.activeInicatorHelper.nativeElement.getBoundingClientRect().left;
        var distance = textPosition.left - container;
        var scrollPosition = activeIndc.parentNode.scrollLeft;
        activeIndc.style.transform = "translateX(" + (distance + scrollPosition + activeIndc.scrollLeft) + "px) scaleX(" + textPosition.width * 0.01 + ")";
    };
    Tab.prototype.activeElementHandler = function (event) {
        if (!event.target.className || !(event.target.className.indexOf('ot-ux-tab-nav-link') >= 0)) {
            return;
        }
        var links = [].slice.call(document.querySelectorAll(".ot-ux-tab-nav-link"));
        links.forEach(function (item) {
            item.setAttribute("aria-selected", "false");
        });
        event.target.setAttribute("aria-selected", "true");
        this.moveIndicator(event.target);
    };
    Tab.prototype.leftNavBtnClick = function () {
        if (this.SETTINGS.navBarTravelling === true) {
            return;
        }
        var container = this.tabNavContainer.nativeElement;
        var content = this.tabNavItemsContainer.nativeElement;
        if (this.determineOverflow(container, content) === "left" ||
            this.determineOverflow(container, content) === "both") {
            var availableScrollLeft = container.scrollLeft;
            if (availableScrollLeft < this.SETTINGS.navBarTravelDistance * 2) {
                content.style.transform = "translateX(" + availableScrollLeft + "px)";
            }
            else {
                content.style.transform = "translateX(" + this.SETTINGS.navBarTravelDistance + "px)";
            }
            content.classList.remove("ot-ux-tab-nav-content-no-transition");
            this.SETTINGS.navBarTravelDirection = "left";
            this.SETTINGS.navBarTravelling = true;
        }
        this.checkOverflow();
    };
    Tab.prototype.rightNavBtnClick = function () {
        if (this.SETTINGS.navBarTravelling === true) {
            return;
        }
        var container = this.tabNavContainer.nativeElement;
        var content = this.tabNavItemsContainer.nativeElement;
        if (this.determineOverflow(container, content) === "right" ||
            this.determineOverflow(container, content) === "both") {
            var navBarRightEdge = content.getBoundingClientRect().right;
            var navBarScrollRightEdge = container.getBoundingClientRect().right;
            var availableScrollRight = Math.floor(navBarRightEdge - navBarScrollRightEdge);
            if (availableScrollRight < this.SETTINGS.navBarTravelDistance * 2) {
                content.style.transform = "translateX(-" + availableScrollRight + "px)";
            }
            else {
                content.style.transform = "translateX(-" + this.SETTINGS.navBarTravelDistance + "px)";
            }
            content.classList.remove("ot-ux-tab-nav-content-no-transition");
            this.SETTINGS.navBarTravelDirection = "right";
            this.SETTINGS.navBarTravelling = true;
        }
        this.checkOverflow();
    };
    Tab.prototype.contentTransitionFn = function () {
        var container = this.tabNavContainer.nativeElement;
        var content = this.tabNavItemsContainer.nativeElement;
        // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
        var styleOfTransform = window.getComputedStyle(content, null);
        var tr = styleOfTransform.getPropertyValue("-webkit-transform") || styleOfTransform.getPropertyValue("transform");
        // If there is no transition we want to default to 0 and not null
        var amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
        content.style.transform = "none";
        content.classList.add("ot-ux-tab-nav-content-no-transition");
        // Now lets set the scroll position
        if (this.SETTINGS.navBarTravelDirection === "left") {
            container.scrollLeft = container.scrollLeft - amount;
        }
        else {
            container.scrollLeft = container.scrollLeft + amount;
        }
        this.SETTINGS.navBarTravelling = false;
    };
    Tab.prototype.checkOverflow = function () {
        this.parentContainer.nativeElement
            .setAttribute("data-overflowing", this.determineOverflow(this.tabNavContainer.nativeElement, this.tabNavItemsContainer.nativeElement));
    };
    Tab.prototype.scrollEventListener = function () {
        var _this = this;
        this.last_known_scroll_position = window.scrollY;
        if (!this.ticking) {
            window.requestAnimationFrame(function () {
                _this.checkOverflow();
                _this.ticking = false;
            });
        }
        this.ticking = true;
    };
    Tab.prototype.determineOverflow = function (container, content) {
        var containerMetrics = container.getBoundingClientRect();
        var containerMetricsRight = Math.floor(containerMetrics.right);
        var containerMetricsLeft = Math.floor(containerMetrics.left);
        var contentMetrics = content.getBoundingClientRect();
        var contentMetricsRight = Math.floor(contentMetrics.right);
        var contentMetricsLeft = Math.floor(contentMetrics.left);
        if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
            return "both";
        }
        else if (contentMetricsLeft < containerMetricsLeft) {
            return "left";
        }
        else if (contentMetricsRight > containerMetricsRight) {
            return "right";
        }
        else {
            return "none";
        }
    };
    __decorate([
        ViewChild('parentContainer'),
        __metadata("design:type", ElementRef)
    ], Tab.prototype, "parentContainer", void 0);
    __decorate([
        ViewChild('tagNavContainer'),
        __metadata("design:type", ElementRef)
    ], Tab.prototype, "tabNavContainer", void 0);
    __decorate([
        ViewChild('tabNavItemsContainer'),
        __metadata("design:type", ElementRef)
    ], Tab.prototype, "tabNavItemsContainer", void 0);
    __decorate([
        ViewChild('activeIndicator'),
        __metadata("design:type", ElementRef)
    ], Tab.prototype, "activeIndicator", void 0);
    __decorate([
        ViewChild('activeInicatorHelper'),
        __metadata("design:type", ElementRef)
    ], Tab.prototype, "activeInicatorHelper", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Tab.prototype, "theme", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Tab.prototype, "border", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Tab.prototype, "align", void 0);
    Tab = __decorate([
        Component({
            selector: 'ot-tab',
            template: "<div #parentContainer [ngClass]=\"{'ot-ux-border-top-bottom':border, 'ot-ux-grey-bg':(theme==='grey'), 'ot-ux-white-bg':(theme==='white'), 'ot-ux-dark-bg':(theme==='dark')}\" class=\"ot-ux-tab-nav-wrapper ot-ux-block-user-select\">\r\n    <div class=\"ot-ux-tab-spinner-icon-container-left ot-ux-align-content-center ot-ux-abs-left\" (click)=\"leftNavBtnClick()\">\r\n        <span class=\"ot-ux-tab-spinner-icon ot-ux-tab-spinner-left\"></span>\r\n    </div>\r\n    <div class=\"ot-ux-tab-height ot-ux-align-content-center ot-ui-pull-left\">\r\n        <div class=\"ot-ux-tab-border-div\"></div>\r\n    </div>\r\n    <nav #tagNavContainer class=\"ot-ux-tab-nav\" [ngClass]=\"{'ot-ux-float-right':(align==='right')}\">\r\n        <div #tabNavItemsContainer class=\" ot-ux-tab-nav-content\" [ngClass]=\"{'ot-ux-float-right':(align==='right')}\" (click)=\"activeElementHandler($event)\">\r\n            <div #activeInicatorHelper class=\" ot-ux-tab-active-link-helper\">\r\n                <ul>\r\n                    <ng-content></ng-content>\r\n                </ul>\r\n                <!-- more links -->\r\n                <span #activeIndicator class=\"ot-ux-tab-active-link-indicator\"></span>\r\n            </div>\r\n        </div>\r\n\r\n    </nav>\r\n    <div class=\"ot-ux-tab-height ot-ux-align-content-center ot-ui-pull-left\">\r\n        <div class=\"ot-ux-tab-border-div\"></div>\r\n    </div>\r\n    <div class=\"ot-ux-tab-spinner-icon-container-right ot-ux-align-content-center ot-ux-abs-right\" (click)=\"rightNavBtnClick()\">\r\n        <span class=\"ot-ux-tab-spinner-icon ot-ux-tab-spinner-right\"></span>\r\n    </div>\r\n</div>",
            providers: [DomHandler]
        }),
        __metadata("design:paramtypes", [DomHandler])
    ], Tab);
    return Tab;
}());
export { Tab };
var TabModule = /** @class */ (function () {
    function TabModule() {
    }
    TabModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Tab],
            declarations: [Tab]
        })
    ], TabModule);
    return TabModule;
}());
export { TabModule };
//# sourceMappingURL=tab.js.map
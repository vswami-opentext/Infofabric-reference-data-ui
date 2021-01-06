var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, HostListener, ElementRef, ViewChild, Input } from "@angular/core";
import { DomHandler } from "../dom/domhandler";
import { CommonModule } from "@angular/common";
var BubbleTip = /** @class */ (function () {
    function BubbleTip(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.position = 'bottom';
        this.visible = false;
    }
    BubbleTip.prototype.highlight = function (color) {
        this.el.nativeElement.style.backgroundColor = color;
    };
    BubbleTip.prototype.divClicked = function () {
        this.visible = !this.visible;
        // console.log('executed' + this.visible);
    };
    BubbleTip.prototype.handleClick = function (event) {
        if (!this.el.nativeElement.contains(event.target)) {
            this.visible = false;
        }
    };
    BubbleTip.prototype.ngAfterContentInit = function () {
        var element = this.bubbletip.nativeElement.querySelector('[bubblelink]> *:first-child');
        var style = this.domHandler.getStyle(element, 'display');
        if (style.indexOf('block')) {
            this.linkStyle = style;
        }
        else {
            this.linkStyle = 'inline-block';
        }
    };
    __decorate([
        ViewChild('bubbletip'),
        __metadata("design:type", Object)
    ], BubbleTip.prototype, "bubbletip", void 0);
    __decorate([
        Input('position'),
        __metadata("design:type", String)
    ], BubbleTip.prototype, "position", void 0);
    __decorate([
        HostListener('document:click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], BubbleTip.prototype, "handleClick", null);
    BubbleTip = __decorate([
        Component({
            selector: 'ot-bubbletip',
            template: "<div class=\"ot-bubbletip \" [ngStyle]=\"{'display':linkStyle}\" #bubbletip>\r\n    <div (click)=\"divClicked()\" bubblelink [ngStyle]=\"{'display':linkStyle}\">\r\n        <ng-content select=\"[bubbleLink]\"></ng-content>\r\n    </div>\r\n    <div *ngIf=\"visible\">\r\n        <div [ngClass]=\"{'bottom': position==='bottom', 'top':position!=='bottom'}\" class=\"ot-bubbletip-content show\">\r\n            <ng-content select=\"[bubbleContent]\"></ng-content>\r\n        </div>\r\n    </div>\r\n</div>",
            styles: ["\n        \n.ot-bubbletip{\n  position: relative;\n}\n.ot-bubbletip .ot-bubbletip-content {\n    min-width: 10em;\n    background-color: #FFF;\n    color: #fff;\n    border-radius: 0px;\n    position: absolute;    \n    z-index: 4;\n}\n\n/* ot-popup arrow */\n.ot-bubbletip .ot-bubbletip-content::after {\n    content: \"\";\n    z-index: 3;\n    display: block;\n    position: absolute;\n    left: 2em;\n    width: 2rem; \n    height: 2rem;\n    background: #fff;     \n}\n\n.ot-bubbletip .ot-bubbletip-content.bottom{\n  top:3rem;\n}\n\n.ot-bubbletip .ot-bubbletip-content.bottom:after{\n  content: \"\";\n    z-index: 3;\n     display: block;\n    position: absolute;   \n    top:-1rem;    \n    background: #fff; \n    -webkit-transform: translateX(-50%) rotate(-134deg);\n    transform: translateX(-50%) rotate(-134deg); \n    -webkit-transform: translateX(-50%) rotate(-134deg);\n    -moz-box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.698039215686274);\n    -webkit-box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.698039215686274);\n     box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.698039215686274); \n}\n\n.ot-bubbletip .ot-bubbletip-content.top{\n    bottom:3rem;\n}\n\n.ot-bubbletip .ot-bubbletip-content.top:after{\n    content: \"\";\n    background: #fff; \n    display: block;\n    z-index: 3;\n    bottom: -1rem;\n    -webkit-transform: translateX(-50%) rotate(-134deg);\n    transform: translateX(-50%) rotate(-134deg); \n    -moz-box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.698039215686274);\n    -webkit-box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.698039215686274);\n     box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.698039215686274); \n}\n\n.ot-bubbletip .show {\n    visibility: visible;\n    display: block !important;\n    -moz-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.698039215686274);\n    -webkit-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.698039215686274);\n     box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.698039215686274); \n}\n        "]
        }),
        __metadata("design:paramtypes", [ElementRef, DomHandler])
    ], BubbleTip);
    return BubbleTip;
}());
export { BubbleTip };
var BubbleTipModule = /** @class */ (function () {
    function BubbleTipModule() {
    }
    BubbleTipModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [BubbleTip],
            exports: [BubbleTip],
            providers: [DomHandler]
        })
    ], BubbleTipModule);
    return BubbleTipModule;
}());
export { BubbleTipModule };
//# sourceMappingURL=bubbletip.js.map
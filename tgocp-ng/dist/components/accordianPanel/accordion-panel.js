var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
var AccordionPanel = /** @class */ (function () {
    function AccordionPanel() {
        this.showBody = false;
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AccordionPanel.prototype, "headerTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AccordionPanel.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AccordionPanel.prototype, "headerClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AccordionPanel.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AccordionPanel.prototype, "showBody", void 0);
    AccordionPanel = __decorate([
        Component({
            selector: 'ot-accordion-panel',
            template: "<div [ngStyle]=\"style\" [class]=\"styleClass\">\r\n    <div class=\"ot-panelHeader \" (click)=\"showBody=!showBody\"> \r\n        <span class=\"ot-ui-flex-box ot-ui-inherit-height ot-ui-pull-left ot-panel-title\" [ngClass]=\"headerClass\">\r\n            <h2 class=\"ot-flex-box ot-ui-inherit-height ot-ui-reset-spacing ot-ux-align-content-center\">{{headerTitle}}</h2> \r\n        </span> \r\n        <span class=\"ot-ui-flex-box ot-ui-inherit-height ot-ui-pull-right  ot-panel-icon ot-ui-reset-spacing\" >\r\n            <i class=\"ot-ux-align-content-center\" [ngClass]=\"showBody?'ot-ui-caret-up-icon':'ot-ui-dropdown-icon'\"  aria-hidden=\"true\"></i>\r\n        </span>\r\n    </div>\r\n    <div [@tabContent]=\"showBody\" class=\"ot-panelBody\" *ngIf=\"showBody\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n </div>",
            animations: [
                trigger('tabContent', [
                    state('false', style({
                        height: '0'
                    })),
                    state('true', style({
                        height: '*'
                    })),
                    transition('* <=> *', animate('200ms cubic-bezier(1, 0.67, 0.87, 1)'))
                ])
            ]
        })
    ], AccordionPanel);
    return AccordionPanel;
}());
export { AccordionPanel };
var AccordionPanelModule = /** @class */ (function () {
    function AccordionPanelModule() {
    }
    AccordionPanelModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [AccordionPanel],
            declarations: [AccordionPanel]
        })
    ], AccordionPanelModule);
    return AccordionPanelModule;
}());
export { AccordionPanelModule };
//# sourceMappingURL=accordion-panel.js.map
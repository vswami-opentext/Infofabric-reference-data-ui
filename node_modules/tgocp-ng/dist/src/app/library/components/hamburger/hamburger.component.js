var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgModule, ElementRef, Input, HostListener, TemplateRef, ContentChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PSscrollUtils } from '../../shared/perfect-scrollbar-config';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { trigger, state, style } from '@angular/animations';
import * as _ from "lodash";
import { ModalModule, TGOCPNGService } from '../modal/modal';
import { ClickOutsideModule } from '../../directives/click-outside/click-outside.module';
import { DialogService } from '../dynamic-dialog/dialogservice';
import { FeedbackComponent } from './feedback.component';
import { HamburgerService } from './service/hamburger.service';
import { MessageService } from '../common/messageservice';
import { FormsModule } from '@angular/forms';
import { DynamicDialogComponent, DynamicDialogModule } from '../dynamic-dialog/dynamic-dialog.component';
var HamburgerComponent = /** @class */ (function () {
    function HamburgerComponent(el, uiModal) {
        this.el = el;
        this.uiModal = uiModal;
        this.psConfig = PSscrollUtils.scrollY();
        this.iconClass = "ot-hamburger-icon";
        this.clickOperation = new EventEmitter();
        this.status = false;
        this.showContent = false;
        this.subject = "Business Network application and portal feedback";
        this.feedbackData = {};
    }
    HamburgerComponent.prototype.handleClick = function (event) {
        if (!this.el.nativeElement.contains(event.target)) {
            this.showContent = false;
        }
    };
    HamburgerComponent.prototype.activeState = function (id) {
        this.id = id;
        // var element = document.getElementById("activeIcon");
        // element.classList.add("hamburger-active-state");
    };
    HamburgerComponent.prototype.ngOnChanges = function () {
        //console.log("callled");
        _.forEach(this.menuData, function (data) {
            data.isParent = true;
        });
        //console.log(this.menuData);
    };
    /* adjustHeight(){
      let container = this.el.nativeElement;
      let elHeight = container.offsetParent.offsetHeight;
      let elTop = container.offsetParent.offsetTop;
      this.menubarHeight=(window.innerHeight - ( elHeight + elTop))
     // console.log(window.innerHeight, elHeight,elTop,this.menubarHeight);
     // console.log(this.domHandler.getOuterWidth(this.el.nativeElement.offsetParent));
    } */
    HamburgerComponent.prototype.clicked = function (event) {
        this.showContent = false;
        this.clickOperation.emit(event);
    };
    HamburgerComponent.prototype.onClickedOutside = function ($event) {
        this.status = false;
    };
    // @HostListener('document:click', ['$event']) clickedOutside($event) {
    // // here you can hide your menu
    // this.status = false; 
    //   }
    //   @HostListener('document:click', ['$event'])
    //   clickInside($event) {
    //     this.status = true; 
    //   }
    HamburgerComponent.prototype.hideModal = function () {
        this.uiModal.hideModal();
    };
    HamburgerComponent.prototype.feedback = function (event) {
        this.showFeedback = event;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HamburgerComponent.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HamburgerComponent.prototype, "headerClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HamburgerComponent.prototype, "menuStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HamburgerComponent.prototype, "iconClass", void 0);
    __decorate([
        ContentChild('hamburgerMenuTemplate'),
        __metadata("design:type", TemplateRef)
    ], HamburgerComponent.prototype, "hamburgerMenuTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], HamburgerComponent.prototype, "menuData", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], HamburgerComponent.prototype, "clickOperation", void 0);
    __decorate([
        HostListener('document:click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], HamburgerComponent.prototype, "handleClick", null);
    HamburgerComponent = __decorate([
        Component({
            providers: [TGOCPNGService],
            selector: 'ot-hamburger',
            template: "\n <div (click)=\"showContent=!showContent;enableContent=true\" style=\"height: 4em;\">\n  <span [ngClass]=\"showContent ? 'ot-hamburger-active-state' : ''\">\n    <span [class]=\"iconClass\"></span></span>\n   <span *ngIf=\"header\" class=\"headerClass\" [ngClass]=\"{'ot-hamburger-header':true}\">{{header}}</span>\n   \n </div> \n <div class=\"ot-menu-content\" *ngIf=\"enableContent\" [@slideInOut]=\"showContent? 'in' : 'out'\"  [ngStyle]=\"menuStyle\"\n   [perfectScrollbar]=\"psConfig\">  \n   <ng-container *ngIf=\"!hamburgerMenuTemplate\">\n      <tree-menu [node]=\"menuData\" (urlClicked)=\"clicked($event)\" (showFeedback)=\"feedback($event)\"></tree-menu>\n   </ng-container>    \n   <ng-container *ngTemplateOutlet=\"hamburgerMenuTemplate;  context: {$implicit: menuData};\"> </ng-container> \n </div>\n <div *ngIf=\"!showFeedback\" class=\"ot-hb-modal-wrapper\">\n <ot-modal size=\"sm\"> \n     <div class=\"ot-form-container\">\n         <div class=\"ot-hb-modal-header\">\n             <div>\n                 <div class=\"ot-brand-image-dark  ot-ui-pull-left\"></div>\n             </div>\n             <div (click)=\"hideModal()\" class=\"ot-modal-close-icon ot-ui-pull-right\" tooltip=\"close\"></div>\n          </div>\n          <div class=\"ot-hb-modal-content\">\n           <pre>\n            Copyright \u00A9 2019 OpenText. All Rights Reserved.\n            Trademarks owned by OpenText\n           </pre>\n          </div>\n          <div class=\"ot-ui-pull-left\">\n            <pre>\n            OpenText Website\n            <a href=\"https://www.opentext.com\">https://www.opentext.com</a>\n           </pre>\n         </div>\n       \n       </div>\n </ot-modal>\n </div>",
            animations: [
                trigger('slideInOut', [
                    state('in', style({
                        transform: 'translate3d(0, 0, 0)'
                        // transform: 'translateX(0%)'
                    })),
                    state('out', style({
                        transform: 'translate3d(-100%, 0, 0)'
                        //transform: 'translateX(-100%)'
                    })),
                ])
            ]
        }),
        __metadata("design:paramtypes", [ElementRef, TGOCPNGService])
    ], HamburgerComponent);
    return HamburgerComponent;
}());
export { HamburgerComponent };
var MenuTree = /** @class */ (function () {
    function MenuTree(uiModal, dialogueService) {
        this.uiModal = uiModal;
        this.dialogueService = dialogueService;
        this.urlClicked = new EventEmitter();
        this.expandChildren = new EventEmitter();
        this.showFeedback = new EventEmitter();
        this.isChildVisible = false;
    }
    MenuTree.prototype.openUrl = function (item) {
        if (item) {
            if (item.displayText.toString().toUpperCase() == 'ABOUT' || item.displayText.toString().toUpperCase() == 'FEEDBACK') {
                this.showModal();
                if (item.displayText.toString().toUpperCase() == 'ABOUT') {
                    this.showFeedback.emit(false);
                }
                else {
                    this.showFeedback.emit(true);
                    var ref = this.dialogueService.open(FeedbackComponent, {
                        data: {
                            isIframe: 'false'
                        },
                        header: 'Feedback',
                        width: '100%',
                        style: { "width": "500px", "height": "372px", "padding": "0 0", "left": "0%",
                            "top": "40%",
                            "right": "50%" },
                    });
                }
            }
            else if (item.src && item.target == 'ext') {
                window.open(item.src);
            }
            else if (item.src) {
                window.open(item.src, "_self");
            }
        }
        this.urlClicked.emit(true);
    };
    MenuTree.prototype.showChildren = function (event) {
        event.cancelBubble = true;
        this.isChildVisible = true;
    };
    MenuTree.prototype.showModal = function () {
        this.uiModal.showModal();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MenuTree.prototype, "node", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MenuTree.prototype, "urlClicked", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MenuTree.prototype, "expandChildren", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MenuTree.prototype, "showFeedback", void 0);
    MenuTree = __decorate([
        Component({
            selector: 'tree-menu',
            template: "\n  <ul>\n  <ng-template #recursiveList let-list>\n    <li class=\"ot-treelevel\" *ngFor=\"let item of list\">\n      <div  tabindex=\"-1\" class=\"ot-mainmenu\" (click)=\"openUrl(item)\">\n        <span *ngIf=\"item.icon\" class=\"ot-hb-title-icon\" [ngStyle]=\"{'background': 'url(' + item.icon + ') no-repeat'}\"></span>\n        {{item.displayText}}\n        <span *ngIf=\"!item.isParent && item.children && item.children.length > 0\" class=\"ot-pull-right\">\n         <a style=\"\n         display: block;\n         margin: 0.5em 0 0 0;\"\n      (click)=\"showChildren($event);item.carrotStatus=!item.carrotStatus\"> <i class=\"ot-carrot carrot-{{item.carrotStatus?'up':'down'}} ot-hb-chevron-icon\"></i></a>\n        </span>\n      </div>\n      <ul *ngIf=\"item.children && item.children.length > 0 && (item.carrotStatus || item.isParent)\">\n        <ng-container *ngTemplateOutlet=\"recursiveList; context:{ $implicit: item.children }\"></ng-container>\n      </ul>\n    </li>\n  </ng-template>\n  <ng-container *ngTemplateOutlet=\"recursiveList; context:{ $implicit: node }\"></ng-container>\n</ul>\n\n  "
        }),
        __metadata("design:paramtypes", [TGOCPNGService, DialogService])
    ], MenuTree);
    return MenuTree;
}());
export { MenuTree };
var HamburgerModule = /** @class */ (function () {
    function HamburgerModule() {
    }
    HamburgerModule = __decorate([
        NgModule({
            imports: [CommonModule, PerfectScrollbarModule, ModalModule, ClickOutsideModule, FormsModule, DynamicDialogModule],
            declarations: [HamburgerComponent, MenuTree, FeedbackComponent],
            exports: [HamburgerComponent, FeedbackComponent, FormsModule],
            providers: [HamburgerService, DialogService, MessageService],
            entryComponents: [
                FeedbackComponent, DynamicDialogComponent
            ],
        })
    ], HamburgerModule);
    return HamburgerModule;
}());
export { HamburgerModule };
//# sourceMappingURL=hamburger.component.js.map
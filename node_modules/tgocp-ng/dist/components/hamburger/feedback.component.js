var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgModule } from '@angular/core';
import { MessageService } from '../common/messageservice';
import { NotificationProperties, TGOCPNGService, ModalModule } from '../..';
import { NotificationService } from '../notificationBar/notification.service';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HamburgerService } from './service/hamburger.service';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../dynamic-dialog/dialogservice';
var FeedbackComponent = /** @class */ (function () {
    function FeedbackComponent(uiModal, hambService, messageService, notificationService, dialogueService) {
        this.uiModal = uiModal;
        this.hambService = hambService;
        this.messageService = messageService;
        this.notificationService = notificationService;
        this.dialogueService = dialogueService;
        this.subject = "Business Network application and portal feedback";
        this.feedbackData = {};
    }
    FeedbackComponent.prototype.ngOnInit = function () {
        this.ref = this.hambService.ref;
        console.log(this.ref);
    };
    FeedbackComponent.prototype.cancel = function () {
        this.dialogueService.close();
    };
    FeedbackComponent.prototype.sendFeedback = function () {
        var _this = this;
        this.feedbackData.subject = this.subject;
        console.log(this.subject);
        this.feedbackData.comments = this.comments;
        this.hambService.sendFeedback(this.feedbackData).subscribe(function (data) {
            if (data) {
                _this.showNotification();
                _this.dialogueService.close();
            }
        });
    };
    FeedbackComponent.prototype.showNotification = function () {
        var notification = new NotificationProperties();
        notification.type = "success";
        notification.title = "Notification Sent Successfully";
        this.notificationService.show(notification);
    };
    FeedbackComponent = __decorate([
        Component({
            selector: 'feedback',
            template: "\n  \n  <div class=\"ot-form-container \">\n    <div class=\"ot-modal-content\">\n      <div class=\"ot-tp-modal-elements\">\n        <div class=\"ot-form-group\">\n          <label class=\"ot-form-control-label ot-required\">Subject</label>\n          <input type=\"text\" trim=\"blur\" maxlength=\"50\" [(ngModel)]=\"subject\"  class='ot-text'  required>\n        </div>\n        <div class=\"ot-form-group\">\n          <label class=\"ot-form-control-label\">Notes</label>\n          <textarea class=\"ot-form-control ot-feedback-textarea\" maxlength=\"1400\" [(ngModel)]=\"comments\"  placeholder=\"Please describe your concern or issue and provide as many specifics as possible.\" >\n        </textarea>\n        </div>\n      </div>\n    </div>\n    <div class=\"ot-modal-footer ot-hb-feedback-modal-footer \">\n      <div class=\"ot-form-footer\">\n        <button class=\"ot-primary\" [disabled]=\"subject==''\"  (click)=\"sendFeedback()\" type=\"button\">Send</button>\n        <button class=\"ot-secondary\" (click)=\"cancel()\" type=\"button\">Cancel</button>\n      </div>\n    </div>\n  </div>\n\n  "
        }),
        __metadata("design:paramtypes", [TGOCPNGService, HamburgerService, MessageService, NotificationService, DialogService])
    ], FeedbackComponent);
    return FeedbackComponent;
}());
export { FeedbackComponent };
var HamburgerModule = /** @class */ (function () {
    function HamburgerModule() {
    }
    HamburgerModule = __decorate([
        NgModule({
            imports: [CommonModule, PerfectScrollbarModule, ModalModule, FormsModule],
            declarations: [],
            exports: [FormsModule],
            providers: [HamburgerService, MessageService],
        })
    ], HamburgerModule);
    return HamburgerModule;
}());
export { HamburgerModule };
//# sourceMappingURL=feedback.component.js.map
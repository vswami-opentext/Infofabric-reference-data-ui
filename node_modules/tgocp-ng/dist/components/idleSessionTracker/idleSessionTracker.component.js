var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Pipe, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Idle, DocumentInterruptSource } from '@ng-idle/core';
import { DialogueboxService } from '../dialoguebox/dialoguebox.service';
import { DialogueboxModule } from '../dialoguebox/dialoguebox.component';
import { HttpModule } from '@angular/http';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
var MinuteSecondsPipe = /** @class */ (function () {
    function MinuteSecondsPipe() {
    }
    MinuteSecondsPipe.prototype.transform = function (value) {
        var minutes = Math.floor(value / 60);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        var seconds = (value - minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return minutes + ':' + seconds;
    };
    MinuteSecondsPipe = __decorate([
        Pipe({
            name: 'minuteSeconds'
        })
    ], MinuteSecondsPipe);
    return MinuteSecondsPipe;
}());
export { MinuteSecondsPipe };
var IdleSessionTrackerComponent = /** @class */ (function () {
    function IdleSessionTrackerComponent(element, dialogueboxService, minutePipe, idle) {
        this.element = element;
        this.dialogueboxService = dialogueboxService;
        this.minutePipe = minutePipe;
        this.idle = idle;
        this.idleState = 'Not started.';
        this.timedOut = false;
        this.lastPing = null;
        this.header = "Session timeout";
        this.isVisible = false;
        this.showFooter = true;
        this.keepAliveFn = new EventEmitter();
        this.isChild = false;
        this.idleTime = 1680;
        this.warningTime = 120;
        this.logoutMethod = new EventEmitter();
    }
    IdleSessionTrackerComponent.prototype.ngOnInit = function () {
        var _this = this;
        // sets an idle timeout 
        this.idle.setIdle(this.idleTime); //1680->28mins
        // sets a timeout period of 15 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        this.idle.setTimeout(this.warningTime); //2mins
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        this.idle.setInterrupts([new DocumentInterruptSource('click keydown')]);
        //   this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        this.idle.onIdleEnd.subscribe(function () {
            // this.idleState = '<div>No longer idle.  Do you want to stay signed in?</div>';
            // this.isVisible = false;
            /*  if (this.isChild == false) {
                 this.callKeepAlive();
             } */
        });
        this.idle.onTimeout.subscribe(function () {
            _this.showFooter = false;
            _this.idleState = '<div>Your session has expired,</div><div> you will be redirected to login page. </div>';
            _this.timedOut = true;
            if (_this.isChild == false) {
                _this.signout("timeout");
            }
        });
        this.idle.onIdleStart.subscribe(function () {
            //this.idleState = 'You\'ve gone idle!'
        });
        this.idle.onTimeoutWarning.subscribe(function (countdown) {
            if (_this.isChild == false) {
                _this.isVisible = true;
                _this.showFooter = true;
                _this.showDialogBox();
                // this.idle.setInterrupts([new DocumentInterruptSource('click keydown')]);
                _this.idle.clearInterrupts();
            }
            countdown = _this.minutePipe.transform(countdown);
            _this.idleState = '<div>Your session will expire in <b>' + countdown + '</b> seconds!</div><div> Do you want to stay signed in?</div>';
        });
        this.idle.watch();
    };
    IdleSessionTrackerComponent.prototype.signout = function (type) {
        this.idle.stop();
        this.isVisible = false;
        this.logoutMethod.emit(type);
    };
    IdleSessionTrackerComponent.prototype.callKeepAlive = function () {
        this.idle.setInterrupts([new DocumentInterruptSource('click keydown')]);
        this.idle.setIdle(this.idleTime); //1680->28mins
        // sets a timeout period of 15 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        this.idle.setTimeout(this.warningTime); //2mins
        this.idle.watch();
        this.keepAliveFn.emit();
    };
    IdleSessionTrackerComponent.prototype.showDialogBox = function () {
        var _this = this;
        this.dialogueboxService.confirm({
            dialogName: 'idleDialogueBox',
            accept: function () { _this.callKeepAlive(); },
            reject: function () { _this.signout("logout"); }
        });
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], IdleSessionTrackerComponent.prototype, "keepAliveFn", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], IdleSessionTrackerComponent.prototype, "isChild", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], IdleSessionTrackerComponent.prototype, "idleTime", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], IdleSessionTrackerComponent.prototype, "warningTime", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], IdleSessionTrackerComponent.prototype, "logoutMethod", void 0);
    IdleSessionTrackerComponent = __decorate([
        Component({
            selector: 'idle-session-tracker',
            template: "<div *ngIf=\"isVisible==true\"> \n   <ot-dialoguebox  name=\"idleDialogueBox\" overlayClass=\"ot-priority-overlay\" iconClass=\"ot-warning-icon\"  [header]=\"header\" [showFooter]=\"showFooter\" acceptButton=\"Keep me signed in\" rejectButton=\"Sign out\">\n        <ng-container dialog-message>\n        <div>\n            <span [innerHTML]='idleState'></span>\n        </div>\n        </ng-container>\n    </ot-dialoguebox>\n  </div>\n    " /* ,
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css'] */
        }),
        __metadata("design:paramtypes", [ElementRef, DialogueboxService, MinuteSecondsPipe, Idle])
    ], IdleSessionTrackerComponent);
    return IdleSessionTrackerComponent;
}());
export { IdleSessionTrackerComponent };
var IdleSessionTrackerModule = /** @class */ (function () {
    function IdleSessionTrackerModule() {
    }
    IdleSessionTrackerModule = __decorate([
        NgModule({
            imports: [CommonModule, NgIdleKeepaliveModule.forRoot(), DialogueboxModule, HttpModule],
            exports: [IdleSessionTrackerComponent],
            declarations: [MinuteSecondsPipe, IdleSessionTrackerComponent],
            providers: [MinuteSecondsPipe]
        })
    ], IdleSessionTrackerModule);
    return IdleSessionTrackerModule;
}());
export { IdleSessionTrackerModule };
//# sourceMappingURL=idleSessionTracker.component.js.map
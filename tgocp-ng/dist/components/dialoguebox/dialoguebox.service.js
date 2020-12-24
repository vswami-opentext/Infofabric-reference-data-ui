var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var DialogueboxService = /** @class */ (function () {
    function DialogueboxService() {
        this.confirmationSource = new Subject();
        this.confirmationSource$ = this.confirmationSource.asObservable();
        // onAccept() {
        //     debugger;
        //     this.acceptConfirmation.next();
        // }
    }
    // private acceptConfirmation = new Subject<any>();
    // accept = this.acceptConfirmation.asObservable();
    DialogueboxService.prototype.confirm = function (data) {
        this.confirmationSource.next(data);
        //  console.log(this)
        return this;
    };
    DialogueboxService = __decorate([
        Injectable()
    ], DialogueboxService);
    return DialogueboxService;
}());
export { DialogueboxService };
//# sourceMappingURL=dialoguebox.service.js.map
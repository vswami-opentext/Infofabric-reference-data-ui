var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
var FocusDirective = /** @class */ (function () {
    function FocusDirective(hostElement) {
        this.hostElement = hostElement;
    }
    FocusDirective.prototype.ngOnInit = function () {
        if (this.isFocused) {
            this.hostElement.nativeElement.focus();
        }
    };
    __decorate([
        Input('focus'),
        __metadata("design:type", Boolean)
    ], FocusDirective.prototype, "isFocused", void 0);
    FocusDirective = __decorate([
        Directive({
            selector: '[focus]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], FocusDirective);
    return FocusDirective;
}());
export { FocusDirective };
var FocusModule = /** @class */ (function () {
    function FocusModule() {
    }
    FocusModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [FocusDirective],
            declarations: [FocusDirective]
        })
    ], FocusModule);
    return FocusModule;
}());
export { FocusModule };
//# sourceMappingURL=focus.directive.js.map
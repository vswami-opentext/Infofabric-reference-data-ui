var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
var ClickOutsideDirective = /** @class */ (function () {
    function ClickOutsideDirective(elementRef) {
        this.elementRef = elementRef;
        this.otClickOutside = new EventEmitter();
    }
    ClickOutsideDirective.prototype.onClick = function (event, targetElement) {
        if (!targetElement) {
            return;
        }
        var clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.otClickOutside.emit(event);
        }
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ClickOutsideDirective.prototype, "otClickOutside", void 0);
    __decorate([
        HostListener('document:click', ['$event', '$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent, HTMLElement]),
        __metadata("design:returntype", void 0)
    ], ClickOutsideDirective.prototype, "onClick", null);
    ClickOutsideDirective = __decorate([
        Directive({
            selector: '[otClickOutside]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], ClickOutsideDirective);
    return ClickOutsideDirective;
}());
export { ClickOutsideDirective };
//# sourceMappingURL=click-outside.directive.js.map
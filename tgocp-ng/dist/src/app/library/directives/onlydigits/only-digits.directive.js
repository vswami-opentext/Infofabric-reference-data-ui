var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
var OnlyDigitsDirective = /** @class */ (function () {
    function OnlyDigitsDirective(el, renderer, control) {
        this.el = el;
        this.renderer = renderer;
        this.control = control;
    }
    /**old Code start---- */
    /* // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];
    
    @HostListener("keypress", ["$event"])
    public onlyDigits(event: any): void {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }

        if (isNaN(event.key) || event.key == 'Spacebar' || event.key == ' ') {
            this.el.nativeElement
            event.preventDefault();
        }

    }

    @HostListener('paste', ['$event'])
    checkPaste(e: Event) {
        let clipData = '';
        if (window['clipboardData']) { // Internet Explorer
            clipData = window['clipboardData'].getData("Text");
        }
        else
            clipData = (<ClipboardEvent>e).clipboardData.getData('Text');
        if (isNaN(Number(clipData)))
            e.preventDefault();
    } */
    /**old Code end---- */
    OnlyDigitsDirective.prototype.onInputChange = function (event) {
        var _this = this;
        var initalValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        this.control.control.setValue(this.el.nativeElement.value);
        // console.log(initalValue)
        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
            this.renderer.addClass(this.el.nativeElement, 'ot-error');
            setTimeout(function () {
                _this.renderer.removeClass(_this.el.nativeElement, 'ot-error');
            }, 600);
        }
    };
    __decorate([
        HostListener('input', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], OnlyDigitsDirective.prototype, "onInputChange", null);
    OnlyDigitsDirective = __decorate([
        Directive({
            selector: '[onlyDigits]'
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2, NgControl])
    ], OnlyDigitsDirective);
    return OnlyDigitsDirective;
}());
export { OnlyDigitsDirective };
//# sourceMappingURL=only-digits.directive.js.map
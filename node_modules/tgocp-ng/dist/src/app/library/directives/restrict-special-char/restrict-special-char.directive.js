var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, NgModule, Input, HostListener, ElementRef, Renderer2 } from "@angular/core";
var RestrictSpecialCharDirective = /** @class */ (function () {
    function RestrictSpecialCharDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.address_line = new RegExp(/[$><]/);
        this.postal_code = '[,.><]+';
        this.state = '[><.]+';
        this.name = '[*<>]+';
        this.fax = '[^a-zA-Z0-9()]+';
        this.extension = '[^a-zA-Z0-9()]+';
        this.telephone = '[^a-zA-Z0-9\\s]';
        this.email = new RegExp(/[\s&<>*()\\|:;"',.]/);
        this.website = '[<>]+';
        this.company_number = '[&*<>?/;:"\\\\]';
        this.number_format = '[^0-9\\s]';
        this.attention = '[\\s$<>]';
    }
    RestrictSpecialCharDirective.prototype.onBlur = function (event) {
        this.renderer.removeClass(this.el.nativeElement, 'ot-invalid-character');
    };
    RestrictSpecialCharDirective.prototype.onInput = function (event) {
        var input = event.key;
        var isRestricted = this.testPattern(input);
        if (isRestricted) {
            event.preventDefault();
            this.renderer.addClass(this.el.nativeElement, 'ot-invalid-character');
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, 'ot-invalid-character');
        }
    };
    RestrictSpecialCharDirective.prototype.onPaste = function (event) {
        var clipData = '';
        if (window['clipboardData']) { // Internet Explorer           
            clipData = window['clipboardData'].getData("Text");
        }
        else {
            clipData = event.clipboardData.getData('Text');
        }
        var isRestricted = this.testPattern(clipData);
        if (isRestricted) {
            event.preventDefault();
            this.renderer.addClass(this.el.nativeElement, 'ot-invalid-character');
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, 'ot-invalid-character');
        }
    };
    RestrictSpecialCharDirective.prototype.testPattern = function (input) {
        var isRestricted = false;
        switch (this.patternType) {
            case "Address Line":
                isRestricted = this.address_line.test(input);
                break;
            case "Postal Code":
                isRestricted = new RegExp(this.postal_code).test(input);
                break;
            case "State":
                isRestricted = new RegExp(this.state).test(input);
                break;
            case "Name":
                isRestricted = new RegExp(this.name).test(input);
                break;
            case "Fax":
                isRestricted = new RegExp(this.fax).test(input);
                break;
            case "Extension":
                isRestricted = new RegExp(this.extension).test(input);
                break;
            case "Telephone":
                isRestricted = new RegExp(this.telephone).test(input);
                break;
            case "Email":
                isRestricted = this.email.test(input);
                break;
            case "Website":
                isRestricted = new RegExp(this.website).test(input);
                break;
            case "Company Number":
                isRestricted = new RegExp(this.company_number).test(input);
                break;
            case "Number Format":
                isRestricted = new RegExp(this.number_format).test(input);
                break;
            case "Attention":
                isRestricted = new RegExp(this.attention).test(input);
                break;
            default:
                isRestricted = false;
                break;
        }
        return isRestricted;
    };
    __decorate([
        Input('ot-pattern-validator'),
        __metadata("design:type", String)
    ], RestrictSpecialCharDirective.prototype, "patternType", void 0);
    __decorate([
        HostListener('blur', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], RestrictSpecialCharDirective.prototype, "onBlur", null);
    __decorate([
        HostListener('keypress', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], RestrictSpecialCharDirective.prototype, "onInput", null);
    __decorate([
        HostListener('paste', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], RestrictSpecialCharDirective.prototype, "onPaste", null);
    RestrictSpecialCharDirective = __decorate([
        Directive({
            selector: '[ot-pattern-validator]'
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2])
    ], RestrictSpecialCharDirective);
    return RestrictSpecialCharDirective;
}());
export { RestrictSpecialCharDirective };
var RestrictSpecialCharModule = /** @class */ (function () {
    function RestrictSpecialCharModule() {
    }
    RestrictSpecialCharModule = __decorate([
        NgModule({
            imports: [],
            exports: [RestrictSpecialCharDirective],
            declarations: [RestrictSpecialCharDirective]
        })
    ], RestrictSpecialCharModule);
    return RestrictSpecialCharModule;
}());
export { RestrictSpecialCharModule };
//# sourceMappingURL=restrict-special-char.directive.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, NgModule, HostListener, ElementRef, Input, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
var NumericDirective = /** @class */ (function () {
    function NumericDirective(el, renderer, control) {
        this.el = el;
        this.renderer = renderer;
        this.control = control;
        this.allowDecimals = true;
        this.allowSign = true;
        this.decimalSeparator = '.';
        this.previousValue = '';
        this.integerUnsigned = '^[0-9]*$';
        this.integerSigned = '^-?[0-9]+$';
        this.decimalUnsigned = '^[0-9]+(.[0-9]+)?$';
        this.decimalSigned = '^-?[0-9]+(.[0-9]+)?$';
    }
    NumericDirective.prototype.ngOnInit = function () {
        //called after the constructor and called  after the first ngOnChanges() 
        if (!this.allowDecimals && !this.allowSign)
            this.regex = this.integerUnsigned;
        if (!this.allowDecimals && this.allowSign)
            this.regex = this.integerSigned;
        if (this.allowDecimals && !this.allowSign)
            this.regex = this.decimalUnsigned;
        if (this.allowDecimals && this.allowSign)
            this.regex = this.decimalSigned;
    };
    //private regex : string = 
    NumericDirective.prototype.onInputChange = function (event) {
        var initalValue = this.el.nativeElement.value;
        var signExists = initalValue.includes('-');
        var separatorExists = initalValue.includes(this.decimalSeparator);
        var cursorPosition = this.el.nativeElement.selectionStart;
        var keyIn = event.key;
        // Allow key codes for special events. Reflect :
        // Backspace, tab, end, home
        var specialKeys = ['Backspace', 'Tab', 'End', 'Home', 'Delete'];
        // when minus sign is allowed, add its key to allowed key only when the
        // cursor is in the first position
        if (this.allowSign && !signExists && cursorPosition == 0) {
            specialKeys.push('-');
        }
        if (this.allowDecimals && !separatorExists) {
            specialKeys.push(this.decimalSeparator);
        }
        if (specialKeys.indexOf(keyIn) !== -1) {
            return;
        }
        this.previousValue = initalValue;
        /*  if(separatorExists){
           const separatorPosition = initalValue.indexOf(this.decimalSeparator);
           if(separatorPosition==0){initalValue= 0 + initalValue}
           else if(separatorPosition>0 && initalValue.charAt(separatorPosition-1)=='-') {
            initalValue.splice(separatorPosition,0,0);
           }
         } */
        //this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        /* console.log(initalValue, this.el.nativeElement.value)
        if (initalValue !== this.el.nativeElement.value) {
          event.stopPropagation();
        } */
        var isNumber = (new RegExp(this.integerUnsigned)).test(keyIn);
        if (isNumber) {
            this.renderer.removeClass(this.el.nativeElement, 'ot-error');
            return;
        }
        else {
            this.renderer.addClass(this.el.nativeElement, 'ot-error');
            event.preventDefault();
        }
        /* let next: string = initalValue.concat(keyIn);
        this.validateValue(next);
        event.preventDefault(); */
        /* console.log(next,String(next).match(this.regex));
        if (next && String(next).match(this.regex)) {
          this.el.nativeElement.value=next;
        }else{
          event.preventDefault();
        } */
    };
    /**
     * Event handler for host's blur event
     * */
    NumericDirective.prototype.onBlur = function () {
        this.validateValue(this.el.nativeElement.value);
    };
    NumericDirective.prototype.checkPaste = function (e) {
        var clipData = '';
        if (window['clipboardData']) { // Internet Explorer           
            clipData = window['clipboardData'].getData("Text");
        }
        else {
            clipData = e.clipboardData.getData('Text');
        }
        e.preventDefault();
        this.validateValue(clipData);
    };
    NumericDirective.prototype.validateValue = function (value) {
        var _this = this;
        // when a numbers begins with a decimal separator,
        // fix it adding a zero in the beginning
        var firstCharacter = value.charAt(0);
        if (firstCharacter == this.decimalSeparator)
            value = 0 + value;
        else if (firstCharacter == '-' && value.charAt(1) == this.decimalSeparator) {
            var valArray = value.split('');
            valArray.splice(1, 0, "0");
            value = valArray.join('');
        }
        // when a numbers ends with a decimal separator,
        // fix it adding a zero in the end
        var lastCharacter = value.charAt(value.length - 1);
        if (lastCharacter == this.decimalSeparator)
            value = value + 0;
        // test number with regular expression, when
        // number is invalid, replace it with a zero
        var valid = (new RegExp(this.regex)).test(value);
        if (valid) {
            this.control.control.setValue(value); //this.el.nativeElement.value = value;
        }
        else {
            // this.control.control.setErrors({'invalidChar':true});    
            this.renderer.addClass(this.el.nativeElement, 'ot-error');
            setTimeout(function () {
                _this.renderer.removeClass(_this.el.nativeElement, 'ot-error');
                _this.control.control.setValue('');
            }, 600);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NumericDirective.prototype, "allowDecimals", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NumericDirective.prototype, "allowSign", void 0);
    __decorate([
        HostListener('keypress', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], NumericDirective.prototype, "onInputChange", null);
    __decorate([
        HostListener('blur', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NumericDirective.prototype, "onBlur", null);
    __decorate([
        HostListener('paste', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], NumericDirective.prototype, "checkPaste", null);
    NumericDirective = __decorate([
        Directive({
            selector: 'input[numeric], textarea[numeric]'
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2, NgControl])
    ], NumericDirective);
    return NumericDirective;
}());
export { NumericDirective };
var NumericModule = /** @class */ (function () {
    function NumericModule() {
    }
    NumericModule = __decorate([
        NgModule({
            imports: [],
            exports: [NumericDirective],
            declarations: [NumericDirective]
        })
    ], NumericModule);
    return NumericModule;
}());
export { NumericModule };
//# sourceMappingURL=numeric.directive.js.map
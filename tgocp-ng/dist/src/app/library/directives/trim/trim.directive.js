var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, HostListener, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';
var TrimDirective = /** @class */ (function (_super) {
    __extends(TrimDirective, _super);
    function TrimDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ngOnChange = function (val) {
            _this.onChange(val.trim());
        };
        _this.ngOnBlur = function (val) {
            _this.writeValue(val.trim());
            _this.onTouched();
        };
        return _this;
    }
    TrimDirective_1 = TrimDirective;
    TrimDirective.prototype.writeValue = function (value) {
        if (typeof value === 'string') {
            value = value.trim();
        }
        _super.prototype.writeValue.call(this, value);
    };
    var TrimDirective_1;
    __decorate([
        HostListener('input', ['$event.target.value']),
        __metadata("design:type", Object)
    ], TrimDirective.prototype, "ngOnChange", void 0);
    __decorate([
        HostListener('blur', ['$event.target.value']),
        __metadata("design:type", Object)
    ], TrimDirective.prototype, "ngOnBlur", void 0);
    TrimDirective = TrimDirective_1 = __decorate([
        Directive({
            selector: 'input[trim], textarea[trim]',
            providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: TrimDirective_1, multi: true }]
        })
    ], TrimDirective);
    return TrimDirective;
}(DefaultValueAccessor));
export { TrimDirective };
var TrimModule = /** @class */ (function () {
    function TrimModule() {
    }
    TrimModule = __decorate([
        NgModule({
            imports: [],
            exports: [TrimDirective],
            declarations: [TrimDirective]
        })
    ], TrimModule);
    return TrimModule;
}());
export { TrimModule };
//# sourceMappingURL=trim.directive.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
var Slider = /** @class */ (function () {
    function Slider() {
    }
    Slider = __decorate([
        Component({
            selector: 'ot-slider',
            template: "\n      \n    ",
            providers: [DomHandler]
        })
    ], Slider);
    return Slider;
}());
export { Slider };
var SliderModule = /** @class */ (function () {
    function SliderModule() {
    }
    SliderModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Slider],
            declarations: [Slider]
        })
    ], SliderModule);
    return SliderModule;
}());
export { SliderModule };
//# sourceMappingURL=slider.js.map
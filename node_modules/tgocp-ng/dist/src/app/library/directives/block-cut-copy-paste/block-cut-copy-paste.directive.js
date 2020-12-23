var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, HostListener, Input } from '@angular/core';
var BlockCutCopyPasteDirective = /** @class */ (function () {
    function BlockCutCopyPasteDirective() {
    }
    BlockCutCopyPasteDirective.prototype.blockPaste = function (e) {
        this.doBlockEvent(e);
    };
    BlockCutCopyPasteDirective.prototype.blockCopy = function (e) {
        this.doBlockEvent(e);
    };
    BlockCutCopyPasteDirective.prototype.blockCut = function (e) {
        this.doBlockEvent(e);
    };
    BlockCutCopyPasteDirective.prototype.doBlockEvent = function (e) {
        if (this.isBlockCutCopyPaste) {
            e.preventDefault();
        }
    };
    __decorate([
        Input("otBlockCutCopyPaste"),
        __metadata("design:type", Boolean)
    ], BlockCutCopyPasteDirective.prototype, "isBlockCutCopyPaste", void 0);
    __decorate([
        HostListener('paste', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], BlockCutCopyPasteDirective.prototype, "blockPaste", null);
    __decorate([
        HostListener('copy', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], BlockCutCopyPasteDirective.prototype, "blockCopy", null);
    __decorate([
        HostListener('cut', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], BlockCutCopyPasteDirective.prototype, "blockCut", null);
    BlockCutCopyPasteDirective = __decorate([
        Directive({
            selector: '[otBlockCutCopyPaste]'
        }),
        __metadata("design:paramtypes", [])
    ], BlockCutCopyPasteDirective);
    return BlockCutCopyPasteDirective;
}());
export { BlockCutCopyPasteDirective };
//# sourceMappingURL=block-cut-copy-paste.directive.js.map
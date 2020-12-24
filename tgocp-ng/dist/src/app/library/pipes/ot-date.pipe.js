var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Pipe, NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
/**
 * Supports Mon Jul 11 10:56:54 GMT-00:00 2016
 * IE11 doesn't support above date format with ":" in timezone details.
 * This Pipe is written to fix mentioned date format problem in IE11.
 * It replaces the ":" in the second last word of the string with "" empty space.
 *
 */
var OtDatePipe = /** @class */ (function () {
    function OtDatePipe(datePipe) {
        this.datePipe = datePipe;
    }
    OtDatePipe.prototype.transform = function (date, args) {
        var formattedDate = "";
        if (date && typeof date == "string") {
            var dateArray = date.split(" ");
            if (dateArray.length == 6) {
                dateArray[dateArray.length - 2] = dateArray[dateArray.length - 2].replace(":", "");
                formattedDate = dateArray.join(" ");
            }
            else {
                formattedDate = date;
            }
        }
        else {
            formattedDate = date;
        }
        if (isNaN(new Date(formattedDate).getTime())) {
            return date;
        }
        return this.datePipe.transform(formattedDate, 'MM/dd/y');
    };
    OtDatePipe = __decorate([
        Pipe({
            name: 'otDatePipe'
        }),
        __metadata("design:paramtypes", [DatePipe])
    ], OtDatePipe);
    return OtDatePipe;
}());
export { OtDatePipe };
var OtDatePipeModule = /** @class */ (function () {
    function OtDatePipeModule() {
    }
    OtDatePipeModule = __decorate([
        NgModule({
            providers: [DatePipe],
            declarations: [OtDatePipe],
            exports: [OtDatePipe]
        })
    ], OtDatePipeModule);
    return OtDatePipeModule;
}());
export { OtDatePipeModule };
//# sourceMappingURL=ot-date.pipe.js.map
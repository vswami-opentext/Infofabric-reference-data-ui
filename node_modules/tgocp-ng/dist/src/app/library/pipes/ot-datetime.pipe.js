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
var OtDateTimePipe = /** @class */ (function () {
    function OtDateTimePipe(datePipe) {
        this.datePipe = datePipe;
    }
    OtDateTimePipe.prototype.transform = function (date, args) {
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
        if (!date) {
            return '';
        }
        if (isNaN(new Date(date).getTime())) {
            return date;
        }
        return this.datePipe.transform(formattedDate, 'MM/dd/y') + ' '
            + this.datePipe.transform(formattedDate, 'shortTime');
    };
    OtDateTimePipe = __decorate([
        Pipe({
            name: 'otDateTimePipe'
        }),
        __metadata("design:paramtypes", [DatePipe])
    ], OtDateTimePipe);
    return OtDateTimePipe;
}());
export { OtDateTimePipe };
var OtDateTimePipeModule = /** @class */ (function () {
    function OtDateTimePipeModule() {
    }
    OtDateTimePipeModule = __decorate([
        NgModule({
            providers: [DatePipe],
            declarations: [OtDateTimePipe],
            exports: [OtDateTimePipe]
        })
    ], OtDateTimePipeModule);
    return OtDateTimePipeModule;
}());
export { OtDateTimePipeModule };
//# sourceMappingURL=ot-datetime.pipe.js.map
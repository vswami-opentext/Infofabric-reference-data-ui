import { PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
/**
 * Supports Mon Jul 11 10:56:54 GMT-00:00 2016
 * IE11 doesn't support above date format with ":" in timezone details.
 * This Pipe is written to fix mentioned date format problem in IE11.
 * It replaces the ":" in the second last word of the string with "" empty space.
 *
 */
export declare class OtDateTimePipe implements PipeTransform {
    private datePipe;
    constructor(datePipe: DatePipe);
    transform(date: any, args?: any): any;
}
export declare class OtDateTimePipeModule {
}

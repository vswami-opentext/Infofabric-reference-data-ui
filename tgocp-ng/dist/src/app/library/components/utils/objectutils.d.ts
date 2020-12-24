import { SelectItem } from '../common/selectitem';
export declare class ObjectUtils {
    equals(obj1: any, obj2: any, field?: string): boolean;
    equalsByValue(obj1: any, obj2: any): boolean;
    resolveFieldData(data: any, field: string): any;
    filter(value: any[], fields: any[], filterValue: string): any[];
    filterByMode(value: any[], fields: any[], filterValue: string, filterMode: string): any[];
    reorderArray(value: any[], from: number, to: number): void;
    generateSelectItems(val: any[], field: string): SelectItem[];
    static reorderArray(value: any[], from: number, to: number): void;
    static removeAccents(str: any): any;
    static isFunction(obj: any): boolean;
    static resolveFieldData(data: any, field: any): any;
}

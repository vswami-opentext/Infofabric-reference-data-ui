import { DefaultValueAccessor } from '@angular/forms';
export declare class TrimDirective extends DefaultValueAccessor {
    ngOnChange: (val: string) => void;
    ngOnBlur: (val: string) => void;
    writeValue(value: any): void;
}
export declare class TrimModule {
}

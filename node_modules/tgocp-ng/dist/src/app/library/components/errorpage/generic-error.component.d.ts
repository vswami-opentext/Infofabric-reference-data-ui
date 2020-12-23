import { Location } from '@angular/common';
export declare class GenericErrorComponent {
    private location;
    errorMsg: Array<string>;
    errorMessage: string;
    pageNotFound: boolean;
    constructor(location: Location);
    goback(): void;
    ngOnInit(): void;
}

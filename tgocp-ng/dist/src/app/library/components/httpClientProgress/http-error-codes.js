import { throwError as observableThrowError } from 'rxjs';
import { Response } from '@angular/http';
var HttpErrorCodes = /** @class */ (function () {
    function HttpErrorCodes() {
    }
    HttpErrorCodes.handleError = function (error) {
        var errMsg;
        if (error instanceof Response) {
            if (error.status == 500) {
                errMsg = "Internal Server Error";
            }
            else if (error.status == 404) {
                errMsg = "Requested page or url not found.";
            }
            else if (error.status == 400) {
                errMsg = "Bad Request.";
            }
            else if (error.status == 401) {
                errMsg = "You are unauthorised to access this.";
            }
            else if (error.status == 403) {
                errMsg = "Frbidden error.";
            }
            else if (error.status == 503) {
                errMsg = "Service unavailable.";
            }
            else if (error.status == 504) {
                errMsg = "Unable to conect to the server.";
            }
            else {
                errMsg = "Something went wrong, please try again.";
            }
        }
        return observableThrowError(errMsg);
    };
    return HttpErrorCodes;
}());
export { HttpErrorCodes };
//# sourceMappingURL=http-error-codes.js.map
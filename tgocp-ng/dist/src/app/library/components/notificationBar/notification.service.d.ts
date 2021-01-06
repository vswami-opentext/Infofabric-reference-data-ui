import { Observable } from 'rxjs';
import { NotificationProperties } from "./notification.properties";
export declare class NotificationService {
    private notificationSubject;
    notificationState: Observable<NotificationProperties>;
    private properties;
    constructor();
    show(properties: NotificationProperties): void;
    hide(): void;
}

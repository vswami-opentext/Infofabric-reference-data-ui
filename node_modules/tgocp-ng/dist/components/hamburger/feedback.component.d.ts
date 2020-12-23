import { MessageService } from '../common/messageservice';
import { TGOCPNGService } from '../..';
import { NotificationService } from '../notificationBar/notification.service';
import { HamburgerService } from './service/hamburger.service';
import { DialogService } from '../dynamic-dialog/dialogservice';
export declare class FeedbackComponent {
    private uiModal;
    hambService: HamburgerService;
    messageService: MessageService;
    notificationService: NotificationService;
    dialogueService: DialogService;
    subject: string;
    comments: any;
    feedbackData: any;
    ref: any;
    constructor(uiModal: TGOCPNGService, hambService: HamburgerService, messageService: MessageService, notificationService: NotificationService, dialogueService: DialogService);
    ngOnInit(): void;
    cancel(): void;
    sendFeedback(): void;
    showNotification(): void;
}
export declare class HamburgerModule {
}

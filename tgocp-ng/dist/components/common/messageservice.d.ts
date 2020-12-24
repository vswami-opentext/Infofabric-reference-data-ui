import { Observable } from 'rxjs';
import { Message } from './message';
export declare class MessageService {
    private messageSource;
    messageObserver: Observable<Message>;
    add(message: Message): void;
    addAll(messages: any): void;
    clear(): void;
}

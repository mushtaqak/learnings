import { CreateEventTypeInput, UpdateEventTypeInput } from 'src/input-types';
import { EventType } from 'src/models';
import { EventTypeService } from '../services/event-type.service';
export declare class EventTypeResolver {
    private readonly eventTypeService;
    constructor(eventTypeService: EventTypeService);
    createEventType(data: CreateEventTypeInput): Promise<EventType>;
    findAll(): Promise<EventType[]>;
    findOne(event: string): Promise<EventType>;
    updateEventType(data: UpdateEventTypeInput): string;
    removeEventType(id: string): Promise<boolean>;
}

import { Repository } from 'typeorm';
import { FlowTypeService } from 'src/services';
import { CreateEventTypeInput, UpdateEventTypeInput } from 'src/input-types';
import { EventType } from 'src/models/event-type.entity';
export declare class EventTypeService {
    private eventTypeRepository;
    private FlowTypeService;
    constructor(eventTypeRepository: Repository<EventType>, FlowTypeService: FlowTypeService);
    create(data: CreateEventTypeInput): Promise<EventType>;
    findAll(): Promise<EventType[]>;
    findOne(event: string): Promise<EventType>;
    update(id: string, data: UpdateEventTypeInput): string;
    remove(id: string): Promise<boolean>;
}

import { EventTypeService } from 'src/services';
export declare class EventTypeController {
    private readonly eventTypeService;
    constructor(eventTypeService: EventTypeService);
    findAll(): Promise<import("../models").EventType[]>;
}

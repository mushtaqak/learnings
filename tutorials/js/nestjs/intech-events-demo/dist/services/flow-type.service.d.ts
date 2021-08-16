import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateFlowTypeInput, UpdateFlowTypeInput } from '../input-types';
import { FlowType } from 'src/models/flow-type.entity';
export declare class FlowTypeService {
    private flowTypeRepository;
    logger: Logger;
    constructor(flowTypeRepository: Repository<FlowType>);
    create(data: CreateFlowTypeInput): Promise<FlowType>;
    findAll(): Promise<FlowType[]>;
    findOne(name: string): Promise<FlowType>;
    update(id: string, data: UpdateFlowTypeInput): string;
    remove(id: string): Promise<FlowType>;
}

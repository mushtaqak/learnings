import { FlowTypeService } from '../services/flow-type.service';
import { FlowType } from '../models';
import { CreateFlowTypeInput, UpdateFlowTypeInput } from '../input-types';
import { ConfigService } from '@nestjs/config';
export declare class FlowTypeResolver {
    private readonly flowTypeService;
    private configService;
    constructor(flowTypeService: FlowTypeService, configService: ConfigService);
    createFlowType(data: CreateFlowTypeInput): Promise<FlowType>;
    findAll(): Promise<FlowType[]>;
    findOne(name: string): Promise<FlowType>;
    updateFlowType(data: UpdateFlowTypeInput): string;
    removeFlowType(id: string): Promise<FlowType>;
}

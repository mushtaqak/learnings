import { FlowType } from 'src/models';
import { FlowTypeService } from '../services/flow-type.service';
export declare class FlowTypeController {
    private readonly flowTypeService;
    constructor(flowTypeService: FlowTypeService);
    findAll(): Promise<FlowType[]>;
    findOne(params: any): Promise<FlowType>;
}

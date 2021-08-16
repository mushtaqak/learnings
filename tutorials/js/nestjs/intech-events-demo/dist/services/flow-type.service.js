"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FlowTypeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const flow_type_entity_1 = require("../models/flow-type.entity");
let FlowTypeService = FlowTypeService_1 = class FlowTypeService {
    constructor(flowTypeRepository) {
        this.flowTypeRepository = flowTypeRepository;
        this.logger = new common_1.Logger(FlowTypeService_1.name);
    }
    async create(data) {
        const flowTypeData = this.flowTypeRepository.create(data);
        const flowType = await this.flowTypeRepository.save(flowTypeData);
        return flowType;
    }
    async findAll() {
        this.logger.log("Finding all flow types");
        const flowTypes = await this.flowTypeRepository.find();
        this.logger.log({ flowTypes });
        return flowTypes;
    }
    async findOne(name) {
        const flowType = await this.flowTypeRepository.findOne({ name });
        return flowType;
    }
    update(id, data) {
        return `This action updates a #${id} flowType`;
    }
    async remove(id) {
        const flowType = this.flowTypeRepository.findOne({ id });
        this.flowTypeRepository.delete(id);
        return flowType;
    }
};
FlowTypeService = FlowTypeService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(flow_type_entity_1.FlowType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FlowTypeService);
exports.FlowTypeService = FlowTypeService;
//# sourceMappingURL=flow-type.service.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const services_1 = require("./");
const input_types_1 = require("../input-types");
const event_type_entity_1 = require("../models/event-type.entity");
let EventTypeService = class EventTypeService {
    constructor(eventTypeRepository, FlowTypeService) {
        this.eventTypeRepository = eventTypeRepository;
        this.FlowTypeService = FlowTypeService;
    }
    async create(data) {
        const eventTypeData = this.eventTypeRepository.create(data);
        if (data === null || data === void 0 ? void 0 : data.flowType) {
            eventTypeData.flowType = await this.FlowTypeService.create(data.flowType);
        }
        const eventType = await this.eventTypeRepository.save(eventTypeData);
        return eventType;
    }
    async findAll() {
        const EventTypes = await this.eventTypeRepository.find();
        return EventTypes;
    }
    async findOne(event) {
        const eventType = await this.eventTypeRepository.findOne({ event });
        return eventType;
    }
    update(id, data) {
        return `This action updates a #${id} EventType`;
    }
    async remove(id) {
        return true;
    }
};
EventTypeService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(event_type_entity_1.EventType)),
    __param(1, common_1.Inject(common_1.forwardRef(() => services_1.FlowTypeService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        services_1.FlowTypeService])
], EventTypeService);
exports.EventTypeService = EventTypeService;
//# sourceMappingURL=event-type.service.js.map
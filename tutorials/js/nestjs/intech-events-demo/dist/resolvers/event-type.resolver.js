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
exports.EventTypeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const input_types_1 = require("../input-types");
const models_1 = require("../models");
const event_type_service_1 = require("../services/event-type.service");
let EventTypeResolver = class EventTypeResolver {
    constructor(eventTypeService) {
        this.eventTypeService = eventTypeService;
    }
    createEventType(data) {
        return this.eventTypeService.create(data);
    }
    findAll() {
        return this.eventTypeService.findAll();
    }
    findOne(event) {
        return this.eventTypeService.findOne(event);
    }
    updateEventType(data) {
        return this.eventTypeService.update(data.id, data);
    }
    removeEventType(id) {
        return this.eventTypeService.remove(id);
    }
};
__decorate([
    graphql_1.Mutation(() => models_1.EventType),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_types_1.CreateEventTypeInput]),
    __metadata("design:returntype", void 0)
], EventTypeResolver.prototype, "createEventType", null);
__decorate([
    graphql_1.Query(() => [models_1.EventType], { name: 'eventTypes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventTypeResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => models_1.EventType, { name: 'eventType' }),
    __param(0, graphql_1.Args('event', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventTypeResolver.prototype, "findOne", null);
__decorate([
    graphql_1.Mutation(() => models_1.EventType),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_types_1.UpdateEventTypeInput]),
    __metadata("design:returntype", void 0)
], EventTypeResolver.prototype, "updateEventType", null);
__decorate([
    graphql_1.Mutation(() => models_1.EventType),
    __param(0, graphql_1.Args('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventTypeResolver.prototype, "removeEventType", null);
EventTypeResolver = __decorate([
    graphql_1.Resolver(() => models_1.EventType),
    __metadata("design:paramtypes", [event_type_service_1.EventTypeService])
], EventTypeResolver);
exports.EventTypeResolver = EventTypeResolver;
//# sourceMappingURL=event-type.resolver.js.map
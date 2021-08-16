"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const modules_1 = require("./");
const event_type_service_1 = require("../services/event-type.service");
const event_type_resolver_1 = require("../resolvers/event-type.resolver");
const models_1 = require("../models");
const event_type_controller_1 = require("../controllers/event-type.controller");
let EventTypeModule = class EventTypeModule {
};
EventTypeModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([models_1.EventType]), common_1.forwardRef(() => modules_1.FlowTypeModule)],
        providers: [event_type_service_1.EventTypeService, event_type_resolver_1.EventTypeResolver],
        exports: [event_type_service_1.EventTypeService],
        controllers: [event_type_controller_1.EventTypeController]
    })
], EventTypeModule);
exports.EventTypeModule = EventTypeModule;
//# sourceMappingURL=event-type.module.js.map
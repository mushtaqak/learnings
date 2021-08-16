"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowTypeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const modules_1 = require("./");
const flow_type_service_1 = require("../services/flow-type.service");
const flow_type_resolver_1 = require("../resolvers/flow-type.resolver");
const flow_type_entity_1 = require("../models/flow-type.entity");
const config_1 = require("@nestjs/config");
const flow_type_controller_1 = require("../controllers/flow-type.controller");
let FlowTypeModule = class FlowTypeModule {
};
FlowTypeModule = __decorate([
    common_1.Module({
        imports: [common_1.forwardRef(() => modules_1.EventTypeModule), typeorm_1.TypeOrmModule.forFeature([flow_type_entity_1.FlowType]), config_1.ConfigModule],
        providers: [flow_type_service_1.FlowTypeService, flow_type_resolver_1.FlowTypeResolver],
        exports: [flow_type_service_1.FlowTypeService],
        controllers: [flow_type_controller_1.FlowTypeController]
    })
], FlowTypeModule);
exports.FlowTypeModule = FlowTypeModule;
//# sourceMappingURL=flow-type.module.js.map
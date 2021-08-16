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
exports.FlowTypeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const flow_type_service_1 = require("../services/flow-type.service");
const models_1 = require("../models");
const input_types_1 = require("../input-types");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
let FlowTypeResolver = class FlowTypeResolver {
    constructor(flowTypeService, configService) {
        this.flowTypeService = flowTypeService;
        this.configService = configService;
    }
    createFlowType(data) {
        return this.flowTypeService.create(data);
    }
    findAll() {
        common_1.Logger.log(this.configService.get("TYPEORM_DATABASE"));
        common_1.Logger.log(this.configService.get("MODE"));
        common_1.Logger.log(this.configService.get("ROUTER_CONFIG_URL"));
        common_1.Logger.log(this.configService.get("ROUTER_CONFIG_PORT"));
        return this.flowTypeService.findAll();
    }
    findOne(name) {
        return this.flowTypeService.findOne(name);
    }
    updateFlowType(data) {
        return this.flowTypeService.update(data.id, data);
    }
    removeFlowType(id) {
        return this.flowTypeService.remove(id);
    }
};
__decorate([
    graphql_1.Mutation(() => models_1.FlowType),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_types_1.CreateFlowTypeInput]),
    __metadata("design:returntype", void 0)
], FlowTypeResolver.prototype, "createFlowType", null);
__decorate([
    graphql_1.Query(() => [models_1.FlowType], { name: 'flowTypes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FlowTypeResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => models_1.FlowType, { name: 'flowType' }),
    __param(0, graphql_1.Args('name', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlowTypeResolver.prototype, "findOne", null);
__decorate([
    graphql_1.Mutation(() => models_1.FlowType),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_types_1.UpdateFlowTypeInput]),
    __metadata("design:returntype", void 0)
], FlowTypeResolver.prototype, "updateFlowType", null);
__decorate([
    graphql_1.Mutation(() => models_1.FlowType),
    __param(0, graphql_1.Args('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlowTypeResolver.prototype, "removeFlowType", null);
FlowTypeResolver = __decorate([
    graphql_1.Resolver(() => models_1.FlowType),
    __metadata("design:paramtypes", [flow_type_service_1.FlowTypeService,
        config_1.ConfigService])
], FlowTypeResolver);
exports.FlowTypeResolver = FlowTypeResolver;
//# sourceMappingURL=flow-type.resolver.js.map
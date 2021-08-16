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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowType = void 0;
const graphql_1 = require("@nestjs/graphql");
const models_1 = require("./");
const typeorm_1 = require("typeorm");
let FlowType = class FlowType {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], FlowType.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String, { description: 'Name of FlowType' }),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], FlowType.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String, { description: 'Discription of FlowType', nullable: true }),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], FlowType.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => [models_1.EventType]),
    typeorm_1.OneToMany(() => models_1.EventType, (eventType) => eventType.flowType, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], FlowType.prototype, "eventTypes", void 0);
FlowType = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], FlowType);
exports.FlowType = FlowType;
//# sourceMappingURL=flow-type.entity.js.map
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
exports.CreateFlowTypeInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const input_types_1 = require("./");
let CreateFlowTypeInput = class CreateFlowTypeInput {
};
__decorate([
    graphql_1.Field(() => String, { description: 'Name of FlowType' }),
    __metadata("design:type", String)
], CreateFlowTypeInput.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String, { description: 'Description of FlowType', nullable: true }),
    __metadata("design:type", String)
], CreateFlowTypeInput.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => [input_types_1.CreateEventTypeInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateFlowTypeInput.prototype, "eventTypes", void 0);
CreateFlowTypeInput = __decorate([
    graphql_1.InputType()
], CreateFlowTypeInput);
exports.CreateFlowTypeInput = CreateFlowTypeInput;
//# sourceMappingURL=create-flow-type.input.js.map
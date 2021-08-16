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
exports.UpdateFlowTypeInput = void 0;
const input_types_1 = require("./");
const graphql_1 = require("@nestjs/graphql");
let UpdateFlowTypeInput = class UpdateFlowTypeInput extends graphql_1.PartialType(input_types_1.CreateFlowTypeInput) {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdateFlowTypeInput.prototype, "id", void 0);
UpdateFlowTypeInput = __decorate([
    graphql_1.InputType()
], UpdateFlowTypeInput);
exports.UpdateFlowTypeInput = UpdateFlowTypeInput;
//# sourceMappingURL=update-flow-type.input.js.map
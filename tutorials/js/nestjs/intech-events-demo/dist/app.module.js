"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const models_1 = require("./models");
const config_1 = require("@nestjs/config");
const typeorm_config_1 = require("./config/typeorm.config");
const flow_type_logger_middleware_1 = require("./middleware/flow-type.logger.middleware");
const event_type_logger_middleware_1 = require("./middleware/event-type.logger.middleware");
const modules_1 = require("./modules");
const ENV = process.env.NODE_ENV;
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(flow_type_logger_middleware_1.FlowTypeLoggerMiddleware)
            .exclude('flowtypes/(.*)')
            .forRoutes({ path: 'flowtypes', method: common_1.RequestMethod.GET });
        consumer
            .apply(event_type_logger_middleware_1.EventTypeLoggerMiddleware)
            .forRoutes({ path: 'eventtypes', method: common_1.RequestMethod.GET });
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: !ENV ? './env/.env.dev' : `./env/.env.${ENV}`
            }),
            typeorm_1.TypeOrmModule.forRootAsync(typeorm_config_1.typeOrmConfigAsync),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'schema.gql',
            }),
            modules_1.EventTypeModule,
            modules_1.FlowTypeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
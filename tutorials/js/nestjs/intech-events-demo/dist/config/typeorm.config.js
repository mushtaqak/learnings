"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfigAsync = void 0;
const config_1 = require("@nestjs/config");
const models_1 = require("../models");
class TypeOrmConfig {
    static getOrmConfig(configService) {
        const database = configService.get("TYPEORM_DATABASE");
        return {
            type: 'postgres',
            host: configService.get("TYPEORM_HOST"),
            username: configService.get("TYPEORM_USER"),
            password: configService.get("TYPEORM_PASSWORD"),
            database: database,
            port: parseInt(configService.get("TYPEORM_PORT")),
            logging: configService.get("TYPEORM_LOGGING") === 'true',
            entities: [models_1.FlowType, models_1.EventType],
            migrationsRun: configService.get("TYPEORM_MIGRATIONS_RUN") === 'false',
            synchronize: configService.get("TYPEORM_SYNCHRONIZE") === 'true'
        };
    }
}
exports.default = TypeOrmConfig;
exports.typeOrmConfigAsync = {
    imports: [config_1.ConfigModule],
    useFactory: async (configService) => TypeOrmConfig.getOrmConfig(configService),
    inject: [config_1.ConfigService]
};
//# sourceMappingURL=typeorm.config.js.map
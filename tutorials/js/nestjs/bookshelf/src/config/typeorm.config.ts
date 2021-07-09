import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Author } from 'src/author';
import { Book } from 'src/book';
import { ScriptRecord } from 'src/script-runner/entities/script-record.entity';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    const database = configService.get("TYPEORM_DATABASE");
    return {
        type: 'postgres' as 'postgres',
        host: configService.get("TYPEORM_HOST"),
        username: configService.get("TYPEORM_USER"),
        password: configService.get("TYPEORM_PASSWORD"),
        database: database,
        port: parseInt(configService.get("TYPEORM_PORT")),
        logging: configService.get("TYPEORM_LOGGING") === 'true',
        entities: [Author, Book, ScriptRecord],
        migrationsRun: configService.get("TYPEORM_MIGRATIONS_RUN") === 'false',
        synchronize: configService.get("TYPEORM_SYNCHRONIZE") === 'true'
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService]
};

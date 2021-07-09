import { Module } from '@nestjs/common';
import { ScriptRunnerService } from './script-runner.service';
import { ScriptRunnerController } from './script-runner.controller';
import { ScriptRunnerResolver } from './script-runner.resolver';
import { ScriptRecord } from './entities/script-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ScriptRecord])],
  providers: [ScriptRunnerService, ScriptRunnerResolver],
  controllers: [ScriptRunnerController],
  exports: [ScriptRunnerService],
})
export class ScriptRunnerModule {}

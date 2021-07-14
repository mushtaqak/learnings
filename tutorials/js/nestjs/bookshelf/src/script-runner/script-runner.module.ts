import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScriptRunnerService } from './script-runner.service';
import { ScriptRunnerController } from './script-runner.controller';
import { ScriptRunnerResolver } from './script-runner.resolver';
import { ScriptRecord } from './entities/script-record.entity';
import { ScriptCreatedListener } from './listeners/script-created.listener';
import { TasksService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScriptRecord]), CacheModule.register()],
  providers: [ScriptRunnerService, TasksService, ScriptRunnerResolver, ScriptCreatedListener],
  controllers: [ScriptRunnerController],
  exports: [ScriptRunnerService],
})
export class ScriptRunnerModule {}

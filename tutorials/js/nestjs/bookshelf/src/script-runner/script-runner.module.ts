import { Module } from '@nestjs/common';
import { ScriptRunnerService } from './script-runner.service';
import { ScriptRunnerController } from './script-runner.controller';

@Module({
  controllers: [ScriptRunnerController],
  providers: [ScriptRunnerService]
})
export class ScriptRunnerModule {}

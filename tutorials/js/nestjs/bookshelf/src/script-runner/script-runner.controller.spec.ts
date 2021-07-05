import { Test, TestingModule } from '@nestjs/testing';
import { ScriptRunnerController } from './script-runner.controller';
import { ScriptRunnerService } from './script-runner.service';

describe('ScriptRunnerController', () => {
  let controller: ScriptRunnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScriptRunnerController],
      providers: [ScriptRunnerService],
    }).compile();

    controller = module.get<ScriptRunnerController>(ScriptRunnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

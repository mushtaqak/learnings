import { Test, TestingModule } from '@nestjs/testing';
import { ScriptRunnerService } from './script-runner.service';

describe('ScriptRunnerService', () => {
  let service: ScriptRunnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScriptRunnerService],
    }).compile();

    service = module.get<ScriptRunnerService>(ScriptRunnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

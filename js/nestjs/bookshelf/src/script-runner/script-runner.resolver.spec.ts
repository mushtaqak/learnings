import { Test, TestingModule } from '@nestjs/testing';
import { ScriptRunnerResolver } from './script-runner.resolver';

describe('ScriptRunnerResolver', () => {
  let resolver: ScriptRunnerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScriptRunnerResolver],
    }).compile();

    resolver = module.get<ScriptRunnerResolver>(ScriptRunnerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

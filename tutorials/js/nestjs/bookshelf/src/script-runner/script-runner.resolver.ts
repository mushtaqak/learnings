import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateScriptRecordInput } from './dto/create-script-record.input';
import { UpdateScriptRecordInput } from './dto/update-script-record.input';
import { ScriptRecord } from './entities/script-record.entity';
import { ScriptRunnerService } from './script-runner.service';

@Resolver(() => ScriptRecord)
export class ScriptRunnerResolver {
  constructor(private readonly scriptRunnerService: ScriptRunnerService) {}

  @Mutation(() => ScriptRecord)
  createScriptRecord(@Args('data') data: CreateScriptRecordInput) {
    return this.scriptRunnerService.create(data);
  }

  @Query(() => [ScriptRecord], { name: 'scripts' })
  findAll() {
    return this.scriptRunnerService.findAll();
  }

  @Query(() => ScriptRecord, { name: 'script' })
  findOne(@Args('name', { type: () => String }) name: string) {
    return this.scriptRunnerService.findOne(name);
  }

  @Mutation(() => ScriptRecord)
  updateScriptRecord(@Args('data') data: UpdateScriptRecordInput) {
    return this.scriptRunnerService.update(data.name, data);
  }

  @Mutation(() => ScriptRecord)
  removeScriptRecord(@Args('id', { type: () => String }) id: string) {
    return this.scriptRunnerService.remove(id);
  }
}

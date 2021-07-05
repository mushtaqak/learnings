import { Injectable } from '@nestjs/common';
import { CreateScriptRunnerDto } from './dto/create-script-runner.dto';
import { UpdateScriptRunnerDto } from './dto/update-script-runner.dto';
import ScriptRunner from './script-runner';

@Injectable()
export class ScriptRunnerService {
  scriptRunner = new ScriptRunner();
  create(createScriptRunnerDto: CreateScriptRunnerDto) {
    return 'This action adds a new scriptRunner';
  }

  findAll() {
    this.scriptRunner.getAllScripts();
    return 'List of scripts';
  }

  findOne(id: string) {
    this.scriptRunner.run(id);
    return `Running "${id}" script.`;
  }

  update(id: string, updateScriptRunnerDto: UpdateScriptRunnerDto) {
    return `This action updates a #${id} scriptRunner`;
  }

  remove(id: string) {
    return `This action removes a #${id} scriptRunner`;
  }
}

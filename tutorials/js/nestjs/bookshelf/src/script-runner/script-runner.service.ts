import { Injectable } from '@nestjs/common';
import { CreateScriptRunnerDto } from './dto/create-script-runner.dto';
import { UpdateScriptRunnerDto } from './dto/update-script-runner.dto';
import ScriptRunner from './script-runner';

@Injectable()
export class ScriptRunnerService {
  scriptRunner = new ScriptRunner();
  async create(file) {
    try {
      await this.scriptRunner.compileScripts();
    } catch (exc) {
      console.log('Exc', exc);
    }
    return {
      filename: file.originalname,
    }
  }

  async findAll() {
    try {
      await this.scriptRunner.loadScripts();
    } catch (exc) {
      console.log('Exc', exc);
    }

    return 'List of scripts';
  }

  async findOne(id: string) {
    let response = `Running "${id}" script.`;
    try {
      await this.scriptRunner.run(id);
    } catch (exc) {
      console.log('Exc', exc);
      response = `Error while running "${id}" script`;
    }
    return response;
  }

  update(id: string, updateScriptRunnerDto: UpdateScriptRunnerDto) {
    return `This action updates a #${id} scriptRunner`;
  }

  remove(id: string) {
    return `This action removes a #${id} scriptRunner`;
  }
}

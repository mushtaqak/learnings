import { Injectable } from '@nestjs/common';
import { CreateScriptRunnerDto } from './dto/create-script-runner.dto';
import { UpdateScriptRunnerDto } from './dto/update-script-runner.dto';
import ScriptRunner from './script-runner';

@Injectable()
export class ScriptRunnerService {
  scriptRunner = new ScriptRunner();
  async create(file) {
    // if file is in ts format - do not compile since we are uploading js file directly
    const fileExt = file.originalname.split('.')[1];
    if (fileExt === 'ts') {
      try {
        await this.scriptRunner.compileScripts();
      } catch (exc) {
        const response = `Error while compile "${file.originalname}" script: ${exc.message}`;
        console.log(response)
      }
    }
    return {
      filename: file.originalname,
    }
  }

  async findAll() {
    let response = '';
    try {
      await this.scriptRunner.loadScripts();
    } catch (exc) {
      response = `Error while loading scripts: ${exc.message}`;
      console.log(response);
    }
    return response;
  }

  async findOne(id: string) {
    let response = `Running "${id}" script.`;
    try {
      await this.scriptRunner.run(id);
    } catch (exc) {
      response = `Error while running "${id}" script: ${exc.message}`;
      console.log(response);
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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateScriptRecordInput } from './dto/create-script-record.input';
import { UpdateScriptRunnerDto } from './dto/update-script-runner.dto';
import { ScriptRecord } from './entities/script-record.entity';
import ScriptRunner from './script-runner';

@Injectable()
export class ScriptRunnerService {
  constructor(
    @InjectRepository(ScriptRecord)
    private scriptRecordRepository: Repository<ScriptRecord>,
  ) {}
  scriptRunner = new ScriptRunner();
  async upload(file) {
    // if file is in ts format - do not compile since we are uploading js file directly
    const fileExt = file.originalname.split('.')[1];
    if (fileExt === 'ts') {
      try {
        await this.scriptRunner.compileScripts();
      } catch (exc) {
        const response = `Error while compile "${file.originalname}" script: ${exc.message}`;
        console.log(response);
      }
    }
    return {
      filename: file.originalname,
    };
  }

  async create(data: CreateScriptRecordInput) {
    const fileName = data.name;
    // also create in DB
    const createdScript = await this.scriptRecordRepository.create(data);
    const result = await this.scriptRecordRepository.save(createdScript);
    return result;
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

  async findOne(name: string) {
    const script = await this.scriptRecordRepository.findOne({
      where: { name: Like(`${name}%`) },
    });
    console.log({ script });
    if (script) {
      console.log('====== Running script ===');
      eval(script.script);
      console.log('====== script is running ===');
    } else {
      console.log('Script not found');
      return 'Script not found, please upload and try again.';
    }
    return script;
  }

  async run(id: string) {
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

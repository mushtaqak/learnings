import * as ts from 'typescript';
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

  isTS(fileName) {
    return fileName.split('.')[1] === 'ts';
  }

  async upload(file) {
    // if file is in ts format - do not compile since we are uploading js file directly
    const fileExt = file.originalname.split('.')[1];
    if (this.isTS(file.originalname)) {
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

  runTsScript(code) {
    /*
    Run ts through eval
    reference: https://stackoverflow.com/questions/45153848/evaluate-typescript-from-string#answer-45156405

    import * as ts from 'typescript';
    let code: string = `({
        Run: (data: string): string => {
            console.log(data); return Promise.resolve("SUCCESS"); }
        })`;

    let result = ts.transpile(code);
    let runnalbe :any = eval(result);
    runnalbe.Run("RUN!").then((result:string)=>{console.log(result);});
    */
    // eg script: const foo: any = () => console.log('Hello s1.ts'); foo();
    console.log('ts compile & eval ...');
    // first transpile then evaluate
    const jsScript = ts.transpile("const foo: any = (){console.log('Hello s1.ts');}; foo();");
    eval(jsScript);
  }

  async findOne(name: string) {
    const scriptRecord = await this.scriptRecordRepository.findOne({
      where: { name: Like(`${name}%`) },
    });
    console.log({ scriptRecord });
    if (scriptRecord) {
      // dirname is dist (bundled)
      // eval('console.log(__dirname)');
      console.log('====== Running script ===');
      try {
        if(this.isTS(scriptRecord.name)) {
          this.runTsScript(scriptRecord.script);
        } else {
          eval(scriptRecord.script);
        }
      } catch (e) {
        const message = `Error occured while running eval: ${e.message}`;
        console.error(e);
        return message;
      }
      /*
      Limitations of eval
        - we can not import a script A from script B. To do that we have to publish the script in someway (eq helpers.js).

      Findings
        - we can import any package which is part the node_modules - if not we have to get it installed via npm.
            ```
            var faker = require('faker');
            console.log(faker.name.findName())
            ```
        - we can also import some helpers/utils from the source code (eg. ./helpers.js)

            ```
            const helpers = require('../helpers');
            console.log({ helpers })
            console.log('Hello from script4')
            helpers.foo();
            ```
      */
      console.log('====== script is running ===');
    } else {
      const message = 'Script record not found, please upload and try again.';
      console.log(message);
      return message;
    }
    return scriptRecord;
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

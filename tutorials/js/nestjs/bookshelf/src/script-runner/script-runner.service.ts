import * as ts from 'typescript';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CreateScriptRecordInput } from './dto/create-script-record.input';
import { UpdateScriptRunnerDto } from './dto/update-script-runner.dto';
import { ScriptRecord } from './entities/script-record.entity';
import ScriptRunner from './script-runner';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ScriptRunnerService {
  constructor(
    @InjectRepository(ScriptRecord)
    private scriptRecordRepository: Repository<ScriptRecord>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private eventEmitter: EventEmitter2,
  ) {}

  // *** utils ***
  scriptRunner = new ScriptRunner();
  isTS(fileName) {
    return fileName.split('.')[1] === 'ts';
  }

  // ***  db related ***
  // creates DB record
  async create(data: CreateScriptRecordInput) {
    console.log('IN CREATE ')
    const createdScript = await this.scriptRecordRepository.create(data);
    const result = await this.scriptRecordRepository.save(createdScript);
    this.eventEmitter.emit(
      'script.created',
      {
        script: result,
      }
    );

    return result;
  }

  // find all script records
  async findAll(options) {
    let scriptRecords: ScriptRecord[];
    const cachedScripts: ScriptRecord[] = await this.cacheManager.get(
      'scripts',
    );
    console.log({ cachedScripts });
    if (!cachedScripts) {
      scriptRecords = await this.scriptRecordRepository.find(options);
      await this.cacheManager.set('scripts', scriptRecords, { ttl: 1000 });
      console.log({ scriptRecords });
    } else {
      scriptRecords = cachedScripts;
    }
    return scriptRecords;
  }
  async findOne(name: string) {
    let scriptRecord: ScriptRecord;
    const cachedScript: ScriptRecord = await this.cacheManager.get('script');
    console.log({ cachedScript });
    if (!cachedScript) {
      scriptRecord = await this.scriptRecordRepository.findOne({
        where: { name: Like(`${name}%`) },
      });
      await this.cacheManager.set('script', scriptRecord, { ttl: 10 });
      console.log({ scriptRecord });
    } else {
      scriptRecord = cachedScript;
    }

    return scriptRecord;
  }

  update(id: string, updateScriptRunnerDto: UpdateScriptRunnerDto) {
    return `This action updates a #${id} scriptRunner`;
  }
  remove(id: string) {
    return `This action removes a #${id} scriptRunner`;
  }

  // *** eval-based ***

  // runs ts script record through eval
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
    const jsScript = ts.transpile(
      "const foo: any = (){console.log('Hello s1.ts');}; foo();",
    );
    eval(jsScript);
  }

  // runs script through eval
  runScript(scriptRecord: ScriptRecord) {
    // dirname is dist (bundled)
    // eval('console.log(__dirname)');
    console.log('====== Running script ===');
    try {
      if (this.isTS(scriptRecord.name)) {
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
  }

  // finds db script record and runs it through eval
  async findAndRunScript(name: string) {
    const scriptRecord = await this.findOne(name);
    if (scriptRecord) {
      this.runScript(scriptRecord);
    } else {
      const message = 'Script record not found, please upload and try again.';
      console.log(message);
      return message;
    }
    return scriptRecord;
  }

  // *** script file based ***

  // uploads script js/ts file
  async upload(file) {
    // if file is in ts format - do not compile since we are uploading js file directly
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

  // finds all script files
  async findAllScriptFiles() {
    console.log('in findall');
    let response = '';
    try {
      await this.scriptRunner.loadScripts();
    } catch (exc) {
      response = `Error while loading scripts: ${exc.message}`;
      console.log(response);
    }
    return response;
  }

  // run js/ts script file
  async runScriptFile(id: string) {
    let response = `Running "${id}" script.`;
    try {
      await this.scriptRunner.run(id);
    } catch (exc) {
      response = `Error while running "${id}" script: ${exc.message}`;
      console.log(response);
    }
    return response;
  }
}

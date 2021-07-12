import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ScriptRunnerService } from './script-runner.service';
import { CreateScriptRunnerDto } from './dto/create-script-runner.dto';
import { UpdateScriptRunnerDto } from './dto/update-script-runner.dto';
import { ClassValidationPipe } from 'src/pipes/class-validation.pipe';

const SCRIPTS_UPLOAD_DIR = 'scripts'; // dist/scripts dir would not be compiled again.

// file filter for scripts
export const scriptFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(ts|js)$/)) {
    return callback(new Error('Only javascript files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('script-runner')
export class ScriptRunnerController {
  constructor(private readonly scriptRunnerService: ScriptRunnerService) {}

  // saves a file does not save in db
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: SCRIPTS_UPLOAD_DIR,
        filename: (req, file, callback) => callback(null, file.originalname),
      }),
      fileFilter: scriptFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.scriptRunnerService.upload(file);
  }

  // saves file in DB
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const script = {
      name: file.originalname,
      script: file.buffer.toString('utf-8'),
    };
    return this.scriptRunnerService.create(script);
  }

  // just for validator
  // works: { "name": "ali", "script": "a"}
  // fails: { "name": 1 }
  @Post('validate')
  validate(@Body(new ClassValidationPipe()) script: CreateScriptRunnerDto) {
    console.log({ script });
    return 'validated';
  }

  // not usefull
  @Get()
  findAll() {
    return this.scriptRunnerService.findAll();
  }

  // runs script using eval - script data from db
  @Get('/script/:id')
  findOne(@Param('id') name: string) {
    console.log('using eval');
    return this.scriptRunnerService.findOne(name);
  }

  // runs script using js/ts file in /scripts dir
  @Get(':id')
  run(@Param('id') id: string) {
    return this.scriptRunnerService.run(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateScriptRunnerDto: UpdateScriptRunnerDto,
  ) {
    return this.scriptRunnerService.update(id, updateScriptRunnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scriptRunnerService.remove(id);
  }
}

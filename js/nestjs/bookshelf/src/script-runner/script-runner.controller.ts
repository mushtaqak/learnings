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
  UseGuards,
  Req,
  Res,
  Session,
  // StreamableFile,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ScriptRunnerService } from './script-runner.service';
import { CreateScriptRunnerDto } from './dto/create-script-runner.dto';
import { UpdateScriptRunnerDto } from './dto/update-script-runner.dto';
import { ClassValidationPipe } from '../common/pipes/class-validation.pipe';
import { AuthGuard } from '../common/guards/auth.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { User } from '../common/decorators/user.decorator';
import { Author } from '../author';
import { createReadStream } from 'fs';
import { join } from 'path';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

const SCRIPTS_UPLOAD_DIR = 'scripts'; // dist/scripts dir would not be compiled again.

// file filter for scripts
export const scriptFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(ts|js)$/)) {
    return callback(new Error('Only javascript files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('script-runner')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
// @UseInterceptors(CacheInterceptor) // to enable auto-caching
export class ScriptRunnerController {
  constructor(private readonly scriptRunnerService: ScriptRunnerService) {}

  // uploads a script file - does not save in db
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
  validate(
    @Body(new ClassValidationPipe()) script: CreateScriptRunnerDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Session() session: Record<string, any>,
  ) {
    // ClassValidationPipe might not be needed now that we are using app level validation
    console.log({ script });
    // cookie implementation
    response.cookie('validated', true) // set cookie
    console.log({ cookies: request.cookies }); // or "request.cookies['validated']" // get cookie

    // session impl
    // request.session.visits = request.session.visits ? request.session.visits + 1 : 1;
    session.visits = session.visits ? session.visits + 1 : 1;
    console.log({ visits: session.visits });
    return 'validated';
  }

  // not usefull
  @Get()
  findAllScriptFiles(@User() user: Author) {
    console.log({ requestUser: user });
    return this.scriptRunnerService.findAllScriptFiles();
  }

  // runs script using eval - script data from db
  @Get('/script/:id')
  findAndRunScript(@Param('id') name: string) {
    console.log('using eval');
    return this.scriptRunnerService.findAndRunScript(name);
  }

  @Get('/download/:id')
  getFile(@Res() res: Response, @Param('id') name: string) {
    // const file = createReadStream(join(process.cwd(), 'package.json')); // package.json file
    const filePath = join(process.cwd(), `${SCRIPTS_UPLOAD_DIR}/${name}.js`);
    const file = createReadStream(filePath);
    console.log('in file download', { file });
    file.pipe(res);
    // or unccomment file.pipe line and use below
    // return new StreamableFile(filePath);
  }

  // runs script using js/ts file in /scripts dir
  @Get(':id')
  runScriptFile(@Param('id') id: string) {
    console.log('Using js/ts file');
    return this.scriptRunnerService.runScriptFile(id);
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

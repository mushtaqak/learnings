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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ScriptRunnerService } from './script-runner.service';
import { CreateScriptRunnerDto } from './dto/create-script-runner.dto';
import { UpdateScriptRunnerDto } from './dto/update-script-runner.dto';

// const SCRIPTS_UPLOAD_DIR = 'src/script-runner/scripts';
const SCRIPTS_UPLOAD_DIR = './scripts';

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

  @Post()
  create(@Body() createScriptRunnerDto: CreateScriptRunnerDto) {
    return this.scriptRunnerService.create(createScriptRunnerDto);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: SCRIPTS_UPLOAD_DIR,
        filename: (eq, file, callback) => callback(null, file.originalname),
      }),
      fileFilter: scriptFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // console.log({ file });
    const response = {
      filename: file.originalname,
    };
    return response;
  }

  @Get()
  findAll() {
    return this.scriptRunnerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scriptRunnerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScriptRunnerDto: UpdateScriptRunnerDto,
  ) {
    return this.scriptRunnerService.update(id, updateScriptRunnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scriptRunnerService.remove(id);
  }
}

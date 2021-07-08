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

const SCRIPTS_UPLOAD_DIR = 'dist/scripts'; // dist/scripts dir would not be compiled again.

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
  create(@UploadedFile() file: Express.Multer.File) {
    return this.scriptRunnerService.create(file);
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

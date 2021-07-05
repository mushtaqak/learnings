import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScriptRunnerService } from './script-runner.service';
import { CreateScriptRunnerDto } from './dto/create-script-runner.dto';
import { UpdateScriptRunnerDto } from './dto/update-script-runner.dto';

@Controller('script-runner')
export class ScriptRunnerController {
  constructor(private readonly scriptRunnerService: ScriptRunnerService) {}

  @Post()
  create(@Body() createScriptRunnerDto: CreateScriptRunnerDto) {
    return this.scriptRunnerService.create(createScriptRunnerDto);
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
  update(@Param('id') id: string, @Body() updateScriptRunnerDto: UpdateScriptRunnerDto) {
    return this.scriptRunnerService.update(id, updateScriptRunnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scriptRunnerService.remove(id);
  }
}

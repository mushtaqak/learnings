import { PartialType } from '@nestjs/mapped-types';
import { CreateScriptRunnerDto } from './create-script-runner.dto';

export class UpdateScriptRunnerDto extends PartialType(CreateScriptRunnerDto) {}

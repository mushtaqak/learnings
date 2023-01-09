import { IsString } from 'class-validator';

export class CreateScriptRunnerDto {
  @IsString()
  name: string;
  @IsString()
  script: string;
}

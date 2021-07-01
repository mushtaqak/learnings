import { PartialType } from '@nestjs/mapped-types';
import { CreateLibraryDto } from './create-library.dto';

export class UpdateLibraryDto extends PartialType(CreateLibraryDto) {}

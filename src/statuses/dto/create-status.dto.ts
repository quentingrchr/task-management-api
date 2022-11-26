import { IsNotEmpty } from 'class-validator';

export class CreateStatusDto {
  @IsNotEmpty({ message: 'Status name is required' })
  name: string;
  projectId: string;
}

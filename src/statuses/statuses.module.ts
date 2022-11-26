import { Module } from '@nestjs/common';
import { StatusService } from './statuses.service';
import { StatusController } from './statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Project } from 'src/projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Status, Project])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusesModule {}

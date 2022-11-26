import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Status } from 'src/statuses/entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Status])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}

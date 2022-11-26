import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from 'src/statuses/entities/status.entity';
import { defaultStatuses } from 'src/statuses/defaultStatuses';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name, description, withDefaultStatuses } = createProjectDto;
    const newProject = this.projectsRepository.create({
      name,
      description,
    });
    const projectQuery = this.projectsRepository.save(newProject);
    if (withDefaultStatuses) {
      projectQuery.then((project) => {
        defaultStatuses.forEach(async (statusName) => {
          const status = this.statusRepository.create({
            name: statusName,
            project,
          });
          await this.statusRepository.save(status);
        });

        // create 3 default status
        // TODO / DOING / DONE
      });
    }

    return projectQuery;
  }

  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: string): Promise<Project> {
    const found = this.projectsRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return found;
  }

  // update(id: number, updateProjectDto: UpdateProjectDto) {
  //   return `This action updates a #${id} project`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} project`;
  // }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';
import { Project } from 'src/projects/entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const { name, projectId } = createStatusDto;
    const status = this.statusRepository.create({
      name,
    });

    try {
      const project = await this.projectRepository.findOneOrFail({
        where: { id: projectId },
      });
      status.project = project;
    } catch (error) {
      console.log({ error });
    }

    return this.statusRepository.save(status);
  }

  findAllByProjectId(projectId: string): Promise<Status[]> {
    const found = this.statusRepository.find({
      where: { project: { id: projectId } },
    });
    if (!found) {
      throw new NotFoundException(
        `Statuses with project id ${projectId} not found`,
      );
    }
    return found;
  }

  findOne(id: string): Promise<Status> {
    const found = this.statusRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Status with id ${id} not found`);
    }

    return found;
  }

  async update(id: string, updateStatusDto: UpdateStatusDto) {
    const status = await this.findOne(id);
    status.name = updateStatusDto.name;
    await this.statusRepository.save(status);

    return status;
  }

  async remove(id: string): Promise<void> {
    const result = await this.statusRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}

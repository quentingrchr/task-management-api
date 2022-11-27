import { Status } from 'src/statuses/entities/status.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../auth/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany((_) => Task, (task) => task.project, { eager: false })
  status: Status[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((_) => Task, (task) => task.project, { eager: true })
  tasks: Task[];

  @ManyToOne((_) => User, (user) => user.projects, { eager: false })
  @Exclude({
    toPlainOnly: true,
  })
  user: User;
}

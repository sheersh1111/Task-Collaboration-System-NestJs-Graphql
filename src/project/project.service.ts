import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectSchema } from './schemas/project.schema/project.schema';
import { CreateProjectInput } from './dto/create-project.input/create-project-input';

@Injectable()
export class ProjectService {
  constructor(@InjectModel('Project') private ProjectSchema: Model<Project>) {}

  async create(createProjectInput: CreateProjectInput): Promise<Project> {
    const createdProject = new this.ProjectSchema(createProjectInput);
    return (await createdProject.save()).populate('createdBy');
  }

  async findAll(createdBy?: string): Promise<Project[]> {
    const filter = createdBy ? { createdBy } : {}; // Use createdBy if provided, otherwise no filter
   return this.ProjectSchema.find(filter).populate('createdBy').exec();  
  }

  async findOne(id: string): Promise<Project> {
    return this.ProjectSchema.findById(id).populate('createdBy').exec();
  }

  async update(id: string, updateFields: Partial<CreateProjectInput>): Promise<Project> {
    return this.ProjectSchema.findByIdAndUpdate(id, updateFields, { new: true });
  }  

  async remove(id: string): Promise<Project> {
    return this.ProjectSchema.findByIdAndDelete(id).exec();
  }
}

import { UserDTO } from "src/user/user-dto/user-dto";
import { Project } from "../schemas/project.schema/project.schema";

export class ProjectDTO {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdBy: UserDTO; // Store the createdBy as string (ObjectId) instead of the full User object
  status: 'todo' | 'in-progress' | 'completed';

  constructor(project: Project) {
    
    this.id = project?._id as string;
    this.name = project.name;
    this.description = project.description;
    this.startDate = new Date(project.startDate);
    this.endDate = new Date(project.endDate);
    this.createdBy = new UserDTO(project.createdBy) // Assuming createdBy is a MongoDB ObjectId referencing a User
    this.status = project.status;
  }
}

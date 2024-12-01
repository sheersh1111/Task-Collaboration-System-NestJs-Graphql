import { ProjectDTO } from "src/project/project-dto/project-dto";
import { Task } from "../schemas/task.schema/task.schema";
import { UserDTO } from "src/user/user-dto/user-dto";

export class TaskDTO {
  id: string;
  title: string;
  description: string;
  status: string;
  createdBy: UserDTO; // Store the createdBy as string (ObjectId) instead of the full User object
  assignees: UserDTO[]; // Array of assignees' ObjectIds
  projectId: ProjectDTO; // Store the projectId as string (ObjectId)

  constructor(task: Task) { 
    this.id = task?._id as string;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.createdBy = new UserDTO(task.createdBy); // Assuming createdBy is a MongoDB ObjectId referencing a User
    this.assignees = task.assignees.map((assignee) => new UserDTO(assignee)); // Convert assignees' ObjectIds to strings
    this.projectId = new ProjectDTO(task.projectId); // Convert projectId to string if it exists
  }
}

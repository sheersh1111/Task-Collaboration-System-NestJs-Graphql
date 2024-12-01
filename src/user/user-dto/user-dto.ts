import { User } from "../schemas/user.schema/user.schema";

export class UserDTO {
    id: string;
    name: string;
    email: string;
  
    constructor(user: User) {
      this.id = user?._id as string;
      this.name = user.name;
      this.email = user.email;
    }
  }
  
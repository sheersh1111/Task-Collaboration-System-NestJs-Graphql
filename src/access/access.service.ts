import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Access } from './schemas/access.schema/access.schema';

@Injectable()
export class AccessService {
  constructor(
    @InjectModel(Access.name) private readonly accessModel: Model<Access>,
  ) {}

  // Create access record
  async createAccess(
    projectId: string,
    createdBy: string,
    forUser: string,
    canCreate: boolean,
    canAssign: boolean,
  ): Promise<Access> {
    const access = new this.accessModel({
      projectId,
      createdBy,
      forUser,
      canCreate,
      canAssign,
    });

    return access.save();
  }

  // Update access record
  async updateAccess(
    projectId: string,
    forUser: string,
    canCreate?: boolean,
    canAssign?: boolean,
    canView?: boolean,
  ): Promise<Access> {
    return this.accessModel.findOneAndUpdate(
      { projectId, forUser }, // Find by projectId and forUser
      { canCreate, canAssign, canView }, // Update these fields
      { new: true }, // Return the updated document
    ).exec();
  }

  // Get access for a user and project
  async getAccess(projectId: string, forUser: string): Promise<Access | null> {
    return this.accessModel
      .findOne({ projectId, forUser })
      .exec();
  }
}

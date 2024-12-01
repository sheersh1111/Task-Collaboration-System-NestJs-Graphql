// src/user/user.service.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema/user.schema';
import { CreateUserInput } from './dto/create-user.input/create-user.input';
import { SignInInput } from './dto/sign-in.input/sign-in.input/sign-in.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
private jwtService:JwtService,
) {}
  // Method to fetch all users
  async findAll(): Promise<User[]> { 
    
    return this.userModel.find().exec();
  }

  // Method to create a new user
  async create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = new this.userModel(createUserInput);
    return newUser.save();
  }

  async signIn(signInInput: SignInInput): Promise<{ token: string }> {
    const { email, password } = signInInput;

    // Find the user by email
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare passwords
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { id: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  // Sign out method (can have additional logic if needed)
  async signOut(): Promise<boolean> {
    return true; // This will simply clear the token from cookies in the resolver
  }
}

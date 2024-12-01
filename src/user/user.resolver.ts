// src/user/user.resolver.ts
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './schemas/user.schema/user.schema';
import { CreateUserInput } from './dto/create-user.input/create-user.input';
import { UserDTO } from './user-dto/user-dto';
import { SignInInput, SignInResponse } from './dto/sign-in.input/sign-in.input/sign-in.input';
import { Response } from 'express';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Query to get all users
  @Query(() => [User])
  async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.userService.findAll(); // Fetch users
    return users.map(user => new UserDTO(user));
  }

  // Mutation to create a new user
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => SignInResponse)
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
    @Context() context: { res: Response },
  ): Promise<SignInResponse> {
    const { token } = await this.userService.signIn(signInInput);

    // Set token in cookies
    context.res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });

    return {success:true,message:'Signed-In successfully'};
  }

  @Mutation(() => Boolean)
  async signOut(@Context() context: { res: Response }): Promise<boolean> {
    // Clear the token from cookies
    context.res.clearCookie('token');
    return this.userService.signOut();
  }
}
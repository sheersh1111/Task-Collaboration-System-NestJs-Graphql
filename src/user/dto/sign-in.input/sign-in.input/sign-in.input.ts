import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class SignInInput {
  @Field()
  email: string;

  @Field()
  password: string;
}


@ObjectType()
export class SignInResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

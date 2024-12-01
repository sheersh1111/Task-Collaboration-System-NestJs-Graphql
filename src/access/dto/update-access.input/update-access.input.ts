import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';

@InputType()
export class UpdateAccessInput {
  @Field()
  @IsBoolean()
  canCreate: boolean;

  @Field()
  @IsBoolean()
  canAssign: boolean;

  @Field()
  @IsBoolean()
  canView: boolean;
}

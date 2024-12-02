import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessService } from './access.service';
import { AccessResolver } from './access.resolver';
import { Access, AccessSchema } from './schemas/access.schema/access.schema';
import { CanViewGuard } from './can-view/can-view.guard';
import { CanAssignGuard } from 'src/access/can-assign/can-assign.guard';
import { CanCreateGuard } from 'src/access/can-create/can-create.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: Access.name, schema: AccessSchema }])],
  providers: [AccessService, AccessResolver,CanViewGuard,CanAssignGuard,CanCreateGuard],
  exports:[CanViewGuard,CanAssignGuard,CanCreateGuard],
})
export class AccessModule {}

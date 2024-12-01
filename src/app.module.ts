// src/app.module.ts
import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { AccessModule } from './access/access.module';
import { NotificationGateway } from './notification/notification.gateway';
import { NotificationService } from './notification/notification.service';
import { NotificationResolver } from './notification/notification.resolver';
import { NotificationModule } from './notification/notification.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      context: ({ req, res }) => ({ req, res }), 
    }),
    UserModule,
    ProjectModule,
    TaskModule,
    AccessModule,
    NotificationModule,
    CommentModule,
    AuthModule,
    CacheModule
  ],
  providers: [NotificationGateway, NotificationService, NotificationResolver],
})
export class AppModule {}

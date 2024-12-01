import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'your-secret-key',
      signOptions: { expiresIn: '1h' }, // Example options
    }),
  ],
  providers: [AuthGuard],
  exports: [JwtModule],
})
export class AuthModule {}

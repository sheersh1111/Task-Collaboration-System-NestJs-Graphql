import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const token = request.cookies?.token; // Retrieve token from cookies
    if (!token) {
      throw new UnauthorizedException('Token is missing in cookies');
    }

    try {
      const payload = this.jwtService.verify(token); // Validate the token
      request.user = payload; // Attach the user payload to the request object
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

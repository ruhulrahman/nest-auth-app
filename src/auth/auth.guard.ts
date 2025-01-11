import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies['SESSIONID']; // Extract token from cookie
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

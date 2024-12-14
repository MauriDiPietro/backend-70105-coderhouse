import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private JwtService: JwtService){}

  private extractTokenFromCookies(request: Request): string | undefined {
    return request.cookies.token
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookies(request);
    if(!token) throw new UnauthorizedException('unauthorized');
    const payload = await this.JwtService.verify(token, { secret: '1234' });
    request.user = payload;
    return true;
  }
}

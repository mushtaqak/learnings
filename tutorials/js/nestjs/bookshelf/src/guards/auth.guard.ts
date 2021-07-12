import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('In AuthGuard', { context, request })
    return validateRequest(request);
  }
}
function validateRequest(request: any): boolean | Promise<boolean> | Observable<boolean> {
    return true;
}

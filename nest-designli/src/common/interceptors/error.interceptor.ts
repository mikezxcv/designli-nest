import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof HttpException) {
          // Si ya es una excepción HTTP, simplemente la retornamos
          return throwError(() => err);
        }
        
        // Maneja otras excepciones
        return throwError(() => new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: err.message || 'Error interno del servidor',
        }, HttpStatus.INTERNAL_SERVER_ERROR));
      }),
    );
  }
}

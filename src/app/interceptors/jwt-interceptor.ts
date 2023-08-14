import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      // Clone the request and add the Authorization header
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `bearer ${jwtToken}`,
        },
      });

      // Pass the modified request to the next handler
      // return next.handle(modifiedRequest)

      return next.handle(modifiedRequest).pipe(
        tap((event) => {
          console.log('After Interceptor & Token Found:', event);
        })
      );
    }

    // If no token, proceed with the original request
    // return next.handle(request);
    return next.handle(request).pipe(
      tap((event) => {
        console.log('After Interceptor & Token Not Found:', event);
      })
    );
  }
}

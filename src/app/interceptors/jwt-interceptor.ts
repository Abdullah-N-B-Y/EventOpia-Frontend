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
    // Get the JWT token from where you have stored it (e.g., localStorage, sessionStorage)
    const jwtToken = sessionStorage.getItem('jwtToken'); // Change to your actual storage method

    if (jwtToken) {
      // Clone the request and add the Authorization header
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `bearer ${jwtToken}`,
        },
      });

      // Pass the modified request to the next handler
      // return next.handle(modifiedRequest);
      console.log('Modified Request:', modifiedRequest);

      return next.handle(modifiedRequest).pipe(
        tap((event) => {
          console.log('After Interceptor:', event);
        })
      );
    }

    // If no token, proceed with the original request
    // return next.handle(request);
    return next.handle(request).pipe(
      tap((event) => {
        console.log('After Interceptor:', event);
      })
    );
  }
}

import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, inject } from '@angular/core';
import { catchError, delay, finalize, throwError } from 'rxjs';
import { LoadingService } from './loading.service';

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const loadingService = inject(LoadingService);
  loadingService.apiPath.update((urls) => [...urls, req.url]);

  return next(req).pipe(
    delay(1000),
    finalize(() =>
      loadingService.apiPath.update((urls) =>
        urls.filter((u) => u !== req.url),
      ),
    ),
  );
};

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.log(err);
      return throwError(() => err);
    }),
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loadingInterceptor, errorInterceptor])),
  ],
};

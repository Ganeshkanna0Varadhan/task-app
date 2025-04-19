import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpParams, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { exhaustMap, map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
import { User } from "../models/user";
import { Router } from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  return authService.user.pipe(take(1), exhaustMap((user) => {
    if (!user) {
      return next(req);
    }
    const modifiedReq = req.clone({
      params: new HttpParams().set('auth', user.token + '')
    })

    return next(modifiedReq);
  }))
}

export const isLoggedIn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user.pipe(map((user) => {
    return user ? true : router.createUrlTree(['/login']);
  }))
  // return authService.isloggedIn ? true : router.createUrlTree(['/login']) ;
}

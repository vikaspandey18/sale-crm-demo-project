import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  getLoggedUser,
  loginFailureAction,
  loginStartAction,
  loginSuccessAction,
  logoutAction,
} from "./auth.actions";
import {
  map,
  exhaustMap,
  catchError,
  of,
  mergeMap,
  EMPTY,
  switchMap,
  tap,
} from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffect {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStartAction),
      exhaustMap((action) => {
        return this.authService
          .loginAuthService(action.mobile, action.password)
          .pipe(
            map((response) => {
              this.authService.saveAuthInfoInLocalStorage(response.data);
              return loginSuccessAction({
                auth: response.data,
                redirect: true,
              });
            }),
            catchError((error) => {
              return of(
                loginFailureAction({
                  error: error.error.message || "Login failed",
                }),
              );
            }),
          );
      }),
    );
  });

  redirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccessAction),
        tap((action) => {
          if (action.redirect) {
            return this.router.navigate(["/"]);
          }
          return;
        }),
      );
    },
    { dispatch: false },
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logoutAction),
        map((action) => {
          this.authService.logoutUserFromLocalStorage();
          return this.router.navigate(["signin"]);
        }),
      );
    },
    { dispatch: false },
  );

  getAuthUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLoggedUser),
      switchMap((action) => {
        const user = this.authService.getUserDataFromLocalStorage();
        if (!user) {
          this.router.navigate(["signin"]);
          return EMPTY;
        }
        return of(loginSuccessAction({ auth: user, redirect: false }));
      }),
    );
  });
}

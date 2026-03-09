import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  getLoggedUser,
  loginFailureAction,
  loginStartAction,
  loginSuccessAction,
  logoutAction,
} from "./auth.actions";
import { map, exhaustMap, catchError, of, mergeMap, EMPTY } from "rxjs";
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
              return loginSuccessAction({ auth: response.data });
            }),
            catchError((error) => {
              // console.log(error);
              return of(
                loginFailureAction({
                  error: error.message || "Login failed",
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
        mergeMap((action) => {
          return this.router.navigate(["/"]);
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
          return this.router.navigate(["signin"]);
        }),
      );
    },
    { dispatch: false },
  );

  getAuthUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLoggedUser),
      mergeMap((action) => {
        const user = this.authService.getUserDataFromLocalStorage();
        if (!user) {
          this.router.navigate(["signin"]);
          return EMPTY;
        }
        return of(loginSuccessAction({ auth: user }));
      }),
    );
  });
}

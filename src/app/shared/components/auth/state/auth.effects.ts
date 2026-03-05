import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  loginFailureAction,
  loginStartAction,
  loginSuccessAction,
} from "./auth.actions";
import { map, exhaustMap, catchError, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthEffect {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStartAction),
      exhaustMap((action) => {
        return this.authService
          .loginAuthService(action.mobile, action.password)
          .pipe(
            map((data) => {
              return loginSuccessAction({ auth: data });
            }),
            catchError((error) => {
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
}

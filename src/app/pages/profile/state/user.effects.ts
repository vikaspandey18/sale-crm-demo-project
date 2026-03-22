import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import {
  loadUserFailedAction,
  loadUserStartAction,
  loadUserSuccessAction,
} from "./user.actions";
import { catchError, exhaustMap, map, of } from "rxjs";

export class UserEffect {
  private store = inject(Store<AppState>);
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  getUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUserStartAction),
      exhaustMap((action) => {
        return this.userService.getUser().pipe(
          map((response) => {
            return loadUserSuccessAction({ user: response.data });
          }),
          catchError((error) => {
            return of(
              loadUserFailedAction({
                error: error.error.message || error.message,
              }),
            );
          }),
        );
      }),
    );
  });
}

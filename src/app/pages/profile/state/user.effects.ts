import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import {
  loadUserFailedAction,
  loadUserStartAction,
  loadUserSuccessAction,
  updateUserFailedAction,
  updateUserStartAction,
  updateUserSuccessAction,
} from "./user.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { concatLatestFrom } from "@ngrx/operators";
import { selectUserData } from "./user.selectors";

export class UserEffect {
  private store = inject(Store<AppState>);
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  getUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUserStartAction),
      // concatLatestFrom(() => this.store.select(selectUserData)),
      exhaustMap((action) => {
        // if (user) {
        //   return of(loadUserSuccessAction({ user }));
        // }
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

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserStartAction),
      exhaustMap((action) => {
        return this.userService.updateUser(action.formData).pipe(
          map((response) => {
            return updateUserSuccessAction({ user: response.data });
          }),
          catchError((error) => {
            return of(
              updateUserFailedAction({
                error: error.error.message || error.message,
              }),
            );
          }),
        );
      }),
    );
  });

  
}

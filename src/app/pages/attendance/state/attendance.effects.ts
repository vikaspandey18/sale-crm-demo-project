import { inject } from "@angular/core";
import { AppState } from "../../../store/app.state";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AttendanceService } from "../services/attendance.service";
import {
  markAttendaceFailedAction,
  markAttendaceStartAction,
  markAttendaceSuccessAction,
  markCheckInAction,
  markCheckOutAction,
} from "./attendance.actions";
import { catchError, concatMap, map, of } from "rxjs";

export class MarkAttendaceEffect {
  private store = inject(Store<AppState>);
  private actions$ = inject(Actions);
  private markAttendaceService = inject(AttendanceService);

  checkIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(markCheckInAction),
      concatMap((action) => {
        return this.markAttendaceService.markCheckIn(action.checkIn).pipe(
          map((response) => {
            return markAttendaceSuccessAction({
              record: response.data,
              message: response.message,
            });
          }),
          catchError((error) => {
            return of(
              markAttendaceFailedAction({
                error: error.error.message || error.message,
              }),
            );
          }),
        );
      }),
    );
  });

  checkOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(markCheckOutAction),
      concatMap((action) => {
        return this.markAttendaceService.markCheckOut(action.checkOut).pipe(
          map((response) => {
            return markAttendaceSuccessAction({
              record: response.data,
              message: response.message,
            });
          }),
          catchError((error) => {
            return of(
              markAttendaceFailedAction({
                error: error.error.message || error.message,
              }),
            );
          }),
        );
      }),
    );
  });
}

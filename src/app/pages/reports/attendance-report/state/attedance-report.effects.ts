import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AttendanceReportService } from "../service/attendance-report.service";
import {
  loadAttendanceReportFailedAction,
  loadAttendanceReportStartAction,
  loadAttendanceReportSuccessAction,
} from "./attedance-report.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class AttendaceResportEffect {
  private actions$ = inject(Actions);
  private attendaceReportService = inject(AttendanceReportService);

  getAttendanceReport = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAttendanceReportStartAction),
      switchMap((action) => {
        return this.attendaceReportService
          .getAttendaceReport(action.fromDate, action.toDate)
          .pipe(
            map((response) => {
              return loadAttendanceReportSuccessAction({
                attendanceReport: response.data,
              });
            }),
            catchError((error) => {
              return of(
                loadAttendanceReportFailedAction({
                  error: error.error.message || error.message,
                }),
              );
            }),
          );
      }),
    );
  });
}

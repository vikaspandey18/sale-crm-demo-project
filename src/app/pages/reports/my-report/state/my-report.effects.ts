import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ReportService } from "../services/report.service";
import { catchError, concatMap, map, of } from "rxjs";
import {
  fetchMyReportFaieldAction,
  fetchMyReportStartAction,
  fetchMyReportSuccessAction,
} from "./my-report.actions";

@Injectable()
export class MyReportEffect {
  private actions$ = inject(Actions);
  private myReportService = inject(ReportService);

  getMyReport$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchMyReportStartAction),
      concatMap((action) => {
        return this.myReportService.getMyReport().pipe(
          map((response) => {
            return fetchMyReportSuccessAction({ reports: response.data });
          }),
          catchError((error) => {
            return of(
              fetchMyReportFaieldAction({ error: error.error.message }),
            );
          }),
        );
      }),
    );
  });
}

import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ReportService } from "../services/report.service";
import { catchError, concatMap, map, of } from "rxjs";
import {
  fetchMyReportFaieldAction,
  fetchMyReportStartAction,
  fetchMyReportSuccessAction,
} from "./my-report.actions";
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/app.state";
import { getMyReportSelector } from "./my-report.selectors";

@Injectable()
export class MyReportEffect {
  private store = inject(Store<AppState>);
  private actions$ = inject(Actions);
  private myReportService = inject(ReportService);

  getMyReport$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchMyReportStartAction),
      // concatLatestFrom(() => this.store.select(getMyReportSelector)),
      concatMap(([action, reports]) => {
        if (reports.length) {
          return of(fetchMyReportSuccessAction({ reports }));
        }
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

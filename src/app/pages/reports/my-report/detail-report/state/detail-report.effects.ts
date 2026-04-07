import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../store/app.state";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ReportService } from "../../services/report.service";
import { catchError, map, of, switchMap } from "rxjs";
import {
  getDetailReportFailureAction,
  getDetailReportStartAction,
  getDetailReportSuccessAction,
} from "./detail-report.actions";

@Injectable()
export class DetailReportEffects {
  private store = inject(Store<AppState>);
  private actions$ = inject(Actions);
  private detailReportService = inject(ReportService);

  getDetailReport$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getDetailReportStartAction),
      switchMap((action) => {
        return this.detailReportService.getDetailReport(action.date).pipe(
          map((response) => {
            return getDetailReportSuccessAction({
              detailReports: response.data,
            });
          }),
          catchError((error) => {
            return of(
              getDetailReportFailureAction({
                error: error.error.message || "Something went wrong",
              }),
            );
          }),
        );
      }),
    );
  });
}

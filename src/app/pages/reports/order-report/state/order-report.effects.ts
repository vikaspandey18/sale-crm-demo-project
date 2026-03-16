import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { OrderReportService } from "../services/order-report.service";
import {
  fetchOrderReportFailedAction,
  fetchOrderReportStartAction,
  fetchOrderReportSuccessAction,
} from "./order-report.actions";
import { catchError, concatMap, map, of } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/app.state";
import { concatLatestFrom } from "@ngrx/operators";
import { getOrderReportSelector } from "./order-report.selectors";

@Injectable()
export class OrderReportEffect {
  private store = inject(Store<AppState>);
  private actions$ = inject(Actions);
  private orderReportService = inject(OrderReportService);

  orderReport$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchOrderReportStartAction),
      concatLatestFrom(() => this.store.select(getOrderReportSelector)),
      concatMap(([action, orders]) => {
        if (orders.length > 0) {
          return of(fetchOrderReportSuccessAction({ orders }));
        }
        return this.orderReportService.getOrderReport().pipe(
          map((response) => {
            return fetchOrderReportSuccessAction({ orders: response.data });
          }),
          catchError((error) => {
            return of(
              fetchOrderReportFailedAction({
                error: error?.error.message || error.message,
              }),
            );
          }),
        );
      }),
    );
  });
}
